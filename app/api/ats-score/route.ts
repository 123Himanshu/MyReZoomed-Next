import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { calculateATSScore } from "@/lib/ai/gemini"

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ 
        success: false,
        error: "Please sign in to use the ATS score checker" 
      }, { status: 401 })
    }

    const { resumeData, jobDescription } = await request.json()

    // Basic validation
    if (!resumeData?.skills || !resumeData?.experience) {
      return NextResponse.json({ 
        success: false,
        error: "Please upload a valid resume with skills and experience" 
      }, { status: 400 })
    }

    if (!jobDescription || jobDescription.length < 50) {
      return NextResponse.json({ 
        success: false,
        error: "Please provide a detailed job description" 
      }, { status: 400 })
    }

    // Get ATS score from Gemini AI
    const analysis = await calculateATSScore(resumeData, jobDescription)

    return NextResponse.json({
      success: true,
      analysis: analysis,
    })
  } catch (error) {
    console.error("ATS scoring error:", error)
    return NextResponse.json({ 
      success: false,
      error: "Failed to analyze resume. Please try again." 
    }, { status: 500 })
  }
}
