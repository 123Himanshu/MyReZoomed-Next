import mongoose, { Schema, type Document } from "mongoose"

export interface IResume extends Document {
  userId: string
  originalFileName: string
  originalText: string
  parsedData: {
    name?: string
    email?: string
    phone?: string
    skills: string[]
    experience: string
    education: string
    summary?: string
    [key: string]: any
  }
  enhancedData?: {
    name?: string
    email?: string
    phone?: string
    skills: string[]
    experience: string
    education: string
    summary?: string
    [key: string]: any
  }
  templateId?: string
  isEnhanced: boolean
  createdAt: Date
  updatedAt: Date
}

const ResumeSchema: Schema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    originalFileName: {
      type: String,
      required: true,
    },
    originalText: {
      type: String,
      required: true,
    },
    parsedData: {
      type: Schema.Types.Mixed,
      required: true,
    },
    enhancedData: {
      type: Schema.Types.Mixed,
    },
    templateId: {
      type: String,
    },
    isEnhanced: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Resume || mongoose.model<IResume>("Resume", ResumeSchema)
