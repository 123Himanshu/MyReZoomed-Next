import type { TemplateConfig, ResumeData } from "./types"

export const creativeDesignerTemplate: TemplateConfig = {
  id: "creative-designer",
  name: "Creative Designer",
  description: "Bold, creative design for designers and creative professionals",
  category: "creative",
  preview: "/templates/creative-designer-preview.png",
  colors: {
    primary: "#7c3aed",
    secondary: "#a855f7",
    accent: "#ec4899",
    text: "#1f2937",
    background: "#ffffff",
  },
  fonts: {
    heading: "Poppins",
    body: "Poppins",
  },
  layout: "sidebar",
  generateHTML: (data: ResumeData) => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${data.personalInfo.fullName} - Resume</title>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
          font-family: 'Poppins', sans-serif; 
          line-height: 1.6; 
          color: #1f2937;
          background: #ffffff;
        }
        .container { 
          max-width: 8.5in; 
          margin: 0 auto; 
          background: white;
          display: grid;
          grid-template-columns: 300px 1fr;
          min-height: 11in;
        }
        .sidebar { 
          background: linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #ec4899 100%);
          color: white;
          padding: 2rem 1.5rem;
          position: relative;
        }
        .sidebar::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.1);
          z-index: 1;
        }
        .sidebar > * {
          position: relative;
          z-index: 2;
        }
        .main-content { 
          padding: 2rem 2rem; 
        }
        .header { 
          text-align: center; 
          margin-bottom: 2rem; 
        }
        .name { 
          font-size: 1.8rem; 
          font-weight: 700; 
          color: white; 
          margin-bottom: 0.5rem; 
          text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        .title {
          font-size: 1rem;
          font-weight: 400;
          color: rgba(255,255,255,0.9);
          margin-bottom: 1.5rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .contact-info { 
          font-size: 0.9rem; 
          color: rgba(255,255,255,0.9); 
          line-height: 1.6;
        }
        .section { 
          margin-bottom: 2rem; 
        }
        .section-title { 
          font-size: 1.1rem; 
          font-weight: 600; 
          color: white; 
          margin-bottom: 1rem; 
          text-transform: uppercase; 
          letter-spacing: 0.5px;
        }
        .main-section-title {
          font-size: 1.2rem; 
          font-weight: 600; 
          color: #7c3aed; 
          margin-bottom: 1.5rem; 
          text-transform: uppercase; 
          letter-spacing: 0.5px;
          position: relative;
          padding-left: 1rem;
        }
        .main-section-title::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 4px;
          height: 100%;
          background: linear-gradient(135deg, #7c3aed, #ec4899);
          border-radius: 2px;
        }
        .experience-item, .education-item, .project-item { 
          margin-bottom: 1.5rem; 
          padding-left: 1rem;
          border-left: 2px solid #e5e7eb;
          position: relative;
        }
        .experience-item::before, .education-item::before, .project-item::before {
          content: '';
          position: absolute;
          left: -6px;
          top: 0.5rem;
          width: 10px;
          height: 10px;
          background: linear-gradient(135deg, #7c3aed, #ec4899);
          border-radius: 50%;
        }
        .item-header { 
          margin-bottom: 0.5rem; 
        }
        .item-title { 
          font-weight: 600; 
          color: #1f2937; 
          font-size: 1rem;
        }
        .item-company { 
          color: #7c3aed; 
          font-weight: 500; 
          font-size: 0.9rem;
        }
        .item-date { 
          color: #6b7280; 
          font-size: 0.85rem; 
          font-weight: 400;
        }
        .item-description { 
          color: #4b5563; 
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
          gap: 0.8rem; 
        }
        .skill-item { 
          background: rgba(255,255,255,0.2); 
          padding: 0.5rem 1rem; 
          border-radius: 25px; 
          font-size: 0.85rem; 
          color: white;
          text-align: center;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.1);
        }
        .summary { 
          color: #4b5563; 
          font-size: 0.95rem; 
          line-height: 1.7; 
          text-align: justify;
        }
        .contact-item { 
          margin-bottom: 1rem; 
          padding: 0.5rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.2);
        }
        .contact-label { 
          font-weight: 500; 
          color: rgba(255,255,255,0.8); 
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          display: block;
          margin-bottom: 0.2rem;
        }
        .contact-value {
          color: white;
          font-size: 0.9rem;
        }
        .technologies { 
          display: flex; 
          flex-wrap: wrap; 
          gap: 0.3rem; 
          margin-top: 0.5rem; 
        }
        .tech-tag { 
          background: linear-gradient(135deg, #7c3aed, #ec4899); 
          color: white; 
          padding: 0.2rem 0.6rem; 
          border-radius: 15px; 
          font-size: 0.75rem; 
          font-weight: 500;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="sidebar">
          <div class="header">
            <h1 class="name">${data.personalInfo.fullName}</h1>
            <div class="title">Creative Professional</div>
          </div>

          <div class="section">
            <h2 class="section-title">Contact</h2>
            <div class="contact-item">
              <div class="contact-label">Email</div>
              <div class="contact-value">${data.personalInfo.email}</div>
            </div>
            <div class="contact-item">
              <div class="contact-label">Phone</div>
              <div class="contact-value">${data.personalInfo.phone}</div>
            </div>
            <div class="contact-item">
              <div class="contact-label">Location</div>
              <div class="contact-value">${data.personalInfo.location}</div>
            </div>
            ${
              data.personalInfo.linkedin
                ? `
              <div class="contact-item">
                <div class="contact-label">LinkedIn</div>
                <div class="contact-value">${data.personalInfo.linkedin}</div>
              </div>
            `
                : ""
            }
            ${
              data.personalInfo.website
                ? `
              <div class="contact-item">
                <div class="contact-label">Portfolio</div>
                <div class="contact-value">${data.personalInfo.website}</div>
              </div>
            `
                : ""
            }
          </div>

          ${
            data.skills.length > 0
              ? `
            <div class="section">
              <h2 class="section-title">Skills</h2>
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
                  <div style="font-weight: 600; color: white; margin-bottom: 0.3rem;">${edu.degree}</div>
                  <div style="color: rgba(255,255,255,0.9); font-size: 0.9rem;">${edu.field}</div>
                  <div style="color: rgba(255,255,255,0.8); font-size: 0.85rem;">${edu.institution}</div>
                  <div style="color: rgba(255,255,255,0.7); font-size: 0.8rem;">${edu.startDate} - ${edu.endDate}</div>
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
              <h2 class="main-section-title">About Me</h2>
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
                    <div class="item-title">${exp.position}</div>
                    <div class="item-company">${exp.company}</div>
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
              <h2 class="main-section-title">Featured Projects</h2>
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
