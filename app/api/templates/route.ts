import { NextResponse } from "next/server"
import connectDB from "@/lib/database/mongodb"
import Template from "@/lib/database/models/Template"

export async function GET() {
  try {
    await connectDB()

    const templates = await Template.find({ isActive: true }).select("-htmlTemplate -cssStyles")

    return NextResponse.json({
      success: true,
      templates,
    })
  } catch (error) {
    console.error("Templates fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch templates" }, { status: 500 })
  }
}
