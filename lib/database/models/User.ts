import mongoose, { Schema, type Document } from "mongoose"

export interface IUser extends Document {
  clerkId: string
  email: string
  firstName?: string
  lastName?: string
  createdAt: Date
  updatedAt: Date
}

const UserSchema: Schema = new Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema)
