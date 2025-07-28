import type { TemplateConfig, ResumeData, Skill } from "./types"

export const modernProfessionalTemplate: TemplateConfig = {
  id: "modern-professional",
  name: "Modern Professional",
  description: "Clean, modern design perfect for corporate roles",
  category: "professional" as const,
  preview: "/templates/modern-professional-preview.png",
  colors: {
    primary: "#2563eb",
    secondary: "#64748b",
    accent: "#0ea5e9",
    text: "#1e293b",
    background: "#ffffff",
  },
  fonts: {
    heading: "Inter",
    body: "Inter",
  },
  layout: "two-column",
  generateHTML: (data: ResumeData) => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${data.personalInfo.fullName} - Resume</title>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        @media print {
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .container {
            inline-size: 8.5in;
            block-size: 11in;
            margin: 0;
            padding: 0;
          }
        }
        body { 
          font-family: 'Inter', sans-serif; 
          line-height: 1.6; 
          color: #1e293b;
          background: #ffffff;
        }
        .container { 
          max-inline-size: 8.5in; 
          margin: 0 auto; 
          background: white;
          display: grid;
          grid-template-columns: 1fr 2fr;
          min-block-size: 11in;
        }
        .sidebar { 
          background: #f8fafc; 
          padding: 2rem 1.5rem;
          border-inline-end: 3px solid #2563eb;
        }
        .main-content { 
          padding: 2rem 1.5rem; 
        }
        .header { 
          text-align: center; 
          margin-block-end: 2rem; 
        }
        .name { 
          font-size: 2rem; 
          font-weight: 700; 
          color: #2563eb; 
          margin-block-end: 0.5rem; 
        }
        .contact-info { 
          font-size: 0.9rem; 
          color: #64748b; 
          line-height: 1.4;
        }
        .section { 
          margin-block-end: 2rem; 
        }
        .section-title { 
          font-size: 1.1rem; 
          font-weight: 600; 
          color: #2563eb; 
          margin-block-end: 1rem; 
          text-transform: uppercase; 
          letter-spacing: 0.5px;
          border-block-end: 2px solid #e2e8f0;
          padding-block-end: 0.5rem;
        }
        .experience-item, .education-item, .project-item { 
          margin-block-end: 1.5rem; 
        }
        .item-header { 
          display: flex; 
          justify-content: space-between; 
          align-items: flex-start; 
          margin-block-end: 0.5rem; 
        }
        .item-title { 
          font-weight: 600; 
          color: #1e293b; 
        }
        .item-company { 
          color: #2563eb; 
          font-weight: 500; 
        }
        .item-date { 
          color: #64748b; 
          font-size: 0.9rem; 
          font-weight: 500;
        }
        .item-description { 
          color: #475569; 
          margin-block-start: 0.5rem; 
        }
        .item-description ul { 
          padding-inline-start: 1.2rem; 
        }
        .item-description li { 
          margin-block-end: 0.3rem; 
        }
        .skills-grid { 
          display: grid; 
          gap: 1.5rem; 
        }
        .skill-category {
          margin-block-end: 1rem;
        }
        .skill-category-title {
          font-size: 0.9rem;
          font-weight: 600;
          color: #2563eb;
          margin-block-end: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .skill-items {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .skill-item { 
          background: #e2e8f0; 
          padding: 0.4rem 0.8rem; 
          border-radius: 0.5rem; 
          font-size: 0.9rem; 
          color: #475569;
          text-align: center;
          transition: background-color 0.2s;
        }
        .skill-item:hover {
          background: #dbeafe;
        }
        .summary { 
          color: #475569; 
          font-size: 0.95rem; 
          line-height: 1.7; 
        }
        .contact-item { 
          margin-block-end: 0.8rem; 
          display: flex; 
          align-items: center; 
          gap: 0.5rem;
        }
        .contact-label { 
          font-weight: 500; 
          color: #2563eb; 
          min-inline-size: 60px;
        }
        .technologies { 
          display: flex; 
          flex-wrap: wrap; 
          gap: 0.3rem; 
          margin-block-start: 0.5rem; 
        }
        .tech-tag { 
          background: #dbeafe; 
          color: #1d4ed8; 
          padding: 0.2rem 0.5rem; 
          border-radius: 0.3rem; 
          font-size: 0.8rem; 
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="sidebar">
          <div class="header">
            <h1 class="name">${data.personalInfo.fullName}</h1>
            <div class="contact-info">
              <div class="contact-item">
                <span class="contact-label">Email:</span>
                <span>${data.personalInfo.email}</span>
              </div>
              <div class="contact-item">
                <span class="contact-label">Phone:</span>
                <span>${data.personalInfo.phone}</span>
              </div>
              <div class="contact-item">
                <span class="contact-label">Location:</span>
                <span>${data.personalInfo.location}</span>
              </div>
              ${
                data.personalInfo.linkedin
                  ? `
                <div class="contact-item">
                  <span class="contact-label">LinkedIn:</span>
                  <span>${data.personalInfo.linkedin}</span>
                </div>
              `
                  : ""
              }
              ${
                data.personalInfo.github
                  ? `
                <div class="contact-item">
                  <span class="contact-label">GitHub:</span>
                  <span>${data.personalInfo.github}</span>
                </div>
              `
                  : ""
              }
            </div>
          </div>

          ${
            data.skills.length > 0
              ? `
            <div class="section">
              <h2 class="section-title">Skills</h2>
              <div class="skills-grid">
                ${Object.entries(
                  data.skills.reduce((acc, skill) => {
                    if (!acc[skill.category]) {
                      acc[skill.category] = [];
                    }
                    acc[skill.category].push(skill);
                    return acc;
                  }, {} as { [key: string]: Skill[] })
                )
                  .map(
                    ([category, skills]) => `
                  <div class="skill-category">
                    <h3 class="skill-category-title">${category}</h3>
                    <div class="skill-items">
                      ${skills
                        .map(
                          (skill) => `
                        <div class="skill-item" title="${skill.level}">${skill.name}</div>
                      `
                        )
                        .join("")}
                    </div>
                  </div>
                `
                  )
                  .join("")}
              </div>
            </div>
          `
              : ""
          }

          ${
            data.education.length > 0
              ? `
            <div class="section">
              <h2 class="section-title">Education</h2>
              ${data.education
                .map(
                  (edu) => `
                <div class="education-item">
                  <div class="item-title">${edu.degree} in ${edu.field}</div>
                  <div class="item-company">${edu.institution}</div>
                  <div class="item-date">${edu.startDate} - ${edu.endDate}</div>
                  ${edu.gpa ? `<div style="color: #64748b; font-size: 0.9rem;">GPA: ${edu.gpa}</div>` : ""}
                </div>
              `,
                )
                .join("")}
            </div>
          `
              : ""
          }

          ${
            data.certifications.length > 0
              ? `
            <div class="section">
              <h2 class="section-title">Certifications</h2>
              ${data.certifications
                .map(
                  (cert) => `
                <div class="education-item">
                  <div class="item-title">${cert.name}</div>
                  <div class="item-company">${cert.issuer}</div>
                  <div class="item-date">${cert.date}</div>
                </div>
              `,
                )
                .join("")}
            </div>
          `
              : ""
          }
        </div>

        <div class="main-content">
          ${
            data.summary
              ? `
            <div class="section">
              <h2 class="section-title">Professional Summary</h2>
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
                    <div>
                      <div class="item-title">${exp.position}</div>
                      <div class="item-company">${exp.company}</div>
                    </div>
                    <div class="item-date">${exp.startDate} - ${exp.current ? "Present" : exp.endDate}</div>
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

          ${
            data.projects.length > 0
              ? `
            <div class="section">
              <h2 class="section-title">Projects</h2>
              ${data.projects
                .map(
                  (project) => `
                <div class="project-item">
                  <div class="item-header">
                    <div class="item-title">${project.name}</div>
                    <div class="item-date">${project.startDate}${project.endDate ? ` - ${project.endDate}` : ""}</div>
                  </div>
                  <div class="item-description">${project.description}</div>
                  <div class="technologies">
                    ${project.technologies.map((tech) => `<span class="tech-tag">${tech}</span>`).join("")}
                  </div>
                </div>
              `,
                )
                .join("")}
            </div>
          `
              : ""
          }
        </div>
      </div>
    </body>
    </html>
  `,
}
