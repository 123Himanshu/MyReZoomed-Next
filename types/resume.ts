export interface APIResponse {
  status: string;
  filename: string;
  originalText: string;
  enhancedData: ResumeData;
}

export interface ResumeData {
  "Personal Information": {
    name: string;
    address: string;
    phone: string;
    email: string;
  };
  Education: Array<{
    institution: string;
    degree: string;
    dates: string;
  }>;
  "Work Experience": Array<{
    company: string;
    position: string;
    dates: string;
    responsibilities: string;
  }>;
  Projects: Array<{
    title: string;
    description: string;
  }>;
  Certifications: Array<{
    name: string;
    issuer: string;
    details: string;
  }>;
  Skills: {
    "Technical Skills": string[];
    "Soft Skills": string[];
  };
}

export interface ParsedResume {
  id: string;
  originalFileName: string;
  extractedText: string;
  enhancedResume: ResumeData;
  metadata: {
    fileSize: number;
    fileType: string;
    pageCount: number;
    parsedAt: Date;
  };
}

export interface ExperienceSection {
  jobTitle: string
  company: string
  location?: string
  startDate: string
  endDate?: string
  current: boolean
  responsibilities: string[]
  achievements: string[]
}

export interface EducationSection {
  degree: string
  institution: string
  location?: string
  graduationYear?: string
  gpa?: string
  honors?: string[]
}

export interface SkillsSection {
  technical: string[]
  soft: string[]
  languages?: string[]
  frameworks?: string[]
  tools?: string[]
}

export interface CertificationSection {
  name: string
  issuer: string
  issueDate?: string
  expiryDate?: string
  credentialId?: string
}
