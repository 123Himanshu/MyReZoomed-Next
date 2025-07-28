import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Eye } from "lucide-react"

export function ResumeCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="h-5 w-5" />
          Enhanced Resume
        </CardTitle>
        <CardDescription>Your AI-enhanced resume is ready for download</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-muted p-4 rounded-lg">
          <p className="text-sm text-muted-foreground mb-2">Improvements made:</p>
          <ul className="text-sm space-y-1">
            <li>• Enhanced job descriptions with action verbs</li>
            <li>• Optimized keywords for ATS systems</li>
            <li>• Improved formatting and structure</li>
            <li>• Added relevant skills and achievements</li>
          </ul>
        </div>

        <div className="flex gap-2">
          <Button className="flex-1">
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
          <Button variant="outline" className="flex-1 bg-transparent">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
