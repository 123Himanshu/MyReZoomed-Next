"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, Edit, Eye, Save } from "lucide-react"
import { useResumeStore } from "@/lib/store/useResumeStore"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { ResumeData } from "@/types/resume"
import { toast } from "sonner"

interface FormValues {
  name: string;
  email: string;
  phone: string;
  summary?: string;
  skills: string;
  experience: string;
  education: string;
}

const resumeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone is required"),
  summary: z.string().optional(),
  skills: z.string().min(1, "Skills are required"),
  experience: z.string().min(1, "Experience is required"),
  education: z.string().min(1, "Education is required"),
})

interface ResumePreviewStepProps {
  onNext: () => void
  onPrevious: () => void
}

export function ResumePreviewStep({ onNext, onPrevious }: ResumePreviewStepProps) {
  const { parsedData, setParsedData, originalText } = useResumeStore()
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getFormDefaultValues = (data: ResumeData | null): FormValues => ({
    name: data?.["Personal Information"]?.name || "",
    email: data?.["Personal Information"]?.email || "",
    phone: data?.["Personal Information"]?.phone || "",
    summary: data?.["Personal Information"]?.summary || "",
    skills: data?.Skills?.["Technical Skills"]?.join(", ") || "",
    experience: data?.["Work Experience"]?.map(exp => 
      `${exp.position} at ${exp.company}\n${exp.dates}\n${exp.responsibilities}`
    ).join("\n\n") || "",
    education: data?.Education?.map(edu => 
      `${edu.degree || ""}\n${edu.institution || ""}\n${edu.dates || ""}`
    ).join("\n\n") || "",
  })

  const form = useForm<FormValues>({
    resolver: zodResolver(resumeSchema),
    defaultValues: getFormDefaultValues(parsedData),
  })

  useEffect(() => {
    if (parsedData) {
      form.reset(getFormDefaultValues(parsedData))
    }
  }, [parsedData, form])

  const validateExperience = (exp: string) => {
    const parts = exp.split("\n");
    if (parts.length < 3) {
      throw new Error("Experience entries must have position, dates, and responsibilities");
    }
    const [title] = parts;
    if (!title.includes(" at ")) {
      throw new Error("Experience must be in format 'Position at Company'");
    }
  };

  const validateEducation = (edu: string) => {
    const parts = edu.split("\n");
    if (parts.length < 3) {
      throw new Error("Education entries must have degree, institution, and dates");
    }
  };

  const onSubmit = async (data: FormValues) => {
    setError(null);
    setIsSubmitting(true);
    try {
      // Validate experience format
      data.experience.split("\n\n")
        .filter(Boolean)
        .forEach(validateExperience);

      // Validate education format
      data.education.split("\n\n")
        .filter(Boolean)
        .forEach(validateEducation);

      const updatedData: ResumeData = {
        "Personal Information": {
          name: data.name,
          email: data.email,
          phone: data.phone,
          address: parsedData?.["Personal Information"]?.address || "",
          summary: data.summary,
        },
        Skills: {
          "Technical Skills": data.skills
            .split(",")
            .map((skill: string) => skill.trim())
            .filter(Boolean),
          "Soft Skills": parsedData?.Skills?.["Soft Skills"] || []
        },
        "Work Experience": data.experience.split("\n\n")
          .filter(Boolean)
          .map((exp: string) => {
            const [title, dates, responsibilities] = exp.split("\n");
            const [position, company] = title.split(" at ");
            return {
              position: position || "",
              company: company || "",
              dates: dates || "",
              responsibilities: responsibilities || ""
            };
          }),
        Education: data.education.split("\n\n")
          .filter(Boolean)
          .map((edu: string) => {
            const [degree, institution, dates] = edu.split("\n");
            return {
              degree: degree || "",
              institution: institution || "",
              dates: dates || ""
            };
          }),
        Certifications: parsedData?.Certifications || [],
        Projects: parsedData?.Projects || []
      }
      setParsedData(updatedData)
      setIsEditing(false)
      toast.success("Resume data updated successfully")
    } catch (error) {
      console.error('Error updating resume data:', error);
      setError(error instanceof Error ? error.message : 'Failed to update resume data');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!parsedData) {
    return (
      <div className="text-center">
        <p className="text-muted-foreground">No resume data available. Please upload a resume first.</p>
        <Button onClick={onPrevious} className="mt-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Go Back
        </Button>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-6xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Original Resume Text */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Original Resume
            </CardTitle>
            <CardDescription>Your uploaded resume content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="max-h-96 overflow-y-auto p-4 bg-muted/30 rounded-lg text-sm">
              <pre className="whitespace-pre-wrap font-mono">{originalText}</pre>
            </div>
          </CardContent>
        </Card>

        {/* Parsed/Editable Data */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Edit className="h-5 w-5" />
                Parsed Resume Data
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  if (!isEditing) {
                    setIsEditing(true);
                  } else {
                    form.reset(getFormDefaultValues(parsedData));
                    setIsEditing(false);
                  }
                }}
              >
                {isEditing ? <Edit className="h-4 w-4 mr-2" /> : <Edit className="h-4 w-4 mr-2" />}
                {isEditing ? "Cancel" : "Edit"}
              </Button>
            </CardTitle>
            <CardDescription>Review and edit the extracted information</CardDescription>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input {...form.register("name")} />
                    {form.formState.errors.name && (
                      <p className="text-sm text-destructive mt-1">{form.formState.errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input {...form.register("email")} type="email" />
                    {form.formState.errors.email && (
                      <p className="text-sm text-destructive mt-1">{form.formState.errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input {...form.register("phone")} />
                  {form.formState.errors.phone && (
                    <p className="text-sm text-destructive mt-1">{form.formState.errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="summary">Professional Summary</Label>
                  <Textarea {...form.register("summary")} rows={3} />
                </div>

                <div>
                  <Label htmlFor="skills">Skills (comma-separated)</Label>
                  <Textarea {...form.register("skills")} rows={2} />
                  {form.formState.errors.skills && (
                    <p className="text-sm text-destructive mt-1">{form.formState.errors.skills.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="experience">Experience</Label>
                  <Textarea 
                    {...form.register("experience")} 
                    rows={4}
                    placeholder="Position at Company&#10;Date Range&#10;Responsibilities&#10;&#10;Next Position at Company&#10;Date Range&#10;Responsibilities"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Format: Position at Company, followed by dates and responsibilities. Separate entries with blank lines.</p>
                  {form.formState.errors.experience && (
                    <p className="text-sm text-destructive mt-1">{form.formState.errors.experience.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="education">Education</Label>
                  <Textarea 
                    {...form.register("education")} 
                    rows={3}
                    placeholder="Degree&#10;Institution&#10;Date Range&#10;&#10;Next Degree&#10;Institution&#10;Date Range"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Format: Degree, followed by institution and dates. Separate entries with blank lines.</p>
                  {form.formState.errors.education && (
                    <p className="text-sm text-destructive mt-1">{form.formState.errors.education.message}</p>
                  )}
                </div>

                {error && (
                  <p className="text-sm text-destructive mb-2">{error}</p>
                )}
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </form>
            ) : (
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Name</Label>
                  <p className="text-lg font-semibold">{parsedData["Personal Information"].name}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Email</Label>
                    <p>{parsedData["Personal Information"].email}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Phone</Label>
                    <p>{parsedData["Personal Information"].phone}</p>
                  </div>
                </div>

                {parsedData["Personal Information"].summary && (
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Summary</Label>
                    <p className="text-sm leading-relaxed">{parsedData["Personal Information"].summary}</p>
                  </div>
                )}

                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Skills</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {parsedData.Skills["Technical Skills"]?.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Experience</Label>
                  <div className="space-y-2">
                    {parsedData["Work Experience"]?.map((exp, index) => (
                      <div key={index} className="text-sm leading-relaxed">
                        <p className="font-medium">{exp.position} at {exp.company}</p>
                        <p className="text-muted-foreground">{exp.dates}</p>
                        <p className="mt-1">{exp.responsibilities}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Education</Label>
                  <div className="space-y-2">
                    {parsedData.Education?.map((edu, index) => (
                      <div key={index} className="text-sm leading-relaxed">
                        <p className="font-medium">{edu.degree}</p>
                        <p>{edu.institution}</p>
                        <p className="text-muted-foreground">{edu.dates}</p>
                      </div>
                    ))}
                  </div>
                </div>
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
        <Button onClick={onNext} disabled={isEditing}>
          Next: AI Enhancement
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </motion.div>
  )
}
