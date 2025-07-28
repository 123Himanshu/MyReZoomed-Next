"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useResumeStore } from "@/lib/store/useResumeStore"
import { FileUploadStep } from "@/components/upload/FileUploadStep"
import { ResumePreviewStep } from "@/components/upload/ResumePreviewStep"
import { EnhancementStep } from "@/components/upload/EnhancementStep"
import { TemplateSelectionStep } from "@/components/upload/TemplateSelectionStep"
import { FinalPreviewStep } from "@/components/upload/FinalPreviewStep"
import { ProgressIndicator } from "@/components/upload/ProgressIndicator"
import { useAuth } from "@clerk/nextjs"
import { redirect } from "next/navigation"

const steps = [
  { id: "upload", title: "Upload Resume", description: "Upload your resume file" },
  { id: "preview", title: "Review & Edit", description: "Review parsed data" },
  { id: "enhance", title: "AI Enhancement", description: "Enhance with AI" },
  { id: "template", title: "Choose Template", description: "Select design" },
  { id: "final", title: "Final Preview", description: "Download & ATS" },
]

export default function UploadPage() {
  const { isSignedIn } = useAuth()
  const [currentStep, setCurrentStep] = useState(0)
  const { resetStore } = useResumeStore()

  if (!isSignedIn) {
    redirect("/sign-in")
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleReset = () => {
    resetStore()
    setCurrentStep(0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">
              Create Your Perfect <span className="text-gradient-primary">Resume</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Follow our step-by-step process to create an ATS-optimized resume
            </p>
          </motion.div>

          {/* Progress Indicator */}
          <ProgressIndicator steps={steps} currentStep={currentStep} />

          {/* Step Content */}
          <div className="mt-12">
            <AnimatePresence mode="wait">
              {currentStep === 0 && <FileUploadStep key="upload" onNext={handleNext} />}
              {currentStep === 1 && <ResumePreviewStep key="preview" onNext={handleNext} onPrevious={handlePrevious} />}
              {currentStep === 2 && <EnhancementStep key="enhance" onNext={handleNext} onPrevious={handlePrevious} />}
              {currentStep === 3 && (
                <TemplateSelectionStep key="template" onNext={handleNext} onPrevious={handlePrevious} />
              )}
              {currentStep === 4 && <FinalPreviewStep key="final" onPrevious={handlePrevious} onReset={handleReset} />}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
