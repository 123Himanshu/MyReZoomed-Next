import { type NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(request: NextRequest) {
  try {
    const { resumeData, jobDescription } = await request.json()

    if (!resumeData) {
      return NextResponse.json({ error: "Resume data is required" }, { status: 400 })
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const prompt = `
      You are an expert resume writer and career coach. Please enhance the following resume data to make it more compelling and ATS-friendly.

      Current Resume Data:
      ${JSON.stringify(resumeData, null, 2)}

      ${jobDescription ? `Target Job Description: ${jobDescription}` : ""}

      Please provide enhanced resume data in the same JSON format with:
      1. Improved professional summary
      2. Enhanced job descriptions with action verbs and quantified achievements
      3. Optimized skills section
      4. Better formatting and keywords for ATS compatibility
      5. Improved project descriptions

      Return only the enhanced JSON data without any additional text or formatting.
    `

    const result = await model.generateContent(prompt)
    const response = await result.response
    const enhancedText = response.text()

    // Try to parse the JSON response
    try {
      // Remove any markdown formatting if present
      const cleanedText = enhancedText.replace(/```json\n?|\n?```/g, "").trim()
      const enhancedData = JSON.parse(cleanedText)
      console.log("Enhanced Resume Data:", enhancedData)
      return NextResponse.json({
        data: enhancedData,
        message: "Resume enhanced successfully"
      })
    } catch (parseError) {
      console.error("Failed to parse enhanced resume data:", parseError)
      return NextResponse.json(
        { error: "Failed to parse enhanced data" },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error("Enhancement error:", error)
    return NextResponse.json({ error: "Failed to enhance resume" }, { status: 500 })
  }
}
