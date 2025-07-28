"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { FileUploader } from "@/components/FileUploader"
import { ScoreMeter } from "@/components/ScoreMeter"
import { Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"

export default function ATSCheckerPage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [jobDesc, setJobDesc] = useState("")
  const [resumeData, setResumeData] = useState<any>(null)
  const [analysis, setAnalysis] = useState<any>(null)
  const { toast } = useToast()

  const handleFileUpload = async (file: File) => {
    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to upload file")
      }

      const data = await response.json()
      setResumeData(data.parsedData)
      toast({
        title: "Resume Uploaded",
        description: "Your resume has been successfully uploaded and parsed.",
      })
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "Failed to upload and parse resume. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleAnalyze = async () => {

    if (!resumeData || !jobDesc.trim()) {
      toast({
        title: "Missing Information",
        description: "Please upload a resume and provide a job description",
        variant: "destructive"
      })
      return
    }

    setIsAnalyzing(true)
    try {
      const response = await fetch("/api/ats-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeData: resumeData,
          jobDescription: jobDesc
        })
      })

      const data = await response.json()
      if (!data.success) {
        throw new Error(data.error)
      }

      setAnalysis(data.analysis)
      toast({
        title: "Analysis Complete",
        description: "Your resume has been analyzed against the job description"
      })
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: error.message || "Failed to analyze resume",
        variant: "destructive"
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>ATS Score Checker</CardTitle>
            <CardDescription>
              Upload your resume and paste the job description to get an ATS compatibility score
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="resume-upload">Upload Resume</Label>
              <FileUploader
                acceptedTypes={[".pdf", ".doc", ".docx"]}
                onFileUpload={handleFileUpload}
              />
            </div>

            <div>
              <Label htmlFor="job-description">Job Description</Label>
              <Textarea 
                id="job-description" 
                placeholder="Paste the job description here..." 
                className="min-h-[200px]"
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
              />
            </div>

            <Button 
              className="w-full" 
              onClick={handleAnalyze}
              disabled={isAnalyzing || !resumeData}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Check ATS Score"
              )}
            </Button>
          </CardContent>
        </Card>

        {analysis && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ScoreMeter 
              score={analysis.score} 
              skillsFound={analysis.matchedKeywords}
              skillsMissing={analysis.missingKeywords}
            />
          </motion.div>
        )}
      </div>
    </div>
  )
}
