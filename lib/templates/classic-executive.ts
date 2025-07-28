import type { TemplateConfig, ResumeData } from "./types"

export const classicExecutiveTemplate: TemplateConfig = {
  id: "classic-executive",
  name: "Classic Executive",
  description: "Traditional, elegant design for senior-level positions",
  category: "executive",
  preview: "/templates/classic-executive-preview.png",
  colors: {
    primary: "#1f2937",
    secondary: "#6b7280",
    accent: "#374151",
    text: "#111827",
    background: "#ffffff",
  },
  fonts: {
    heading: "Georgia",
    body: "Georgia",
  },
  layout: "single-column",
  generateHTML: (data: ResumeData) => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${data.personalInfo.fullName} - Resume</title>
      <link href="https://fonts.googleapis.com/css2?family=Georgia:wght@400;700&display=swap" rel="stylesheet">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
          font-family: Georgia, serif; 
          line-height: 1.6; 
          color: #111827;
          background: #ffffff;
        }
        .container { 
          max-width: 8.5in; 
          margin: 0 auto; 
          background: white;
          padding: 2rem;
          min-height: 11in;
        }
        .header { 
          text-align: center; 
          margin-bottom: 2.5rem; 
          border-bottom: 3px solid #1f2937;
          padding-bottom: 1.5rem;
        }
        .name { 
          font-size: 2.5rem; 
          font-weight: 700; 
          color: #1f2937; 
          margin-bottom: 0.5rem; 
          letter-spacing: 1px;
        }
        .contact-info { 
          font-size: 1rem; 
          color: #6b7280; 
          display: flex;
          justify-content: center;
          gap: 2rem;
          flex-wrap: wrap;
        }
        .section { 
          margin-bottom: 2.5rem; 
        }
        .section-title { 
          font-size: 1.3rem; 
          font-weight: 700; 
          color: #1f2937; 
          margin-bottom: 1.5rem; 
          text-transform: uppercase; 
          letter-spacing: 1px;
          border-bottom: 2px solid #e5e7eb;
          padding-bottom: 0.5rem;
        }
        .experience-item, .education-item, .project-item { 
          margin-bottom: 2rem; 
        }
        .item-header { 
          margin-bottom: 0.8rem; 
        }
        .item-title { 
          font-weight: 700; 
          color: #1f2937; 
          font-size: 1.1rem;
          margin-bottom: 0.3rem;
        }
        .item-company { 
          color: #374151; 
          font-weight: 400; 
          font-style: italic;
          margin-bottom: 0.3rem;
        }
        .item-date { 
          color: #6b7280; 
          font-size: 0.95rem; 
        }
        .item-description { 
          color: #374151; 
          margin-top: 0.8rem; 
          text-align: justify;
        }
        .item-description ul { 
          padding-left: 1.5rem; 
        }
        .item-description li { 
          margin-bottom: 0.5rem; 
        }
        .skills-list { 
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .skill-category {
          flex: 1;
          min-width: 200px;
        }
        .skill-category-title {
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 0.5rem;
          font-size: 1rem;
        }
        .skill-items {
          color: #374151;
          line-height: 1.8;
        }
        .summary { 
          color: #374151; 
          font-size: 1rem; 
          line-height: 1.8; 
          text-align: justify;
          font-style: italic;
        }
        .two-column {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 class="name">${data.personalInfo.fullName}</h1>
          <div class="contact-info">
            <span>${data.personalInfo.email}</span>
            <span>${data.personalInfo.phone}</span>
            <span>${data.personalInfo.location}</span>
            ${data.personalInfo.linkedin ? `<span>${data.personalInfo.linkedin}</span>` : ""}
          </div>
        </div>

        ${
          data.summary
            ? `
          <div class="section">
            <h2 class="section-title">Executive Summary</h2>
            <div class="summary">${data.summary}</div>
          </div>
        `
            : ""
        }

        ${
          data.experience.length > 0
            ? `
          <div class="section">
            <h2 class="section-title">Professional Experience</h2>
            ${data.experience
              .map(
                (exp) => `
              <div class="experience-item">
                <div class="item-header">
                  <div class="item-title">${exp.position}</div>
                  <div class="item-company">${exp.company} • ${exp.startDate} - ${exp.current ? "Present" : exp.endDate}</div>
                </div>
                <div class="item-description">
                  <ul>
                    ${exp.description.map((desc) => `<li>${desc}</li>`).join("")}
                  </ul>
                </div>
              </div>
            `,
              )
              .join("")}
          </div>
        `
            : ""
        }

        <div class="two-column">
          ${
            data.education.length > 0
              ? `
            <div class="section">
              <h2 class="section-title">Education</h2>
              ${data.education
                .map(
                  (edu) => `
                <div class="education-item">
                  <div class="item-title">${edu.degree}</div>
                  <div class="item-company">${edu.field}</div>
                  <div class="item-company">${edu.institution}</div>
                  <div class="item-date">${edu.startDate} - ${edu.endDate}</div>
                  ${edu.gpa ? `<div style="color: #6b7280; font-size: 0.9rem; margin-top: 0.3rem;">GPA: ${edu.gpa}</div>` : ""}
                </div>
              `,
                )
                .join("")}
            </div>
          `
              : ""
          }

          ${
            data.skills.length > 0
              ? `
            <div class="section">
              <h2 class="section-title">Core Competencies</h2>
              <div class="skills-list">
                ${(() => {
                  const skillsByCategory = data.skills.reduce(
                    (acc, skill) => {
                      if (!acc[skill.category]) acc[skill.category] = []
                      acc[skill.category].push(skill.name)
                      return acc
                    },
                    {} as Record<string, string[]>,
                  )

                  return Object.entries(skillsByCategory)
                    .map(
                      ([category, skills]) => `
                    <div class="skill-category">
                      <div class="skill-category-title">${category}</div>
                      <div class="skill-items">${skills.join(" • ")}</div>
                    </div>
                  `,
                    )
                    .join("")
                })()}
              </div>
            </div>
          `
              : ""
          }
        </div>

        ${
          data.certifications.length > 0
            ? `
          <div class="section">
            <h2 class="section-title">Professional Certifications</h2>
            ${data.certifications
              .map(
                (cert) => `
              <div class="education-item">
                <div class="item-title">${cert.name}</div>
                <div class="item-company">${cert.issuer} • ${cert.date}</div>
              </div>
            `,
              )
              .join("")}
          </div>
        `
            : ""
        }
      </div>
    </body>
    </html>
  `,
}
