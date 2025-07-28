"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, ArrowRight, Brain, Sparkles, Link, Loader2, Wand2 } from "lucide-react"
import { useResumeStore } from "@/lib/store/useResumeStore"
import { useToast } from "@/hooks/use-toast"

interface EnhancementStepProps {
  onNext: () => void
  onPrevious: () => void
}

export function EnhancementStep({ onNext, onPrevious }: EnhancementStepProps) {
  const {
    parsedData,
    enhancedData,
    setEnhancedData,
    jobDescription,
    setJobDescription,
    jobDescriptionUrl,
    setJobDescriptionUrl,
    isEnhancing,
    setIsEnhancing,
    setParsedData
  } = useResumeStore()

  const { toast } = useToast()
  const [enhancementType, setEnhancementType] = useState<"generic" | "targeted">("generic")
  const [isScrapingJob, setIsScrapingJob] = useState(false)

  const handleScrapeJobDescription = async () => {
    if (!jobDescriptionUrl.trim()) {
      toast({
        title: "URL Required",
        description: "Please enter a job posting URL to scrape.",
        variant: "destructive",
      })
      return
    }

    setIsScrapingJob(true)
    try {
      const response = await fetch("/api/scrape-job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: jobDescriptionUrl }),
      })

      if (!response.ok) throw new Error("Failed to scrape job description")

      const data = await response.json()
      setJobDescription(data.jobDescription)

      toast({
        title: "Job Description Scraped",
        description: "Successfully extracted job requirements from the URL.",
      })
    } catch (error) {
      toast({
        title: "Scraping Failed",
        description: "Could not extract job description from the URL. Please paste it manually.",
        variant: "destructive",
      })
    } finally {
      setIsScrapingJob(false)
    }
  }

  const handleEnhancement = async () => {
    if (!parsedData) {
      toast({
        title: "No Resume Data",
        description: "Please go back and upload a resume first.",
        variant: "destructive",
      })
      return
    }

    if (enhancementType === "targeted" && !jobDescription.trim()) {
      toast({
        title: "Job Description Required",
        description: "Please provide a job description for targeted enhancement.",
        variant: "destructive",
      })
      return
    }

    setIsEnhancing(true)
    try {
      const response = await fetch("/api/enhance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeData: parsedData,
          jobDescription: enhancementType === "targeted" ? jobDescription : undefined,
        }),
      })

      if (!response.ok) throw new Error("Enhancement failed")

      const data = await response.json()
      if (data.error) {
        throw new Error(data.error)
      }
      setEnhancedData(data.data)

      toast({
        title: "Enhancement Complete",
        description: "Your resume has been enhanced with AI suggestions.",
      })
    } catch (error) {
      toast({
        title: "Enhancement Failed",
        description: "There was an error enhancing your resume. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsEnhancing(false)
    }
  }

  const handleSkipEnhancement = () => {
    if (parsedData) {
      setEnhancedData(parsedData)
      onNext()
    } else {
      toast({
        title: "No Resume Data",
        description: "Please go back and upload a resume first.",
        variant: "destructive",
      })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-6xl mx-auto"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">
          <span className="text-gradient-primary">AI Enhancement</span>
        </h2>
        <p className="text-muted-foreground text-lg">Let our AI enhance your resume with better content and keywords</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Enhancement Options */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-500" />
              Enhancement Options
            </CardTitle>
            <CardDescription>Choose how you want to enhance your resume</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Tabs value={enhancementType} onValueChange={(value) => setEnhancementType(value as any)}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="generic" className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Generic
                </TabsTrigger>
                <TabsTrigger value="targeted" className="flex items-center gap-2">
                  <Wand2 className="h-4 w-4" />
                  Targeted
                </TabsTrigger>
              </TabsList>

              <TabsContent value="generic" className="space-y-4">
                <div className="p-4 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-lg border border-purple-500/20">
                  <h3 className="font-semibold text-purple-400 mb-2">Generic Enhancement</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Improve grammar, use stronger action verbs, and optimize for general ATS compatibility.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                      <span>Grammar and spelling corrections</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                      <span>Stronger action verbs</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                      <span>Professional formatting</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                      <span>Industry-standard keywords</span>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="targeted" className="space-y-4">
                <div className="p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/20">
                  <h3 className="font-semibold text-green-400 mb-2">Targeted Enhancement</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Optimize your resume specifically for a job description with relevant keywords and skills.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                      <span>Job-specific keywords</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                      <span>Skill alignment</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                      <span>Experience highlighting</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                      <span>ATS optimization</span>
                    </div>
                  </div>
                </div>

                {/* Job Description Input */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="job-url">Job Posting URL (Optional)</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        id="job-url"
                        placeholder="https://linkedin.com/jobs/..."
                        value={jobDescriptionUrl}
                        onChange={(e) => setJobDescriptionUrl(e.target.value)}
                      />
                      <Button
                        variant="outline"
                        onClick={handleScrapeJobDescription}
                        disabled={isScrapingJob}
                        className="flex-shrink-0 bg-transparent"
                      >
                        {isScrapingJob ? <Loader2 className="h-4 w-4 animate-spin" /> : <Link className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="job-description">Job Description</Label>
                    <Textarea
                      id="job-description"
                      placeholder="Paste the job description here..."
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      rows={8}
                      className="mt-1"
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <Button onClick={handleEnhancement} disabled={isEnhancing || !parsedData} className="w-full" size="lg">
              {isEnhancing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Enhancing Resume...
                </>
              ) : (
                <>
                  <Brain className="h-4 w-4 mr-2" />
                  Enhance with AI
                </>
              )}
            </Button>

            <Button variant="outline" onClick={handleSkipEnhancement} className="w-full bg-transparent">
              Skip Enhancement
            </Button>
          </CardContent>
        </Card>

        {/* Enhancement Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-green-500" />
              {enhancedData ? "Enhanced Resume" : "Enhancement Preview"}
            </CardTitle>
            <CardDescription>
              {enhancedData ? "Your AI-enhanced resume data" : "Enhanced content will appear here"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {enhancedData ? (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Name</Label>
                  <p className="text-lg font-semibold">{enhancedData['Personal Information']?.name}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Email</Label>
                    <p>{enhancedData['Personal Information']?.email}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Phone</Label>
                    <p>{enhancedData['Personal Information']?.phone}</p>
                  </div>
                </div>

                {enhancedData['Personal Information']?.summary && (
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Enhanced Summary</Label>
                    <p className="text-sm leading-relaxed bg-green-50 dark:bg-green-950/20 p-3 rounded-lg border border-green-200 dark:border-green-800">
                      {enhancedData['Personal Information'].summary}
                    </p>
                  </div>
                )}

                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Enhanced Technical Skills</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {enhancedData.Skills?.['Technical Skills']?.map((skill: string, index: number) => (
                      <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Enhanced Soft Skills</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {enhancedData.Skills?.['Soft Skills']?.map((skill: string, index: number) => (
                      <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Enhanced Experience</Label>
                  <div className="space-y-3">
                    {enhancedData['Work Experience']?.map((exp: any, index: number) => (
                      <div key={index} className="bg-green-50 dark:bg-green-950/20 p-3 rounded-lg border border-green-200 dark:border-green-800">
                        <p className="font-medium">{exp.position} at {exp.company}</p>
                        <p className="text-sm text-muted-foreground">{exp.dates}</p>
                        <p className="text-sm mt-1">{exp.responsibilities}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Enhanced Education</Label>
                  <div className="space-y-3">
                    {enhancedData.Education?.map((edu: any, index: number) => (
                      <div key={index} className="bg-green-50 dark:bg-green-950/20 p-3 rounded-lg border border-green-200 dark:border-green-800">
                        <p className="font-medium">{edu.degree}</p>
                        <p className="text-sm">{edu.institution}</p>
                        <p className="text-sm text-muted-foreground">{edu.dates}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Brain className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground">
                  {isEnhancing ? "AI is enhancing your resume..." : "Click 'Enhance with AI' to see improvements"}
                </p>
                {isEnhancing && (
                  <div className="mt-4">
                    <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto" />
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onPrevious}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        <Button onClick={onNext} disabled={!enhancedData}>
          Next: Choose Template
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </motion.div>
  )
}
