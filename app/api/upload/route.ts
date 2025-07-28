import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server" // Updated import
import connectDB from "@/lib/database/mongodb"
import Resume from "@/lib/database/models/Resume"
import { parseResumeWithAI } from "@/lib/ai/gemini"

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Extract text from file (this would typically be done by FastAPI service)
    const text = await file.text() // Simplified - in reality, use PDF parser

    // Parse with AI
    const parsedData = await parseResumeWithAI(text)

    // Save to database
    const resume = new Resume({
      userId,
      originalFileName: file.name,
      originalText: text,
      parsedData,
      isEnhanced: false,
    })

    await resume.save()

    return NextResponse.json({
      success: true,
      resumeId: resume._id,
      parsedData,
      originalText: text,
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Failed to process resume" }, { status: 500 })
  }
}
