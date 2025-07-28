"use client"

import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, FileText, AlertCircle } from "lucide-react"
import { SUPPORTED_FILE_TYPES, MAX_FILE_SIZE } from "@/constants"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface FileUploaderProps {
  onFileSelect: (file: File) => void
  isUploading?: boolean
  error?: string | null
}

export function FileUploader({ onFileSelect, isUploading = false, error }: FileUploaderProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (file) {
        onFileSelect(file)
      }
    },
    [onFileSelect],
  )

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: SUPPORTED_FILE_TYPES,
    maxSize: MAX_FILE_SIZE,
    multiple: false,
    disabled: isUploading,
  })

  const formatFileSize = (bytes: number) => {
    return `${(bytes / 1024 / 1024).toFixed(1)}MB`
  }

  return (
    <div className="space-y-4">
      <Card
        {...getRootProps()}
        className={`border-2 border-dashed cursor-pointer transition-all duration-200 ${
          isDragActive
            ? "border-primary bg-primary/5 scale-[1.02]"
            : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50"
        } ${isUploading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <CardContent className="flex flex-col items-center justify-center py-12 px-6">
          <input {...getInputProps()} />

          <div className={`rounded-full p-4 mb-4 ${isDragActive ? "bg-primary/10" : "bg-muted"}`}>
            {isUploading ? (
              <div className="animate-spin">
                <Upload className="h-8 w-8 text-muted-foreground" />
              </div>
            ) : (
              <FileText className={`h-8 w-8 ${isDragActive ? "text-primary" : "text-muted-foreground"}`} />
            )}
          </div>

          <div className="text-center space-y-2">
            <p className="text-lg font-medium">
              {isUploading ? "Uploading..." : isDragActive ? "Drop your resume here" : "Upload your resume"}
            </p>
            <p className="text-sm text-muted-foreground">
              {isUploading ? "Please wait while we process your file" : "Drag and drop or click to select"}
            </p>
            <p className="text-xs text-muted-foreground">PDF, DOC, DOCX up to {formatFileSize(MAX_FILE_SIZE)}</p>
          </div>

          {!isUploading && (
            <Button variant="outline" className="mt-4 bg-transparent" type="button">
              <Upload className="h-4 w-4 mr-2" />
              Choose File
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Error messages */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* File rejection errors */}
      {fileRejections.length > 0 && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{fileRejections[0].errors[0].message}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}
