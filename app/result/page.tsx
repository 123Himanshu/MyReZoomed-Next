import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Download, Eye, ArrowLeft, Target, Brain, FileText } from "lucide-react"
import Link from "next/link"

export default function ResultPage() {
  // TODO: This will be populated with actual data from the backend
  const mockResults = {
    atsScore: 78,
    skillsFound: ["JavaScript", "React", "Node.js", "Python", "SQL"],
    skillsMissing: ["AWS", "Docker", "Kubernetes", "TypeScript"],
    suggestions: [
      "Add more quantifiable achievements in your experience section",
      "Include relevant keywords from the job description",
      "Improve the formatting of your skills section",
      "Add a professional summary at the top",
    ],
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Resume Analysis Results</h1>
            <p className="text-muted-foreground">Your AI-powered resume evaluation is complete</p>
          </div>
          <Link href="/upload">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Upload Another
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ATS Score */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-600" />
                ATS Compatibility Score
              </CardTitle>
              <CardDescription>How well your resume matches ATS requirements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">{mockResults.atsScore}%</div>
                <p className="text-sm text-muted-foreground">Good Match</p>
              </div>
              <Progress value={mockResults.atsScore} className="h-3" />

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-green-600 mb-2">Skills Found ({mockResults.skillsFound.length})</h4>
                  <div className="flex flex-wrap gap-2">
                    {mockResults.skillsFound.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-red-600 mb-2">Missing Skills ({mockResults.skillsMissing.length})</h4>
                  <div className="flex flex-wrap gap-2">
                    {mockResults.skillsMissing.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="bg-red-100 text-red-800">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Suggestions */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-600" />
                AI Improvement Suggestions
              </CardTitle>
              <CardDescription>Personalized recommendations to enhance your resume</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockResults.suggestions.map((suggestion, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-medium text-purple-600">{index + 1}</span>
                    </div>
                    <p className="text-sm leading-relaxed">{suggestion}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Resume Download */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-green-600" />
                Enhanced Resume
              </CardTitle>
              <CardDescription>Your optimized resume is ready for download</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                <div className="text-center sm:text-left">
                  <h3 className="font-semibold text-lg mb-2">Resume_Enhanced.pdf</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Your resume has been optimized with AI suggestions and improved formatting
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      ATS Optimized
                    </Badge>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      AI Enhanced
                    </Badge>
                    <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                      Professional Format
                    </Badge>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1 sm:flex-none bg-transparent">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                  <Button className="flex-1 sm:flex-none">
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
