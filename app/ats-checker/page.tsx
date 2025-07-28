import { FileUploader } from "@/components/FileUploader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default function ATSCheckerPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>ATS Score Checker</CardTitle>
          <CardDescription>
            Upload your resume and paste the job description to get an ATS compatibility score
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="resume-upload">Upload Resume</Label>
            <FileUploader
              acceptedTypes={[".pdf", ".doc", ".docx"]}
              onFileUpload={(file) => {
                // TODO: Handle resume upload
                console.log("Resume uploaded:", file.name)
              }}
            />
          </div>

          <div>
            <Label htmlFor="job-description">Job Description</Label>
            <Textarea id="job-description" placeholder="Paste the job description here..." className="min-h-[200px]" />
          </div>

          <Button className="w-full">Check ATS Score</Button>
        </CardContent>
      </Card>
    </div>
  )
}
