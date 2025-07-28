"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, X, Calendar } from "lucide-react"
import type { UploadedFile } from "@/types"

interface FilePreviewProps {
  file: UploadedFile
  onRemove: () => void
}

export function FilePreview({ file, onRemove }: FilePreviewProps) {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getFileTypeColor = (type: string) => {
    if (type.includes("pdf")) return "bg-red-100 text-red-800"
    if (type.includes("word") || type.includes("document")) return "bg-blue-100 text-blue-800"
    return "bg-gray-100 text-gray-800"
  }

  const getFileExtension = (filename: string) => {
    return filename.split(".").pop()?.toUpperCase() || "FILE"
  }

  return (
    <Card className="border-green-200 bg-green-50/50">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-primary" />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                <Badge variant="secondary" className={getFileTypeColor(file.type)}>
                  {getFileExtension(file.name)}
                </Badge>
              </div>

              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>{formatFileSize(file.size)}</span>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>Uploaded {file.uploadedAt.toLocaleTimeString()}</span>
                </div>
              </div>

              <div className="mt-2">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-green-600 font-medium">Ready for processing</span>
                </div>
              </div>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={onRemove}
            className="flex-shrink-0 text-muted-foreground hover:text-destructive"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
