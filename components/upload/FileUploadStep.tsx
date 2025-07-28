"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, FileText, AlertCircle } from "lucide-react"
import { useDropzone } from "react-dropzone"
import { useResumeStore } from "@/lib/store/useResumeStore"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface FileUploadStepProps {
  onNext: () => void
}

export function FileUploadStep({ onNext }: FileUploadStepProps) {
  const { toast } = useToast()
  const { setUploadedFile, setOriginalText, setParsedData, isUploading, setIsUploading, setIsParsing, uploadedFile } =
    useResumeStore()

  const [error, setError] = useState<string | null>(null)

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    setError(null)
    setIsUploading(true)
    setUploadedFile(file)

    try {
      const API_URL = process.env.NEXT_PUBLIC_PYTHON_API_URL
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch(`${API_URL}/upload`, {
        method: "POST",
        body: formData,
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        },
        mode: 'cors'
      })

      if (!response.ok) {
        throw new Error("Failed to upload file")
      }

      const data = await response.json()
      
      // console.log(data.originalText)
      console.log(data.enhancedData)
      setOriginalText(data.originalText)
      setParsedData(data.enhancedData)

      toast({
        title: "File uploaded successfully",
        description: "Your resume has been parsed and is ready for review.",
      })

      // Auto-advance to next step
      setTimeout(() => {
        onNext()
      }, 1000)
    } catch (error) {
      console.error("Upload error:", error)
      setError("Failed to upload and parse resume. Please try again.")
      toast({
        title: "Upload failed",
        description: "There was an error processing your resume.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      "application/msword": [".doc"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/tiff": [".tif", ".tiff"],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: false,
    disabled: isUploading,
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-2xl mx-auto"
    >
      <Card className="shadow-xl border-primary/10">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <Upload className="h-6 w-6 text-primary" />
            Upload Your Resume
          </CardTitle>
          <CardDescription className="text-base">
            Upload your resume in PDF, DOC, DOCX, or image format (JPG, PNG, TIFF) • Max 10MB
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all ${
              isDragActive
                ? "border-primary bg-primary/5 scale-105"
                : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50"
            } ${isUploading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <input {...getInputProps()} />

            <motion.div
              animate={{
                rotate: isUploading ? 360 : 0,
                scale: isDragActive ? 1.1 : 1,
              }}
              transition={{
                rotate: { duration: 2, repeat: isUploading ? Number.POSITIVE_INFINITY : 0, ease: "linear" },
                scale: { duration: 0.2 },
              }}
              className="mb-6"
            >
              <div
                className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center ${
                  isDragActive ? "bg-primary/10" : "bg-muted"
                }`}
              >
                <FileText className={`h-10 w-10 ${isDragActive ? "text-primary" : "text-muted-foreground"}`} />
              </div>
            </motion.div>

            <div className="space-y-2">
              <p className="text-xl font-semibold">
                {isUploading
                  ? "Processing your resume..."
                  : isDragActive
                    ? "Drop your resume here"
                    : "Drag & drop your resume here"}
              </p>
              <p className="text-muted-foreground">
                {isUploading ? "Please wait while we parse your resume with AI" : "or click to browse files"}
              </p>
              <p className="text-sm text-muted-foreground">Supported: PDF, DOC, DOCX, JPG, PNG, TIFF • Max size: 10MB</p>
            </div>

            {!isUploading && (
              <Button variant="outline" className="mt-6 bg-transparent">
                <Upload className="h-4 w-4 mr-2" />
                Choose File
              </Button>
            )}
          </div>

          {/* Error Messages */}
          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {fileRejections.length > 0 && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{fileRejections[0].errors[0].message}</AlertDescription>
            </Alert>
          )}

          {/* File Preview */}
          {uploadedFile && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800"
            >
              <div className="flex items-center gap-3">
                <FileText className="h-8 w-8 text-green-600" />
                <div className="flex-1">
                  <p className="font-medium text-green-800 dark:text-green-200">{uploadedFile.name}</p>
                  <p className="text-sm text-green-600 dark:text-green-400">
                    {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                {isUploading && (
                  <div className="animate-spin w-5 h-5 border-2 border-green-600 border-t-transparent rounded-full" />
                )}
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
