import mongoose, { Schema, Document } from "mongoose";

// Define the IUser interface with the correct _id type
export interface IUser extends Document {
  _id: string; // Explicitly define _id as a string
  email: string;
  password: string;
}

const UserSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
