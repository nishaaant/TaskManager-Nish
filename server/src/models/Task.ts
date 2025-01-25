import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  title: string;
  startTime: Date;
  endTime: Date;
  priority: number; 
  status: "pending" | "finished";
  timeLapsed?: number;
  balanceTime?: number;
  actualTimeTaken?: number;
}

const TaskSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    priority: { type: Number, required: true, min: 1, max: 5 },
    status: { type: String, enum: ["pending", "finished"], required: true },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

TaskSchema.virtual("timeLapsed").get(function (this: ITask) {
  if (this.status === "pending") {
    const now = new Date();
    const startTime = new Date(this.startTime);
    return now > startTime ? (now.getTime() - startTime.getTime()) / (1000 * 60 * 60) : 0; 
  }
  return undefined;
});

TaskSchema.virtual("balanceTime").get(function (this: ITask) {
  if (this.status === "pending") {
    const now = new Date();
    const endTime = new Date(this.endTime);
    return now < endTime ? (endTime.getTime() - now.getTime()) / (1000 * 60 * 60) : 0; 
  }
  return undefined;
});

TaskSchema.virtual("actualTimeTaken").get(function (this: ITask) {
  if (this.status === "finished") {
    const startTime = new Date(this.startTime);
    const endTime = new Date(this.endTime);
    return (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
  }
  return undefined;
});

TaskSchema.pre("save", function (next) {
  const task = this as unknown as ITask;

  if (task.startTime >= task.endTime) {
    return next(new Error("End time must be after the start time."));
  }

  next();
});

export default mongoose.model<ITask>("Task", TaskSchema);
