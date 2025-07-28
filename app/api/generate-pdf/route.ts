import { type NextRequest, NextResponse } from "next/server"
import { generateResumeHTML, convertResumeDataToTemplate } from "@/lib/pdf/generator"

export async function POST(request: NextRequest) {
  try {
    const { templateId, resumeData } = await request.json()

    if (!templateId || !resumeData) {
      return NextResponse.json({ error: "Template ID and resume data are required" }, { status: 400 })
    }

    // Convert and validate resume data
    const validatedData = convertResumeDataToTemplate(resumeData)

    // Generate HTML
    const html = generateResumeHTML(templateId, validatedData)

    return NextResponse.json({
      success: true,
      html,
      message: "Resume HTML generated successfully",
    })
  } catch (error) {
    console.error("PDF generation error:", error)
    return NextResponse.json({ error: "Failed to generate resume HTML" }, { status: 500 })
  }
}
