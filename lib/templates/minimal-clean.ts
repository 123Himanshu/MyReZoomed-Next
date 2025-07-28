import type { TemplateConfig, ResumeData } from "./types"

export const minimalCleanTemplate: TemplateConfig = {
  id: "minimal-clean",
  name: "Minimal Clean",
  description: "Ultra-clean, minimalist design focusing on content",
  category: "minimal",
  preview: "/templates/minimal-clean-preview.png",
  colors: {
    primary: "#000000",
    secondary: "#666666",
    accent: "#333333",
    text: "#000000",
    background: "#ffffff",
  },
  fonts: {
    heading: "Helvetica",
    body: "Helvetica",
  },
  layout: "single-column",
  generateHTML: (data: ResumeData) => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${data.personalInfo.fullName} - Resume</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; 
          line-height: 1.6; 
          color: #000000;
          background: #ffffff;
          font-weight: 300;
        }
        .container { 
          max-width: 8.5in; 
          margin: 0 auto; 
          background: white;
          padding: 3rem 2rem;
          min-height: 11in;
        }
        .header { 
          margin-bottom: 3rem; 
          border-bottom: 1px solid #000000;
          padding-bottom: 2rem;
        }
        .name { 
          font-size: 2.5rem; 
          font-weight: 300; 
          color: #000000; 
          margin-bottom: 0.5rem; 
          letter-spacing: -1px;
        }
        .contact-info { 
          font-size: 0.9rem; 
          color: #666666; 
          display: flex;
          gap: 2rem;
          flex-wrap: wrap;
        }
        .section { 
          margin-bottom: 3rem; 
        }
        .section-title { 
          font-size: 1rem; 
          font-weight: 400; 
          color: #000000; 
          margin-bottom: 1.5rem; 
          text-transform: uppercase; 
          letter-spacing: 2px;
        }
        .experience-item, .education-item, .project-item { 
          margin-bottom: 2rem; 
          padding-bottom: 1.5rem;
          border-bottom: 1px solid #f0f0f0;
        }
        .experience-item:last-child, .education-item:last-child, .project-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }
        .item-header { 
          display: flex; 
          justify-content: space-between; 
          align-items: baseline; 
          margin-bottom: 0.5rem; 
        }
        .item-title { 
          font-weight: 400; 
          color: #000000; 
          font-size: 1rem;
        }
        .item-company { 
          color: #666666; 
          font-weight: 300; 
          font-size: 0.9rem;
          margin-top: 0.2rem;
        }
        .item-date { 
          color: #666666; 
          font-size: 0.85rem; 
          font-weight: 300;
          white-space: nowrap;
        }
        .item-description { 
          color: #333333; 
          margin-top: 0.8rem; 
          font-weight: 300;
        }
        .item-description ul { 
          list-style: none;
          padding-left: 0; 
        }
        .item-description li { 
          margin-bottom: 0.4rem; 
          position: relative;
          padding-left: 1rem;
        }
        .item-description li::before {
          content: '—';
          position: absolute;
          left: 0;
          color: #666666;
        }
        .skills-container { 
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
        }
        .skill-category {
          margin-bottom: 1rem;
        }
        .skill-category-title {
          font-weight: 400;
          color: #000000;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .skill-items {
          color: #666666;
          font-weight: 300;
          line-height: 1.8;
        }
        .summary { 
          color: #333333; 
          font-size: 1rem; 
          line-height: 1.8; 
          font-weight: 300;
        }
        .two-column {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
        }
        .technologies { 
          margin-top: 0.8rem; 
          color: #666666;
          font-size: 0.85rem;
          font-weight: 300;
        }
        .technologies::before {
          content: 'Technologies: ';
          color: #000000;
          font-weight: 400;
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
            ${data.personalInfo.website ? `<span>${data.personalInfo.website}</span>` : ""}
          </div>
        </div>

        ${
          data.summary
            ? `
          <div class="section">
            <div class="summary">${data.summary}</div>
          </div>
        `
            : ""
        }

        ${
          data.experience.length > 0
            ? `
          <div class="section">
            <h2 class="section-title">Experience</h2>
            ${data.experience
              .map(
                (exp) => `
              <div class="experience-item">
                <div class="item-header">
                  <div>
                    <div class="item-title">${exp.position}</div>
                    <div class="item-company">${exp.company}</div>
                  </div>
                  <div class="item-date">${exp.startDate} — ${exp.current ? "Present" : exp.endDate}</div>
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
                  <div class="item-date">${project.startDate}${project.endDate ? ` — ${project.endDate}` : ""}</div>
                </div>
                <div class="item-description">${project.description}</div>
                <div class="technologies">${project.technologies.join(", ")}</div>
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
                  <div class="item-date">${edu.startDate} — ${edu.endDate}</div>
                  ${edu.gpa ? `<div style="color: #666666; font-size: 0.85rem; margin-top: 0.3rem;">GPA: ${edu.gpa}</div>` : ""}
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
              <h2 class="section-title">Skills</h2>
              <div class="skills-container">
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
                      <div class="skill-items">${skills.join(", ")}</div>
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
    </body>
    </html>
  `,
}
