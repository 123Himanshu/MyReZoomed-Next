"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { uploadFile } from "@/lib/api-config"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, File, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ResumeData, APIResponse } from "@/types/resume"
import { ResumePreview } from "@/components/ResumePreview"

interface FileUploaderProps {
  acceptedTypes: string[]
  onFileUpload: (file: File) => void
  maxSize?: number
}

export function FileUploader({
  acceptedTypes,
  onFileUpload,
  maxSize = 10 * 1024 * 1024, // 10MB default
}: FileUploaderProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [resumeData, setResumeData] = useState<ResumeData | null>(null)
  const [originalText, setOriginalText] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      try {
        setError(null)
        setLoading(true)
        const file = acceptedFiles[0]
        if (file) {
          setUploadedFile(file)
          const result = await uploadFile(file)
          setResumeData(result.enhancedData)
          setOriginalText(result.originalText)
          onFileUpload(file)
        }
      } catch (error) {
        console.error('Upload failed:', error)
        setError('Failed to upload and process resume. Please try again.')
      } finally {
        setLoading(false)
      }
    },
    [onFileUpload],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedTypes.reduce(
      (acc, type) => {
        acc[type] = []
        return acc
      },
      {} as Record<string, string[]>,
    ),
    maxSize,
    multiple: false,
  })

  const removeFile = () => {
    setUploadedFile(null)
    setResumeData(null)
    setError(null)
  }

  return (
    <div className="w-full space-y-4">
      <div className="w-full">
        {!uploadedFile ? (
          <Card
            {...getRootProps()}
            className={`border-2 border-dashed cursor-pointer transition-colors ${
              isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25"
            }`}
          >
            <CardContent className="flex flex-col items-center justify-center py-12">
              <input {...getInputProps()} />
              <Upload className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg font-medium mb-2">{isDragActive ? "Drop your file here" : "Upload your resume"}</p>
              <p className="text-sm text-muted-foreground text-center">
                Drag and drop or click to select
                <br />
                Supported formats: {acceptedTypes.join(", ")}
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <File className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-medium">{uploadedFile.name}</p>
                  <p className="text-sm text-muted-foreground">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={removeFile}>
                <X className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {loading && (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-sm text-muted-foreground">Processing your resume...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm">
          {error}
        </div>
      )}

      {resumeData && <ResumePreview data={resumeData} originalText={originalText || undefined} />}
    </div>
  )
}
