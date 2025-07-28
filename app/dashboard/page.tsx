"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { FileText, Plus, Download, Eye, Edit, Trash2, Target, Clock, Star, BarChart3, Zap } from "lucide-react"
import { useAuth, useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface ResumeItem {
  id: string
  name: string
  templateName: string
  createdAt: string
  updatedAt: string
  atsScore?: number
  isEnhanced: boolean
  status: "draft" | "completed" | "analyzing"
}

export default function DashboardPage() {
  const { isSignedIn } = useAuth()
  const { user } = useUser()
  const router = useRouter()
  const [resumes, setResumes] = useState<ResumeItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState({
    totalResumes: 0,
    avgATSScore: 0,
    enhancedResumes: 0,
    recentActivity: 0,
  })

  // Mock data - in real app, this would come from API
  useEffect(() => {
    if (!isSignedIn) {
      router.push("/sign-in")
      return
    }

    // Simulate API call
    setTimeout(() => {
      const mockResumes: ResumeItem[] = [
        {
          id: "1",
          name: "Software Engineer Resume",
          templateName: "Modern Professional",
          createdAt: "2024-01-15",
          updatedAt: "2024-01-16",
          atsScore: 87,
          isEnhanced: true,
          status: "completed",
        },
        {
          id: "2",
          name: "Frontend Developer Resume",
          templateName: "Tech Specialist",
          createdAt: "2024-01-10",
          updatedAt: "2024-01-12",
          atsScore: 92,
          isEnhanced: true,
          status: "completed",
        },
        {
          id: "3",
          name: "Product Manager Resume",
          templateName: "Classic Executive",
          createdAt: "2024-01-08",
          updatedAt: "2024-01-08",
          isEnhanced: false,
          status: "draft",
        },
      ]

      setResumes(mockResumes)
      setStats({
        totalResumes: mockResumes.length,
        avgATSScore: Math.round(
          mockResumes.filter((r) => r.atsScore).reduce((acc, r) => acc + (r.atsScore || 0), 0) /
            mockResumes.filter((r) => r.atsScore).length,
        ),
        enhancedResumes: mockResumes.filter((r) => r.isEnhanced).length,
        recentActivity: mockResumes.filter(
          (r) => new Date(r.updatedAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        ).length,
      })
      setIsLoading(false)
    }, 1000)
  }, [isSignedIn, router])

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500"
    if (score >= 60) return "text-yellow-500"
    return "text-red-500"
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>
      case "draft":
        return <Badge variant="outline">Draft</Badge>
      case "analyzing":
        return <Badge className="bg-blue-100 text-blue-800">Analyzing</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  if (!isSignedIn) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h1 className="text-4xl font-bold mb-2">
                Welcome back, <span className="text-gradient-primary">{user?.firstName}</span>
              </h1>
              <p className="text-muted-foreground text-lg">Manage your resumes and track your progress</p>
            </div>
            <Link href="/upload">
              <Button size="lg" className="gap-2">
                <Plus className="h-5 w-5" />
                Create New Resume
              </Button>
            </Link>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card className="hover-lift">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Resumes</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalResumes}</div>
                  <p className="text-xs text-muted-foreground">+2 from last month</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card className="hover-lift">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg ATS Score</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${getScoreColor(stats.avgATSScore)}`}>{stats.avgATSScore}%</div>
                  <p className="text-xs text-muted-foreground">+5% from last week</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Card className="hover-lift">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Enhanced</CardTitle>
                  <Zap className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.enhancedResumes}</div>
                  <p className="text-xs text-muted-foreground">AI-enhanced resumes</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <Card className="hover-lift">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.recentActivity}</div>
                  <p className="text-xs text-muted-foreground">This week</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Resumes Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Resumes List */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Your Resumes
                  </CardTitle>
                  <CardDescription>Manage and track your resume versions</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="animate-pulse">
                          <div className="h-20 bg-muted rounded-lg"></div>
                        </div>
                      ))}
                    </div>
                  ) : resumes.length === 0 ? (
                    <div className="text-center py-12">
                      <FileText className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No resumes yet</h3>
                      <p className="text-muted-foreground mb-4">Create your first AI-enhanced resume</p>
                      <Link href="/upload">
                        <Button>
                          <Plus className="h-4 w-4 mr-2" />
                          Create Resume
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {resumes.map((resume, index) => (
                        <motion.div
                          key={resume.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="font-semibold">{resume.name}</h3>
                                {getStatusBadge(resume.status)}
                                {resume.isEnhanced && (
                                  <Badge className="bg-purple-100 text-purple-800">
                                    <Zap className="h-3 w-3 mr-1" />
                                    AI Enhanced
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span>Template: {resume.templateName}</span>
                                <span>Updated: {new Date(resume.updatedAt).toLocaleDateString()}</span>
                                {resume.atsScore && (
                                  <span className={`font-medium ${getScoreColor(resume.atsScore)}`}>
                                    ATS: {resume.atsScore}%
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          {resume.atsScore && (
                            <div className="mt-3">
                              <div className="flex items-center justify-between text-sm mb-1">
                                <span>ATS Compatibility</span>
                                <span className={getScoreColor(resume.atsScore)}>{resume.atsScore}%</span>
                              </div>
                              <Progress value={resume.atsScore} className="h-2" />
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="/upload">
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Create New Resume
                    </Button>
                  </Link>
                  <Link href="/ats-checker">
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <Target className="h-4 w-4 mr-2" />
                      ATS Score Checker
                    </Button>
                  </Link>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Analytics
                  </Button>
                </CardContent>
              </Card>

              {/* Tips */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    Pro Tips
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-1">ATS Optimization</h4>
                    <p className="text-sm text-blue-600 dark:text-blue-400">
                      Use job-specific keywords to improve your ATS score by 15-20%
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                    <h4 className="font-medium text-green-800 dark:text-green-200 mb-1">AI Enhancement</h4>
                    <p className="text-sm text-green-600 dark:text-green-400">
                      AI-enhanced resumes get 40% more interview callbacks
                    </p>
                  </div>
                  <div className="p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
                    <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-1">Template Selection</h4>
                    <p className="text-sm text-purple-600 dark:text-purple-400">
                      Choose templates that match your industry for better results
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-muted-foreground">Resume enhanced with AI</span>
                      <span className="text-xs text-muted-foreground ml-auto">2h ago</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-muted-foreground">ATS score improved to 87%</span>
                      <span className="text-xs text-muted-foreground ml-auto">1d ago</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-muted-foreground">New resume created</span>
                      <span className="text-xs text-muted-foreground ml-auto">3d ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
