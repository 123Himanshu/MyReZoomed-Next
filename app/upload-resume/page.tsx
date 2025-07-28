import { FileUploader } from "@/components/upload/NewFileUploader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function UploadResumePage() {
  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Resume Enhancer</CardTitle>
          <CardDescription>Upload your resume and our AI will enhance it for better job applications</CardDescription>
        </CardHeader>
        <CardContent>
          <FileUploader
            acceptedTypes={[".pdf", ".doc", ".docx"]}
            onFileUpload={(file) => {
              // TODO: Handle file upload
              console.log("File uploaded:", file.name)
            }}
          />
        </CardContent>
      </Card>
    </div>
  )
}
