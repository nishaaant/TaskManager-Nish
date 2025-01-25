import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  title: string;
  startTime: Date;
  endTime: Date;
  priority: number; // 1 to 5
  status: "pending" | "finished";
}

const TaskSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    priority: { type: Number, required: true, min: 1, max: 5 },
    status: { type: String, enum: ["pending", "finished"], required: true },
  },
  { timestamps: true }
);

export default mongoose.model<ITask>("Task", TaskSchema);
