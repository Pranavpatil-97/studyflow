import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    name: { type: String, required: true, trim: true, maxlength: 60 },
    code: { type: String, trim: true, maxlength: 20, default: "" },
    color: { type: String, enum: ["blue", "green", "orange", "purple", "rose"], default: "blue" },
  },
  { timestamps: true }
);

export default mongoose.model("Subject", subjectSchema);