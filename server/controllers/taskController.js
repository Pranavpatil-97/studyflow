import Task from "../models/Task.js";
import Subject from "../models/Subject.js";
import { asyncHandler, pick } from "../utils/helpers.js";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const POPULATE = ["subject", "name code color"];

export const listTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.user._id })
    .populate(...POPULATE)
    .sort({ dueDate: 1, createdAt: 1 });
  res.json(tasks);
});

export const createTask = asyncHandler(async (req, res) => {
  const { title, subject, dueDate, minutes, priority, notes } = req.body;
  if (!title?.trim() || !subject || !dueDate)
    return res.status(400).json({ message: "Title, subject and due date are required" });
  if (!DATE_RE.test(dueDate))
    return res.status(400).json({ message: "Due date must be YYYY-MM-DD" });
  if (!(await Subject.exists({ _id: subject, user: req.user._id })))
    return res.status(404).json({ message: "Subject not found" });

  const task = await Task.create({
    user: req.user._id, title, subject, dueDate, minutes, priority, notes,
  });
  res.status(201).json(await task.populate(...POPULATE));
});

export const updateTask = asyncHandler(async (req, res) => {
  const update = pick(req.body, [
    "title", "subject", "dueDate", "minutes", "priority", "notes", "completed",
  ]);
  if (update.dueDate && !DATE_RE.test(update.dueDate))
    return res.status(400).json({ message: "Due date must be YYYY-MM-DD" });
  if (update.subject && !(await Subject.exists({ _id: update.subject, user: req.user._id })))
    return res.status(404).json({ message: "Subject not found" });
  if (update.completed !== undefined)
    update.completedAt = update.completed ? new Date() : null;

  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    update,
    { new: true, runValidators: true }
  ).populate(...POPULATE);
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json(task);
});

export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json({ message: "Task deleted" });
});