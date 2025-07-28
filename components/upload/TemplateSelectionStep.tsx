"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, ArrowLeft, ArrowRight } from "lucide-react"
import { templates } from "@/lib/templates"
import { generateResumeHTML, convertResumeDataToTemplate } from "@/lib/pdf/generator"
import { useResumeStore } from "@/lib/store/useResumeStore"

interface TemplateSelectionStepProps {
  onNext: () => void
  onPrevious: () => void
}

export function TemplateSelectionStep({ onNext, onPrevious }: TemplateSelectionStepProps) {
  const {
    parsedData: resumeData,
    selectedTemplateId: selectedTemplate,
    setSelectedTemplateId: setSelectedTemplate
  } = useResumeStore()
  const [previewTemplate, setPreviewTemplate] = useState<string | null>(null)

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId)
  }

  const handlePreview = (templateId: string) => {
    if (!resumeData) return

    try {
      const convertedData = convertResumeDataToTemplate(resumeData)
      const html = generateResumeHTML(templateId, convertedData)

      // Open preview in new window
      const previewWindow = window.open("", "_blank")
      if (previewWindow) {
        previewWindow.document.write(html)
        previewWindow.document.close()
      }
    } catch (error) {
      console.error("Preview error:", error)
    }
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      professional: "bg-blue-100 text-blue-800",
      creative: "bg-purple-100 text-purple-800",
      minimal: "bg-gray-100 text-gray-800",
      executive: "bg-green-100 text-green-800",
      tech: "bg-orange-100 text-orange-800",
    }
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Template</h2>
        <p className="text-gray-600">Select a professional template that matches your style</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <Card
            key={template.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedTemplate === template.id ? "ring-2 ring-blue-500 shadow-lg" : "hover:shadow-md"
            }`}
            onClick={() => handleTemplateSelect(template.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{template.name}</CardTitle>
                <Badge className={getCategoryColor(template.category)}>{template.category}</Badge>
              </div>
              <CardDescription className="text-sm">{template.description}</CardDescription>
            </CardHeader>

            <CardContent className="pt-0">
              {/* Template Preview Placeholder */}
              <div className="aspect-[3/4] bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg mb-4 flex items-center justify-center border-2 border-dashed border-gray-200">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-2 flex items-center justify-center">
                    <span className="text-2xl">📄</span>
                  </div>
                  <p className="text-sm text-gray-500 font-medium">{template.name}</p>
                  <p className="text-xs text-gray-400">Preview</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-transparent"
                  onClick={(e) => {
                    e.stopPropagation()
                    handlePreview(template.id)
                  }}
                  disabled={!resumeData}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Preview
                </Button>
                <Button
                  variant={selectedTemplate === template.id ? "default" : "outline"}
                  size="sm"
                  className="flex-1"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleTemplateSelect(template.id)
                  }}
                >
                  {selectedTemplate === template.id ? "Selected" : "Select"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Template Categories Filter */}
      <div className="flex flex-wrap gap-2 justify-center">
        <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
          All Templates
        </Badge>
        <Badge variant="outline" className="cursor-pointer hover:bg-blue-50">
          Professional
        </Badge>
        <Badge variant="outline" className="cursor-pointer hover:bg-purple-50">
          Creative
        </Badge>
        <Badge variant="outline" className="cursor-pointer hover:bg-gray-50">
          Minimal
        </Badge>
        <Badge variant="outline" className="cursor-pointer hover:bg-green-50">
          Executive
        </Badge>
        <Badge variant="outline" className="cursor-pointer hover:bg-orange-50">
          Tech
        </Badge>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onPrevious}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>
        <Button onClick={onNext} disabled={!selectedTemplate} className="min-w-[120px]">
          Next
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}
