export interface ResumeData {
  id: string
  fileName: string
  fileSize: number
  fileType: string
  extractedText?: string
  sections?: ResumeSections
  uploadedAt: Date
}

export interface ResumeSections {
  contact?: ContactInfo
  summary?: string
  experience?: WorkExperience[]
  education?: Education[]
  skills?: string[]
  certifications?: string[]
}

export interface ContactInfo {
  name?: string
  email?: string
  phone?: string
  location?: string
  linkedin?: string
  website?: string
}

export interface WorkExperience {
  title: string
  company: string
  location?: string
  startDate: string
  endDate?: string
  description: string[]
}

export interface Education {
  degree: string
  institution: string
  location?: string
  graduationDate?: string
  gpa?: string
}

export interface ATSScore {
  overallScore: number
  keywordMatch: number
  formatScore: number
  skillsMatch: number
  experienceMatch: number
  suggestions: string[]
  matchedKeywords: string[]
  missingKeywords: string[]
}

export interface JobDescription {
  title: string
  company: string
  description: string
  requirements: string[]
  preferredSkills: string[]
  keywords: string[]
}

export interface EnhancementResult {
  originalText: string
  enhancedText: string
  improvements: string[]
  downloadUrl: string
}

export interface APIResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  url?: string
  uploadedAt: Date
}
