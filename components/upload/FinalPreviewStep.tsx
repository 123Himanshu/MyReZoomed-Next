"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Download, Eye, Share2, Save, FileText } from "lucide-react"
import { useResumeStore } from "@/lib/store/useResumeStore"
import { generateResumeHTML, convertResumeDataToTemplate, generateClientSidePDF } from "@/lib/pdf/generator"
import { getTemplateById } from "@/lib/templates"
import { useToast } from "@/hooks/use-toast"

interface FinalPreviewStepProps {
  onPrevious: () => void
  onReset: () => void
}

export function FinalPreviewStep({ onPrevious, onReset }: FinalPreviewStepProps) {
  const { parsedData: resumeData, selectedTemplateId: selectedTemplate, enhancedData: enhancedContent } = useResumeStore()
  const { toast } = useToast()
  const [isGenerating, setIsGenerating] = useState(false)
  const [previewHtml, setPreviewHtml] = useState<string>("")

  const template = selectedTemplate ? getTemplateById(selectedTemplate) : null

  useEffect(() => {
    if (resumeData && selectedTemplate) {
      try {
        const dataToUse = enhancedContent || resumeData
        const convertedData = convertResumeDataToTemplate(dataToUse)
        const html = generateResumeHTML(selectedTemplate, convertedData)
        setPreviewHtml(html)
      } catch (error) {
        console.error("Preview generation error:", error)
        toast({
          title: "Preview Error",
          description: "Failed to generate preview. Please try again.",
          variant: "destructive",
        })
      }
    }
  }, [resumeData, selectedTemplate, enhancedContent, toast])

  const handlePreview = () => {
    if (previewHtml) {
      const previewWindow = window.open("", "_blank")
      if (previewWindow) {
        previewWindow.document.write(previewHtml)
        previewWindow.document.close()
      }
    }
  }

  const handleDownloadPDF = async () => {
    if (!resumeData || !selectedTemplate) return

    setIsGenerating(true)
    try {
      const dataToUse = enhancedContent || resumeData
      if (!dataToUse || !selectedTemplate) {
        throw new Error("No resume data or template available")
      }
      const convertedData = convertResumeDataToTemplate(dataToUse)

      // Use client-side PDF generation with proper options
      generateClientSidePDF({
        templateId: selectedTemplate,
        data: convertedData,
        filename: `resume-${new Date().toISOString().split('T')[0]}.pdf`
      })

      toast({
        title: "PDF Generated",
        description: "Your resume PDF is being prepared for download.",
      })
    } catch (error) {
      console.error("PDF generation error:", error)
      toast({
        title: "Generation Failed",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSaveResume = async () => {
    try {
      // Save resume to database
      const response = await fetch("/api/resumes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: enhancedContent || resumeData,
          templateId: selectedTemplate,
          title: `Resume - ${new Date().toLocaleDateString()}`,
        }),
      })

      if (response.ok) {
        toast({
          title: "Resume Saved",
          description: "Your resume has been saved to your dashboard.",
        })
      } else {
        throw new Error("Failed to save resume")
      }
    } catch (error) {
      console.error("Save error:", error)
      toast({
        title: "Save Failed",
        description: "Failed to save resume. Please try again.",
        variant: "destructive",
      })
    }
  }

  const getResumeStats = () => {
    const data = enhancedContent || resumeData
    if (!data) return null

    const stats = {
      experience: typeof data.experience === 'string' ? data.experience.split('\n').length : 0,
      education: typeof data.education === 'string' ? data.education.split('\n').length : 0,
      skills: Array.isArray(data.skills) ? data.skills.length : 0,
      projects: Array.isArray(data.projects) ? data.projects.length : 0,
    }

    return stats
  }

  const stats = getResumeStats()

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Final Preview</h2>
        <p className="text-gray-600">Review your resume and download when ready</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Preview Panel */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Resume Preview
                </CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handlePreview}>
                    <Eye className="w-4 h-4 mr-1" />
                    Full Preview
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Embedded Preview */}
              <div className="border rounded-lg overflow-hidden bg-white">
                <div className="aspect-[8.5/11] bg-gray-50 flex items-center justify-center">
                  {previewHtml ? (
                    <iframe srcDoc={previewHtml} className="w-full h-full border-0" title="Resume Preview" />
                  ) : (
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
                        <FileText className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="text-gray-500">Generating preview...</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Info Panel */}
        <div className="space-y-6">
          {/* Template Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Template Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {template && (
                <>
                  <div>
                    <h3 className="font-semibold">{template.name}</h3>
                    <p className="text-sm text-gray-600">{template.description}</p>
                  </div>
                  <Badge className="w-fit">{template.category}</Badge>
                </>
              )}
            </CardContent>
          </Card>

          {/* Resume Stats */}
          {stats && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Resume Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Work Experience</span>
                  <span className="font-semibold">{stats.experience} positions</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Education</span>
                  <span className="font-semibold">{stats.education} degrees</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Skills</span>
                  <span className="font-semibold">{stats.skills} skills</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Projects</span>
                  <span className="font-semibold">{stats.projects} projects</span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" onClick={handleDownloadPDF} disabled={isGenerating}>
                <Download className="w-4 h-4 mr-2" />
                {isGenerating ? "Generating..." : "Download PDF"}
              </Button>

              <Button variant="outline" className="w-full bg-transparent" onClick={handleSaveResume}>
                <Save className="w-4 h-4 mr-2" />
                Save to Dashboard
              </Button>

              <Button variant="outline" className="w-full bg-transparent" onClick={handlePreview}>
                <Eye className="w-4 h-4 mr-2" />
                Full Screen Preview
              </Button>

              <Separator />

              <Button variant="outline" className="w-full bg-transparent" disabled>
                <Share2 className="w-4 h-4 mr-2" />
                Share Resume (Coming Soon)
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onPrevious}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>
        <Button onClick={onReset} className="min-w-[120px]">
          Start Over
        </Button>
      </div>
    </div>
  )
}
