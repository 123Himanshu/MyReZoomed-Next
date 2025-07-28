import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"

export interface ParsedResumeData {
  name?: string
  email?: string
  phone?: string
  skills: string[]
  experience: string
  education: string
  summary?: string
  [key: string]: any
}

export interface ResumeState {
  // Upload state
  uploadedFile: File | null
  originalText: string

  // Parsed data
  parsedData: ParsedResumeData | null
  enhancedData: ParsedResumeData | null

  // Job description
  jobDescription: string
  jobDescriptionUrl: string

  // Template
  selectedTemplateId: string | null

  // ATS Score
  atsScore: number | null
  atsAnalysis: {
    score: number
    suggestions: string[]
    matchedKeywords: string[]
    missingKeywords: string[]
  } | null

  // Loading states
  isUploading: boolean
  isParsing: boolean
  isEnhancing: boolean
  isGeneratingATS: boolean

  // Actions
  setUploadedFile: (file: File | null) => void
  setOriginalText: (text: string) => void
  setParsedData: (data: ParsedResumeData | null) => void
  setEnhancedData: (data: ParsedResumeData | null) => void
  setJobDescription: (jd: string) => void
  setJobDescriptionUrl: (url: string) => void
  setSelectedTemplateId: (id: string | null) => void
  setATSScore: (score: number | null) => void
  setATSAnalysis: (analysis: any) => void
  setIsUploading: (loading: boolean) => void
  setIsParsing: (loading: boolean) => void
  setIsEnhancing: (loading: boolean) => void
  setIsGeneratingATS: (loading: boolean) => void
  resetStore: () => void
}

const initialState = {
  uploadedFile: null,
  originalText: "",
  parsedData: null,
  enhancedData: null,
  jobDescription: "",
  jobDescriptionUrl: "",
  selectedTemplateId: null,
  atsScore: null,
  atsAnalysis: null,
  isUploading: false,
  isParsing: false,
  isEnhancing: false,
  isGeneratingATS: false,
}

export const useResumeStore = create<ResumeState>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        setUploadedFile: (file) => set({ uploadedFile: file }),
        setOriginalText: (text) => set({ originalText: text }),
        setParsedData: (data) => set({ parsedData: data }),
        setEnhancedData: (data) => set({ enhancedData: data }),
        setJobDescription: (jd) => set({ jobDescription: jd }),
        setJobDescriptionUrl: (url) => set({ jobDescriptionUrl: url }),
        setSelectedTemplateId: (id) => set({ selectedTemplateId: id }),
        setATSScore: (score) => set({ atsScore: score }),
        setATSAnalysis: (analysis) => set({ atsAnalysis: analysis }),
        setIsUploading: (loading) => set({ isUploading: loading }),
        setIsParsing: (loading) => set({ isParsing: loading }),
        setIsEnhancing: (loading) => set({ isEnhancing: loading }),
        setIsGeneratingATS: (loading) => set({ isGeneratingATS: loading }),
        resetStore: () => set(initialState),
      }),
      {
        name: "resume-store",
        partialize: (state) => ({
          parsedData: state.parsedData,
          enhancedData: state.enhancedData,
          selectedTemplateId: state.selectedTemplateId,
          jobDescription: state.jobDescription,
        }),
      },
    ),
  ),
)
