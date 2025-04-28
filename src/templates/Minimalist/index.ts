import { ResumeData } from "../../components/ResumePreview/ResumePreview.types";
import { getMinimalistStyles } from "./minimalistStyles";
import { getCertificationsHTML } from "./CertificationsSection";
import { getEducationHTML } from "./EducationSection";
import { getPersonalInfoHTML } from "./PersonalInfoHeader";
import { getProjectsHTML } from "./ProjectsSection";
import { getSkillsHTML } from "./SkillsSection";
import { getSummaryHTML } from "./SummarySection";
import { getWorkExperienceHTML } from "./WorkExperienceSection";

export const getMinimalistResumeHTML = (resumeData: ResumeData): string => {
  if (!resumeData) {
    return `
      <html>
        <body>
          <p>No resume data available</p>
        </body>
      </html>
    `;
  }

  // Dummy data for additional sections
  const languagesData = {
    items: [
      { name: "JavaScript", level: "Expert" },
      { name: "TypeScript", level: "Advanced" },
      { name: "Python", level: "Intermediate" },
      { name: "Go", level: "Beginner" },
    ],
  };

  const interestsData = {
    items: [
      { name: "Open Source Development" },
      { name: "Machine Learning" },
      { name: "UI/UX Design" },
      { name: "Tech Blogging" },
    ],
  };

  const contactData = resumeData.basics
    ? {
        email: resumeData.basics.email,
        phone: resumeData.basics.phone,
        url: resumeData.basics.url,
        profiles: resumeData.basics.profiles || [],
      }
    : {};

  const metricsData = [
    { value: "5+", label: "Years Experience" },
    { value: "20+", label: "Projects Completed" },
    { value: "10+", label: "Open Source Contributions" },
  ];

  return `
    <html>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        <style>
          body {
            margin: 0;
            font-family: 'Inter', sans-serif;
            background-color: #FFFFFF;
            color: #333333;
            line-height: 1.5;
          }

          @page {
            size: a4 portrait;
            margin: 12mm;
          }
          
          h1, h2, h3, p {
            margin: 0;
            padding: 0;
          }
          
          ${getMinimalistStyles()}
          
          /* Additional styles for new sections */
          .languages-list, .contact-list, .interests-list {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }
          
          .language-item {
            display: flex;
            justify-content: space-between;
            font-size: 0.85rem;
          }
          
          .language-level {
            color: #666;
            font-style: italic;
          }
          
          .contact-item {
            font-size: 0.85rem;
            margin-bottom: 0.3rem;
          }
          
          .contact-label {
            font-weight: 500;
            color: #555;
            display: inline-block;
            width: 70px;
          }
          
          .interest-item {
            font-size: 0.85rem;
            color: #444;
            padding: 0.3rem 0;
          }
          
          .metrics-list {
            display: flex;
            flex-direction: column;
            gap: 0.8rem;
            margin-top: 0.5rem;
          }
          
          .metric-item {
            display: flex;
            flex-direction: column;
            margin-bottom: 0.5rem;
          }
          
          .metric-value {
            font-size: 1.1rem;
            font-weight: 600;
            color: #333;
          }
          
          .metric-label {
            font-size: 0.75rem;
            color: #666;
          }
        </style>
      </head>
      <body>
        <div class="a4-page">
          ${resumeData.basics ? getPersonalInfoHTML(resumeData.basics) : ""}
          ${resumeData.basics?.summary ? getSummaryHTML(resumeData.basics) : ""}
          <div class="content-grid">
            <div class="main-column">
              ${
                resumeData.sections?.work?.items.length
                  ? getWorkExperienceHTML(resumeData.sections.work)
                  : ""
              }
              ${
                resumeData.sections?.projects?.items.length
                  ? getProjectsHTML(resumeData.sections.projects)
                  : ""
              }
              ${
                resumeData.sections?.education?.items.length
                  ? getEducationHTML(resumeData.sections.education)
                  : ""
              }
            </div>
            <div class="side-column">
              <!-- Contact Information Section -->
              <div class="section">
                <h2 class="section-title">Contact</h2>
                <div class="contact-list">
                  ${
                    contactData.email
                      ? `<div class="contact-item"><span class="contact-label">Email:</span> ${contactData.email}</div>`
                      : ""
                  }
                  ${
                    contactData.phone
                      ? `<div class="contact-item"><span class="contact-label">Phone:</span> ${contactData.phone}</div>`
                      : ""
                  }
                  ${
                    contactData.url
                      ? `<div class="contact-item"><span class="contact-label">Website:</span> ${contactData.url}</div>`
                      : ""
                  }
                  ${
                    contactData.profiles
                      ?.map(
                        (profile) => `
                    <div class="contact-item">
                      <span class="contact-label">${
                        profile.network || ""
                      }:</span> 
                      ${profile.username || ""}
                    </div>
                  `
                      )
                      .join("") || ""
                  }
                </div>
              </div>
              
              <!-- Skills Section -->
              ${
                resumeData.sections?.skills?.items.length
                  ? getSkillsHTML(resumeData.sections.skills)
                  : ""
              }
              
              <!-- Languages Section -->
              <div class="section">
                <h2 class="section-title">Languages</h2>
                <div class="languages-list">
                  ${languagesData.items
                    .map(
                      (item) => `
                    <div class="language-item">
                      <span class="language-name">${item.name}</span>
                      <span class="language-level">${item.level}</span>
                    </div>
                  `
                    )
                    .join("")}
                </div>
              </div>
              
              <!-- Certifications Section -->
              ${
                resumeData.sections?.certifications?.items.length
                  ? getCertificationsHTML(resumeData.sections.certifications)
                  : ""
              }
              
              <!-- Key Metrics Section -->
              <div class="section">
                <h2 class="section-title">Key Metrics</h2>
                <div class="metrics-list">
                  ${metricsData
                    .map(
                      (metric) => `
                    <div class="metric-item">
                      <span class="metric-value">${metric.value}</span>
                      <span class="metric-label">${metric.label}</span>
                    </div>
                  `
                    )
                    .join("")}
                </div>
              </div>
              
              <!-- Interests Section -->
              <div class="section">
                <h2 class="section-title">Interests</h2>
                <div class="interests-list">
                  ${interestsData.items
                    .map(
                      (item) => `
                    <div class="interest-item">${item.name}</div>
                  `
                    )
                    .join("")}
                </div>
              </div>
              
              <!-- References Section -->
              <div class="section">
                <h2 class="section-title">References</h2>
                <p style="font-size: 0.85rem; font-style: italic; color: #666;">Available upon request</p>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
};
