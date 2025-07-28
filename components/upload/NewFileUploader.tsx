"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { uploadFile } from "@/lib/api-config"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, File, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { ResumeData } from "@/types/resume"
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
          console.log('API Response:', result)
          setResumeData(result)
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
    <div className="space-y-4">
      <Card
        {...getRootProps()}
        className={`border-2 border-dashed ${
          isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25"
        } hover:border-primary transition-colors cursor-pointer`}
      >
        <CardContent className="flex flex-col items-center justify-center py-10 text-center">
          {uploadedFile ? (
            <div className="flex items-center gap-2">
              <File className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm font-medium">{uploadedFile.name}</p>
                <p className="text-xs text-gray-500">
                  {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="ml-2"
                onClick={(e) => {
                  e.stopPropagation()
                  removeFile()
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <>
              <input {...getInputProps()} />
              <Upload className="mb-4 h-12 w-12 text-gray-400" />
              <h3 className="mb-2 text-lg font-semibold">Drop your resume here</h3>
              <p className="text-sm text-gray-500">or click to browse</p>
              <p className="mt-2 text-xs text-gray-400">
                Supported formats: {acceptedTypes.join(", ")}
              </p>
            </>
          )}
        </CardContent>
      </Card>

      {loading && (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600">Processing your resume...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm">
          {error}
        </div>
      )}

      {resumeData && <ResumePreview data={resumeData} />}
    </div>
  )
}
