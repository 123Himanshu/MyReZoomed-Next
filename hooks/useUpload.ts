"use client"

import { useState, useCallback } from "react"
import type { UploadedFile } from "@/types"
import { SUPPORTED_FILE_TYPES, MAX_FILE_SIZE } from "@/constants"

interface UseUploadOptions {
  onSuccess?: (file: UploadedFile) => void
  onError?: (error: string) => void
}

export function useUpload({ onSuccess, onError }: UseUploadOptions = {}) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null)
  const [error, setError] = useState<string | null>(null)

  const validateFile = useCallback((file: File): string | null => {
    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      return `File size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB`
    }

    // Check file type
    const supportedTypes = Object.keys(SUPPORTED_FILE_TYPES)
    if (!supportedTypes.includes(file.type)) {
      return "Only PDF, DOC, and DOCX files are supported"
    }

    return null
  }, [])

  const uploadFile = useCallback(
    async (file: File) => {
      setError(null)
      setIsUploading(true)

      try {
        // Validate file
        const validationError = validateFile(file)
        if (validationError) {
          throw new Error(validationError)
        }

        // TODO: Implement actual file upload logic
        // For now, simulate upload with timeout
        await new Promise((resolve) => setTimeout(resolve, 2000))

        const uploadedFile: UploadedFile = {
          id: Math.random().toString(36).substring(7),
          name: file.name,
          size: file.size,
          type: file.type,
          uploadedAt: new Date(),
        }

        setUploadedFile(uploadedFile)
        onSuccess?.(uploadedFile)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Upload failed"
        setError(errorMessage)
        onError?.(errorMessage)
      } finally {
        setIsUploading(false)
      }
    },
    [validateFile, onSuccess, onError],
  )

  const removeFile = useCallback(() => {
    setUploadedFile(null)
    setError(null)
  }, [])

  return {
    uploadFile,
    removeFile,
    isUploading,
    uploadedFile,
    error,
    validateFile,
  }
}
