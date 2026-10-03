import Subject from "../models/Subject.js";
import Unit from "../models/Unit.js";
import Task from "../models/Task.js";
import { asyncHandler, pick } from "../utils/helpers.js";

const COLORS = ["blue", "green", "orange", "purple", "rose"];

/* ---------- Subjects ---------- */

export const listSubjects = asyncHandler(async (req, res) => {
  const [subjects, units] = await Promise.all([
    Subject.find({ user: req.user._id }).sort("createdAt").lean(),
    Unit.find({ user: req.user._id }).sort("order").lean(),
  ]);

  res.json(
    subjects.map((s) => {
      const mine = units.filter((u) => String(u.subject) === String(s._id));
      const next = mine.findIndex((u) => !u.done);
      return {
        ...s,
        totalUnits: mine.length,
        doneUnits: mine.filter((u) => u.done).length,
        unitStates: mine.map((u) => u.done),
        nextUnit: next === -1 ? null : { title: mine[next].title, number: next + 1 },
      };
    })
  );
});

export const createSubject = asyncHandler(async (req, res) => {
  const { name, code = "", color = "blue" } = req.body;
  if (!name?.trim()) return res.status(400).json({ message: "Subject name is required" });
  if (!COLORS.includes(color)) return res.status(400).json({ message: "Invalid color" });

  const subject = await Subject.create({ user: req.user._id, name, code, color });
  res.status(201).json(subject);
});

export const updateSubject = asyncHandler(async (req, res) => {
  const update = pick(req.body, ["name", "code", "color"]);
  if (update.color && !COLORS.includes(update.color))
    return res.status(400).json({ message: "Invalid color" });

  const subject = await Subject.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    update,
    { new: true, runValidators: true }
  );
  if (!subject) return res.status(404).json({ message: "Subject not found" });
  res.json(subject);
});

export const deleteSubject = asyncHandler(async (req, res) => {
  const subject = await Subject.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!subject) return res.status(404).json({ message: "Subject not found" });

  await Promise.all([
    Unit.deleteMany({ subject: subject._id }),
    Task.deleteMany({ subject: subject._id }),
  ]);
  res.json({ message: "Subject deleted" });
});

/* ---------- Units ---------- */

export const listUnits = asyncHandler(async (req, res) => {
  const units = await Unit.find({ subject: req.params.id, user: req.user._id }).sort("order");
  res.json(units);
});

export const createUnit = asyncHandler(async (req, res) => {
  const { title } = req.body;
  if (!title?.trim()) return res.status(400).json({ message: "Unit title is required" });

  const subject = await Subject.findOne({ _id: req.params.id, user: req.user._id });
  if (!subject) return res.status(404).json({ message: "Subject not found" });

  const last = await Unit.findOne({ subject: subject._id }).sort("-order");
  const unit = await Unit.create({
    user: req.user._id,
    subject: subject._id,
    title,
    order: last ? last.order + 1 : 0,
  });
  res.status(201).json(unit);
});

export const updateUnit = asyncHandler(async (req, res) => {
  const unit = await Unit.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    pick(req.body, ["title", "done"]),
    { new: true, runValidators: true }
  );
  if (!unit) return res.status(404).json({ message: "Unit not found" });
  res.json(unit);
});

export const deleteUnit = asyncHandler(async (req, res) => {
  const unit = await Unit.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!unit) return res.status(404).json({ message: "Unit not found" });
  res.json({ message: "Unit deleted" });
});