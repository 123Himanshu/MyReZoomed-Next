import mongoose, { Schema, type Document } from "mongoose"

export interface ITemplate extends Document {
  name: string
  description: string
  htmlTemplate: string
  cssStyles: string
  previewImage: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const TemplateSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    htmlTemplate: {
      type: String,
      required: true,
    },
    cssStyles: {
      type: String,
      required: true,
    },
    previewImage: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Template || mongoose.model<ITemplate>("Template", TemplateSchema)
