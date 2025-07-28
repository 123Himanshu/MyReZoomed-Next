export const SUPPORTED_FILE_TYPES = {
  "application/pdf": [".pdf"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
  "application/msword": [".doc"],
} as const

export const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

export const FEATURES = [
  {
    title: "Instant ATS Score",
    description: "Get immediate feedback on how well your resume matches job requirements",
    icon: "target",
  },
  {
    title: "Gemini AI Suggestions",
    description: "Receive intelligent recommendations to improve your resume content",
    icon: "brain",
  },
  {
    title: "PDF Download",
    description: "Download your enhanced resume in professional PDF format",
    icon: "download",
  },
  {
    title: "Keyword Matching",
    description: "Identify missing keywords and optimize for applicant tracking systems",
    icon: "search",
  },
] as const

export const ATS_SCORE_RANGES = {
  EXCELLENT: { min: 80, max: 100, color: "text-green-600", label: "Excellent" },
  GOOD: { min: 60, max: 79, color: "text-blue-600", label: "Good" },
  FAIR: { min: 40, max: 59, color: "text-yellow-600", label: "Fair" },
  POOR: { min: 0, max: 39, color: "text-red-600", label: "Needs Improvement" },
} as const
