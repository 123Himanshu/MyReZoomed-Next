import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function parseResumeWithAI(resumeText: string) {
  try {
    console.log("\n=== Starting Resume Parsing ===")
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const prompt = `Format the following resume text as structured JSON data.
    The response must be ONLY valid JSON with these exact fields:
    {
      "name": "Full Name",
      "email": "email@example.com", 
      "phone": "phone number",
      "summary": "professional summary",
      "skills": ["skill1", "skill2", "skill3"],
      "experience": "work experience details",
      "education": "education details", 
      "certifications": ["cert1", "cert2"],
      "projects": ["project1", "project2"]
    }

    Resume text to parse:
    ${resumeText}

    Remember: Return ONLY the JSON object with no other text or markdown formatting.`

    console.log("\n=== Parsing Resume with Gemini ===")
    console.log("Sending prompt to Gemini:")
    console.log(prompt)
    console.log("================================\n")

    const result = await model.generateContent(prompt)
    const response = await result.response
    
    // Parse JSON directly from the response
    try {
      const text = response.text()
      if (!text) throw new Error("Empty response from AI")
      
      console.log("\nRaw response from Gemini:")
      console.log("------------------------")
      console.log(text)
      console.log("------------------------")
      
      // First try direct JSON parse
      try {
        return JSON.parse(text)
      } catch {
        // If direct parse fails, try to extract JSON
        const jsonMatch = text.match(/\{[\s\S]*\}/)
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0])
        }
        throw new Error("No valid JSON found in response")
      }
    } catch (parseError) {
      console.error("JSON parsing error:", parseError)
      throw new Error("Failed to parse AI response into JSON")
    }

    throw new Error("Failed to parse JSON from AI response")
  } catch (error) {
    console.error("Error parsing resume with AI:", error)
    throw error
  }
}

export async function enhanceResumeWithAI(resumeData: any, jobDescription?: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const prompt = jobDescription
      ? `You are an expert resume writer. Enhance this resume for the given job description.
        Return ONLY a valid JSON object with the enhanced content, keeping the exact same structure.
        Do not include any other text or markdown formatting in your response.
        
        Job Description:
        ${jobDescription}
        
        Resume Data:
        ${JSON.stringify(resumeData, null, 2)}

        Requirements:
        1. Keep the exact same JSON structure
        2. Enhance content with stronger action verbs
        3. Add relevant keywords from job description
        4. Make achievements more quantifiable
        5. Optimize for ATS compatibility
        6. Return ONLY the enhanced JSON object`
      : `You are an expert resume writer. Enhance this resume to be more impactful.
        Return ONLY a valid JSON object with the enhanced content, keeping the exact same structure.
        Do not include any other text or markdown formatting in your response.
        
        Resume Data:
        ${JSON.stringify(resumeData, null, 2)}

        Requirements:
        1. Keep the exact same JSON structure
        2. Use stronger action verbs
        3. Make achievements more quantifiable
        4. Improve professional language
        5. Optimize for ATS compatibility
        6. Return ONLY the enhanced JSON object`

    console.log("\n=== Enhancing Resume with Gemini ===")
    console.log("Sending prompt to Gemini:")
    console.log(prompt)
    console.log("===================================\n")

    const result = await model.generateContent(prompt)
    const response = await result.response
    
    try {
      const text = response.text()
      if (!text) throw new Error("Empty response from AI")
      
      // First try direct JSON parse
      try {
        return JSON.parse(text)
      } catch {
        // If direct parse fails, try to extract JSON
        const jsonMatch = text.match(/\{[\s\S]*\}/)
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0])
        }
        throw new Error("No valid JSON found in response")
      }
    } catch (parseError) {
      console.error("JSON parsing error:", parseError)
      throw new Error("Failed to parse enhanced resume data")
    }

    throw new Error("Failed to parse enhanced JSON from AI response")
  } catch (error) {
    console.error("Error enhancing resume with AI:", error)
    throw error
  }
}

export async function calculateATSScore(resumeData: any, jobDescription: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const prompt = `You are an ATS system analyzer. Calculate the compatibility score between this resume and job description.
    Return ONLY a valid JSON object with this exact structure, no other text or formatting:
    {
      "score": 85,
      "suggestions": ["suggestion1", "suggestion2", "suggestion3"],
      "matchedKeywords": ["keyword1", "keyword2"],
      "missingKeywords": ["missing1", "missing2"],
      "analysis": {
        "keywordMatch": 80,
        "formatScore": 90,
        "skillsMatch": 85,
        "experienceMatch": 80
      }
    }

    Job Description:
    ${jobDescription}
    
    Resume Data:
    ${JSON.stringify(resumeData, null, 2)}

    Requirements:
    1. Use the exact JSON structure shown above
    2. Score should be 0-100 based on overall match
    3. Identify key missing skills or keywords
    4. Provide actionable suggestions
    5. Return ONLY the JSON object with scores and analysis`

    console.log("\n=== Calculating ATS Score with Gemini ===")
    console.log("Sending prompt to Gemini:")
    console.log(prompt)
    console.log("======================================\n")

    const result = await model.generateContent(prompt)
    const response = await result.response
    
    try {
      const text = response.text()
      if (!text) throw new Error("Empty response from AI")
      
      // First try direct JSON parse
      try {
        return JSON.parse(text)
      } catch {
        // If direct parse fails, try to extract JSON
        const jsonMatch = text.match(/\{[\s\S]*\}/)
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0])
        }
        throw new Error("No valid JSON found in response")
      }
    } catch (parseError) {
      console.error("JSON parsing error:", parseError)
      throw new Error("Failed to parse ATS analysis data")
    }

    throw new Error("Failed to parse ATS analysis from AI response")
  } catch (error) {
    console.error("Error calculating ATS score:", error)
    throw error
  }
}

export async function scrapeJobDescription(url: string) {
  try {
    // This would typically be done on the backend with Puppeteer
    // For now, we'll return a placeholder
    const response = await fetch("/api/scrape-job", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    })

    if (!response.ok) {
      throw new Error("Failed to scrape job description")
    }

    const data = await response.json()
    return data.jobDescription
  } catch (error) {
    console.error("Error scraping job description:", error)
    throw error
  }
}
