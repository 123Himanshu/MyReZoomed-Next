import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Brain } from "lucide-react"

export function UploadSkeleton() {
  return (
    <div className="space-y-6">
      {/* Processing status */}
      <Card className="border-blue-200 bg-blue-50/50">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="animate-spin">
              <Brain className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-blue-900">AI Analysis in Progress</p>
              <p className="text-sm text-blue-700">Processing your resume content...</p>
            </div>
          </div>
          <Progress value={65} className="h-2" />
        </CardContent>
      </Card>

      {/* Processing steps */}
      <div className="space-y-3">
        <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
          <span className="text-sm font-medium">Extracting text from resume</span>
        </div>

        <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
          <span className="text-sm font-medium">Analyzing content structure</span>
        </div>

        <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30">
          <div className="w-6 h-6 bg-muted-foreground/30 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
          <span className="text-sm text-muted-foreground">Generating AI suggestions</span>
        </div>

        <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30">
          <div className="w-6 h-6 bg-muted-foreground/30 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
          <span className="text-sm text-muted-foreground">Calculating ATS score</span>
        </div>
      </div>

      {/* Shimmer placeholders */}
      <div className="space-y-4">
        <div className="h-4 bg-gradient-to-r from-muted via-muted-foreground/20 to-muted rounded shimmer"></div>
        <div className="h-4 bg-gradient-to-r from-muted via-muted-foreground/20 to-muted rounded shimmer w-3/4"></div>
        <div className="h-4 bg-gradient-to-r from-muted via-muted-foreground/20 to-muted rounded shimmer w-1/2"></div>
      </div>
    </div>
  )
}
