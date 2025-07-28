import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import connectDB from "@/lib/database/mongodb"
import Resume from "@/lib/database/models/Resume"

export async function GET() {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const resumes = await Resume.find({ userId }).sort({ updatedAt: -1 })

    return NextResponse.json({
      success: true,
      resumes,
    })
  } catch (error) {
    console.error("Get resumes error:", error)
    return NextResponse.json({ error: "Failed to fetch resumes" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { title, data, templateId } = await request.json()

    if (!title || !data) {
      return NextResponse.json({ error: "Title and data are required" }, { status: 400 })
    }

    await connectDB()

    const resume = new Resume({
      userId,
      title,
      data,
      templateId: templateId || "modern-professional",
      status: "draft",
    })

    await resume.save()

    return NextResponse.json({
      success: true,
      resume,
      message: "Resume saved successfully",
    })
  } catch (error) {
    console.error("Save resume error:", error)
    return NextResponse.json({ error: "Failed to save resume" }, { status: 500 })
  }
}
