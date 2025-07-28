import type { TemplateConfig, ResumeData } from "./types"

export const techSpecialistTemplate: TemplateConfig = {
  id: "tech-specialist",
  name: "Tech Specialist",
  description: "Modern, technical design perfect for developers and engineers",
  category: "technical",
  preview: "/templates/tech-specialist-preview.png",
  colors: {
    primary: "#0f172a",
    secondary: "#334155",
    accent: "#06b6d4",
    text: "#1e293b",
    background: "#ffffff",
  },
  fonts: {
    heading: "JetBrains Mono",
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
      <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
          font-family: 'Inter', sans-serif; 
          line-height: 1.6; 
          color: #1e293b;
          background: #ffffff;
        }
        .container { 
          max-width: 8.5in; 
          margin: 0 auto; 
          background: white;
          display: grid;
          grid-template-columns: 1fr 2fr;
          min-height: 11in;
        }
        .sidebar { 
          background: #0f172a; 
          color: white;
          padding: 2rem 1.5rem;
          position: relative;
        }
        .sidebar::before {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 4px;
          height: 100%;
          background: linear-gradient(180deg, #06b6d4 0%, #0891b2 100%);
        }
        .main-content { 
          padding: 2rem 2rem; 
          background: #ffffff;
        }
        .header { 
          margin-bottom: 2rem; 
        }
        .name { 
          font-family: 'JetBrains Mono', monospace;
          font-size: 1.8rem; 
          font-weight: 700; 
          color: #06b6d4; 
          margin-bottom: 0.5rem; 
        }
        .title {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.9rem;
          font-weight: 400;
          color: #94a3b8;
          margin-bottom: 1.5rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .contact-info { 
          font-size: 0.85rem; 
          color: #cbd5e1; 
          line-height: 1.8;
        }
        .section { 
          margin-bottom: 2rem; 
        }
        .section-title { 
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.9rem; 
          font-weight: 600; 
          color: #06b6d4; 
          margin-bottom: 1rem; 
          text-transform: uppercase; 
          letter-spacing: 1px;
          position: relative;
          padding-bottom: 0.5rem;
        }
        .section-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 30px;
          height: 2px;
          background: #06b6d4;
        }
        .main-section-title {
          font-family: 'JetBrains Mono', monospace;
          font-size: 1rem; 
          font-weight: 600; 
          color: #0f172a; 
          margin-bottom: 1.5rem; 
          text-transform: uppercase; 
          letter-spacing: 1px;
          position: relative;
          padding-left: 1rem;
        }
        .main-section-title::before {
          content: '>';
          position: absolute;
          left: 0;
          color: #06b6d4;
          font-weight: 700;
        }
        .experience-item, .education-item, .project-item { 
          margin-bottom: 1.5rem; 
          padding: 1rem;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          background: #f8fafc;
        }
        .item-header { 
          display: flex; 
          justify-content: space-between; 
          align-items: flex-start; 
          margin-bottom: 0.5rem; 
        }
        .item-title { 
          font-family: 'JetBrains Mono', monospace;
          font-weight: 600; 
          color: #0f172a; 
          font-size: 0.95rem;
        }
        .item-company { 
          color: #06b6d4; 
          font-weight: 500; 
          font-size: 0.9rem;
        }
        .item-date { 
          font-family: 'JetBrains Mono', monospace;
          color: #64748b; 
          font-size: 0.8rem; 
          font-weight: 400;
          background: #e2e8f0;
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
        }
        .item-description { 
          color: #475569; 
          margin-top: 0.5rem; 
          font-size: 0.9rem;
        }
        .item-description ul { 
          padding-left: 1.2rem; 
        }
        .item-description li { 
          margin-bottom: 0.3rem; 
        }
        .skills-grid { 
          display: grid; 
          gap: 0.5rem; 
        }
        .skill-item { 
          background: #1e293b; 
          color: #06b6d4;
          padding: 0.4rem 0.8rem; 
          border-radius: 4px; 
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8rem; 
          text-align: center;
          border: 1px solid #334155;
        }
        .summary { 
          color: #475569; 
          font-size: 0.95rem; 
          line-height: 1.7; 
          background: #f1f5f9;
          padding: 1.5rem;
          border-radius: 8px;
          border-left: 4px solid #06b6d4;
        }
        .contact-item { 
          margin-bottom: 1rem; 
          display: flex; 
          align-items: center; 
          gap: 0.5rem;
        }
        .contact-label { 
          font-family: 'JetBrains Mono', monospace;
          font-weight: 500; 
          color: #06b6d4; 
          min-width: 60px;
          font-size: 0.8rem;
        }
        .contact-value {
          color: #cbd5e1;
          font-size: 0.85rem;
        }
        .technologies { 
          display: flex; 
          flex-wrap: wrap; 
          gap: 0.3rem; 
          margin-top: 0.5rem; 
        }
        .tech-tag { 
          background: #0f172a; 
          color: #06b6d4; 
          padding: 0.2rem 0.5rem; 
          border-radius: 4px; 
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem; 
          border: 1px solid #334155;
        }
        .code-block {
          font-family: 'JetBrains Mono', monospace;
          background: #1e293b;
          color: #e2e8f0;
          padding: 1rem;
          border-radius: 6px;
          font-size: 0.8rem;
          margin: 0.5rem 0;
          border-left: 3px solid #06b6d4;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="sidebar">
          <div class="header">
            <h1 class="name">${data.personalInfo.fullName}</h1>
            <div class="title">Software Engineer</div>
          </div>

          <div class="section">
            <h2 class="section-title">Contact</h2>
            <div class="contact-item">
              <div class="contact-label">email:</div>
              <div class="contact-value">${data.personalInfo.email}</div>
            </div>
            <div class="contact-item">
              <div class="contact-label">phone:</div>
              <div class="contact-value">${data.personalInfo.phone}</div>
            </div>
            <div class="contact-item">
              <div class="contact-label">location:</div>
              <div class="contact-value">${data.personalInfo.location}</div>
            </div>
            ${
              data.personalInfo.github
                ? `
              <div class="contact-item">
                <div class="contact-label">github:</div>
                <div class="contact-value">${data.personalInfo.github}</div>
              </div>
            `
                : ""
            }
            ${
              data.personalInfo.linkedin
                ? `
              <div class="contact-item">
                <div class="contact-label">linkedin:</div>
                <div class="contact-value">${data.personalInfo.linkedin}</div>
              </div>
            `
                : ""
            }
          </div>

          ${
            data.skills.length > 0
              ? `
            <div class="section">
              <h2 class="section-title">Tech Stack</h2>
              <div class="skills-grid">
                ${data.skills
                  .map(
                    (skill) => `
                  <div class="skill-item">${skill.name}</div>
                `,
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
                <div style="margin-bottom: 1.5rem;">
                  <div style="font-family: 'JetBrains Mono', monospace; font-weight: 600; color: #06b6d4; margin-bottom: 0.3rem; font-size: 0.9rem;">${edu.degree}</div>
                  <div style="color: #cbd5e1; font-size: 0.85rem;">${edu.field}</div>
                  <div style="color: #94a3b8; font-size: 0.8rem;">${edu.institution}</div>
                  <div style="font-family: 'JetBrains Mono', monospace; color: #64748b; font-size: 0.75rem; margin-top: 0.3rem;">${edu.startDate} - ${edu.endDate}</div>
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
                <div style="margin-bottom: 1rem;">
                  <div style="font-family: 'JetBrains Mono', monospace; font-weight: 600; color: #06b6d4; font-size: 0.85rem;">${cert.name}</div>
                  <div style="color: #cbd5e1; font-size: 0.8rem;">${cert.issuer}</div>
                  <div style="font-family: 'JetBrains Mono', monospace; color: #64748b; font-size: 0.75rem;">${cert.date}</div>
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
              <h2 class="main-section-title">About</h2>
              <div class="summary">${data.summary}</div>
            </div>
          `
              : ""
          }

          ${
            data.experience.length > 0
              ? `
            <div class="section">
              <h2 class="main-section-title">Experience</h2>
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
              <h2 class="main-section-title">Projects</h2>
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
                  ${
                    project.github
                      ? `
                    <div class="code-block">
                      git clone ${project.github}
                    </div>
                  `
                      : ""
                  }
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
