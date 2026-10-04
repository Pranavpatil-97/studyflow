import FocusSession from "../models/FocusSession.js";
import Task from "../models/Task.js";
import { asyncHandler } from "../utils/helpers.js";

// Last 15 days is enough for "this week" plus "last week" comparisons
export const listSessions = asyncHandler(async (req, res) => {
  const since = new Date(Date.now() - 15 * 24 * 60 * 60 * 1000);
  const sessions = await FocusSession.find({ user: req.user._id, createdAt: { $gte: since } })
    .sort("createdAt")
    .select("minutes task createdAt");
  res.json(sessions);
});

export const createSession = asyncHandler(async (req, res) => {
  const minutes = Number(req.body.minutes);
  if (!Number.isFinite(minutes) || minutes < 1 || minutes > 180)
    return res.status(400).json({ message: "Minutes must be between 1 and 180" });

  let task = null;
  if (req.body.task) {
    if (!(await Task.exists({ _id: req.body.task, user: req.user._id })))
      return res.status(404).json({ message: "Task not found" });
    task = req.body.task;
  }

  const session = await FocusSession.create({ user: req.user._id, minutes, task });
  res.status(201).json(session);
});