import type { ResumeData } from "../templates/types"
import { getTemplateById } from "../templates"

export interface PDFGenerationOptions {
  templateId: string
  data: ResumeData
  filename?: string
}

export function generateResumeHTML(templateId: string, data: ResumeData): string {
  const template = getTemplateById(templateId)
  if (!template) {
    throw new Error(`Template with id "${templateId}" not found`)
  }

  return template.generateHTML(data)
}

export function convertResumeDataToTemplate(resumeData: any): ResumeData {
  return {
    personalInfo: {
      fullName: resumeData['Personal Information']?.name || "",
      email: resumeData['Personal Information']?.email || "",
      phone: resumeData['Personal Information']?.phone || "",
      location: resumeData['Personal Information']?.address || "",
      linkedin: "",
      website: "",
      github: "",
    },
    summary: resumeData['Personal Information']?.summary || "",
    experience:
      resumeData['Work Experience']?.map((exp: any) => ({
        id: Math.random().toString(36).substr(2, 9),
        company: exp.company || "",
        position: exp.position || "",
        startDate: exp.dates?.split('–')?.[0]?.trim() || "",
        endDate: exp.dates?.split('–')?.[1]?.trim() || "Present",
        current: exp.dates?.includes('Present') || false,
        description: [exp.responsibilities || ""],
        location: "",
      })) || [],
    education:
      resumeData.Education?.map((edu: any) => ({
        id: Math.random().toString(36).substr(2, 9),
        institution: edu.institution || "",
        degree: edu.degree || "",
        field: "",
        startDate: edu.dates?.split('–')?.[0]?.trim() || "",
        endDate: edu.dates?.split('–')?.[1]?.trim() || "",
        gpa: "",
        honors: [],
      })) || [],
    skills: [
      ...(resumeData.Skills?.['Technical Skills']?.map((skill: string) => ({
        id: Math.random().toString(36).substr(2, 9),
        name: skill,
        level: "Intermediate",
        category: "Technical",
      })) || []),
      ...(resumeData.Skills?.['Soft Skills']?.map((skill: string) => ({
        id: Math.random().toString(36).substr(2, 9),
        name: skill,
        level: "Intermediate",
        category: "Soft",
      })) || []),
    ],
    projects:
      resumeData.Projects?.map((project: any) => ({
        id: Math.random().toString(36).substr(2, 9),
        name: project.name || "",
        description: project.description || "",
        technologies: project.technologies || [],
        url: project.url || "",
        github: "",
        startDate: "",
        endDate: "",
      })) || [],
    certifications:
      resumeData.Certifications?.map((cert: any) => ({
        id: Math.random().toString(36).substr(2, 9),
        name: cert.name || "",
        issuer: cert.issuer || "",
        date: cert.details || "",
        expiryDate: "",
        credentialId: "",
        url: "",
      })) || [],
    languages: resumeData.languages || [],
    awards: resumeData.awards || [],
  }
}

export async function generatePDF(html: string): Promise<Buffer> {
  // This would typically use a library like Puppeteer or Playwright
  // For now, we'll return a placeholder
  throw new Error("PDF generation not implemented - requires server-side rendering")
}

export function downloadPDF(pdfBuffer: Buffer, filename = "resume.pdf"): void {
  const blob = new Blob([pdfBuffer], { type: "application/pdf" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export function previewHTML(html: string): void {
  const newWindow = window.open("", "_blank")
  if (newWindow) {
    newWindow.document.write(html)
    newWindow.document.close()
  }
}

export function generateClientSidePDF(options: PDFGenerationOptions): void {
  try {
    const { templateId, data, filename = 'resume.pdf' } = options
    const html = generateResumeHTML(templateId, data)
    const newWindow = window.open("", "_blank")
    if (newWindow) {
      newWindow.document.write(html)
      newWindow.document.write(`
        <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
        <script>
          window.onload = function() {
            const element = document.body;
            const opt = {
              margin: 1,
              filename: '${filename}',
              image: { type: 'jpeg', quality: 0.98 },
              html2canvas: { scale: 2 },
              jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
            };
            html2pdf().set(opt).from(element).save();
          };
        </script>
      `)
      newWindow.document.close()
    }
  } catch (error) {
    console.error('Error generating PDF:', error)
    throw error
  }
}
