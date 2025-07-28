"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface ScoreMeterProps {
  score: number
  skillsFound?: string[]
  skillsMissing?: string[]
}

export function ScoreMeter({ score, skillsFound = [], skillsMissing = [] }: ScoreMeterProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent"
    if (score >= 60) return "Good"
    return "Needs Improvement"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>ATS Compatibility Score</CardTitle>
        <CardDescription>How well your resume matches the job requirements</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className={`text-4xl font-bold ${getScoreColor(score)}`}>{score}%</div>
          <p className="text-sm text-muted-foreground mt-1">{getScoreLabel(score)}</p>
        </div>

        <Progress value={score} className="h-3" />

        {skillsFound.length > 0 && (
          <div>
            <h4 className="font-medium text-green-600 mb-2">Skills Found</h4>
            <div className="flex flex-wrap gap-2">
              {skillsFound.map((skill, index) => (
                <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {skillsMissing.length > 0 && (
          <div>
            <h4 className="font-medium text-red-600 mb-2">Missing Skills</h4>
            <div className="flex flex-wrap gap-2">
              {skillsMissing.map((skill, index) => (
                <Badge key={index} variant="secondary" className="bg-red-100 text-red-800">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
