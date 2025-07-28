import { modernProfessionalTemplate } from "./modern-professional"
import { classicExecutiveTemplate } from "./classic-executive"
import { creativeDesignerTemplate } from "./creative-designer"
import { minimalCleanTemplate } from "./minimal-clean"
import { techSpecialistTemplate } from "./tech-specialist"
import type { TemplateConfig, ResumeData } from "./types"

export const templates: TemplateConfig[] = [
  modernProfessionalTemplate,
  classicExecutiveTemplate,
  creativeDesignerTemplate,
  minimalCleanTemplate,
  techSpecialistTemplate,
]

export const getTemplateById = (id: string): TemplateConfig | undefined => {
  return templates.find((template) => template.id === id)
}

export const getTemplatesByCategory = (category: string): TemplateConfig[] => {
  return templates.filter((template) => template.category === category)
}

function parseExperience(experienceText: string) {
  // Simple parsing - in a real app, this would be more sophisticated
  const sections = experienceText.split("\n\n").filter(Boolean)
  return sections.map((section, index) => {
    const lines = section.split("\n").filter(Boolean)
    return {
      title: lines[0] || `Position ${index + 1}`,
      company: lines[1] || "Company",
      duration: lines[2] || "Duration",
      description: lines.slice(3).join("\n") || "Description",
    }
  })
}

function parseEducation(educationText: string) {
  const sections = educationText.split("\n\n").filter(Boolean)
  return sections.map((section, index) => {
    const lines = section.split("\n").filter(Boolean)
    return {
      degree: lines[0] || `Degree ${index + 1}`,
      institution: lines[1] || "Institution",
      year: lines[2] || "Year",
      details: lines.slice(3).join("\n"),
    }
  })
}

function parseProjects(projects: string[]) {
  return projects.map((project) => ({
    name: project.split(":")[0] || project,
    description: project.split(":")[1] || project,
    technologies: [],
  }))
}

export function renderTemplate(templateId: string, resumeData: ResumeData): string {
  const template = getTemplateById(templateId)
  if (!template) {
    throw new Error(`Template ${templateId} not found`)
  }

  return template.generateHTML(resumeData)
}

export {
  modernProfessionalTemplate,
  classicExecutiveTemplate,
  creativeDesignerTemplate,
  minimalCleanTemplate,
  techSpecialistTemplate,
}
export type { TemplateConfig, ResumeData } from "./types"
