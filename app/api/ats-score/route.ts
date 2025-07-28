import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { calculateATSScore } from "@/lib/ai/gemini"

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { resumeData, jobDescription } = await request.json()

    if (!resumeData || !jobDescription) {
      return NextResponse.json({ error: "Missing required data" }, { status: 400 })
    }

    const atsAnalysis = await calculateATSScore(resumeData, jobDescription)

    return NextResponse.json({
      success: true,
      analysis: atsAnalysis,
    })
  } catch (error) {
    console.error("ATS scoring error:", error)
    return NextResponse.json({ error: "Failed to calculate ATS score" }, { status: 500 })
  }
}
