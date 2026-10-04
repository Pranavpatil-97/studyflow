import mongoose from "mongoose";

const focusSessionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    task: { type: mongoose.Schema.Types.ObjectId, ref: "Task", default: null },
    minutes: { type: Number, required: true, min: 1, max: 180 },
  },
  { timestamps: true } // createdAt = when the session finished
);

focusSessionSchema.index({ user: 1, createdAt: -1 });

export default mongoose.model("FocusSession", focusSessionSchema);