export interface PersonalInfo {
  fullName: string
  email: string
  phone: string
  location: string
  linkedin?: string
  website?: string
  github?: string
}

export interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  current: boolean
  description: string[]
  location?: string
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  startDate: string
  endDate: string
  gpa?: string
  honors?: string[]
}

export interface Skill {
  id: string
  name: string
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert"
  category: string
}

export interface Project {
  id: string
  name: string
  description: string
  technologies: string[]
  url?: string
  github?: string
  startDate: string
  endDate?: string
}

export interface Certification {
  id: string
  name: string
  issuer: string
  date: string
  expiryDate?: string
  credentialId?: string
  url?: string
}

export interface ResumeData {
  personalInfo: PersonalInfo
  summary: string
  experience: Experience[]
  education: Education[]
  skills: Skill[]
  projects: Project[]
  certifications: Certification[]
  languages?: { name: string; proficiency: string }[]
  awards?: { name: string; date: string; description: string }[]
}

export interface TemplateConfig {
  id: string
  name: string
  description: string
  category: "professional" | "creative" | "technical" | "executive" | "minimal"
  preview: string
  colors: {
    primary: string
    secondary: string
    accent: string
    text: string
    background: string
  }
  fonts: {
    heading: string
    body: string
  }
  layout: "single-column" | "two-column" | "sidebar"
  generateHTML: (data: ResumeData) => string
}
