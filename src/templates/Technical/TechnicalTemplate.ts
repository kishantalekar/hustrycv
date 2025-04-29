import { getCertificationsHTML } from './CertificationsSection';
import { getEducationHTML } from './EducationSection';
import { getPersonalInfoHTML } from './PersonalInfoHeader';
import { getProjectsHTML } from './ProjectsSection';
import { getSkillsHTML } from './SkillsSection';
import { getSummaryHTML } from './SummarySection';
import { getTechnicalStyles } from './technicalStyles';
import { getTechStackHTML } from './TechStackSection';
import { getWorkExperienceHTML } from './WorkExperienceSection';
import { ResumeData } from '../../components/ResumePreview/ResumePreview.types';

export const getTechnicalResumeHTML = (resumeData: ResumeData): string => {
  if (!resumeData) {
    return `
      <html>
        <body>
          <p>No resume data available</p>
        </body>
      </html>
    `;
  }

  // Technical skills categorization
  const techStackData = {
    categories: [
      {
        name: 'Frontend',
        skills: [
          { name: 'React', level: 90 },
          { name: 'TypeScript', level: 85 },
          { name: 'CSS/SCSS', level: 80 },
          { name: 'Next.js', level: 75 },
        ],
      },
      {
        name: 'Backend',
        skills: [
          { name: 'Node.js', level: 85 },
          { name: 'Express', level: 80 },
          { name: 'Python', level: 70 },
          { name: 'MongoDB', level: 75 },
        ],
      },
      {
        name: 'DevOps',
        skills: [
          { name: 'Docker', level: 70 },
          { name: 'AWS', level: 65 },
          { name: 'CI/CD', level: 75 },
          { name: 'Kubernetes', level: 60 },
        ],
      },
    ],
  };

  // Professional achievements
  const achievementsData = [
    { metric: '99.9%', description: 'System uptime maintained' },
    { metric: '60%', description: 'Reduction in build time' },
    { metric: '500K+', description: 'Active users supported' },
  ];

  // Contact information
  const contactData = resumeData.basics
    ? {
        email: resumeData.basics.email,
        phone: resumeData.basics.phone,
        url: resumeData.basics.url,
        profiles: resumeData.basics.profiles || [],
      }
    : {};

  return `
    <html>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300;400;500;600;700&family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
        <style>
          body {
            margin: 0;
            font-family: 'Roboto', sans-serif;
            background-color: #FFFFFF;
            color: #2D3748;
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
          
          code, .tech-tag {
            font-family: 'Roboto Mono', monospace;
          }
          
          ${getTechnicalStyles()}
          
          /* Tech Stack styles */
          .tech-category {
            margin-bottom: 1.2rem;
          }
          
          .tech-category-title {
            font-size: 0.9rem;
            font-weight: 600;
            color: #4A5568;
            margin-bottom: 0.5rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }
          
          .tech-tag-container {
            display: flex;
            flex-wrap: wrap;
            gap: 0.4rem;
            margin-bottom: 0.8rem;
          }
          
          .tech-tag {
            background-color: #F7FAFC;
            color: #4A5568;
            padding: 0.25rem 0.5rem;
            border-radius: 3px;
            font-size: 0.75rem;
            font-weight: 500;
            border: 1px solid #E2E8F0;
          }
          
          .achievement-item {
            display: flex;
            align-items: baseline;
            margin-bottom: 0.8rem;
            gap: 0.5rem;
          }
          
          .achievement-metric {
            font-size: 1.1rem;
            font-weight: 600;
            color: #4A5568;
            font-family: 'Roboto Mono', monospace;
          }
          
          .achievement-description {
            font-size: 0.85rem;
            color: #4A5568;
          }
          
          .tech-tag-container {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-top: 0.8rem;
          }
          
          .tech-tag {
            background-color: #F7FAFC;
            color: #4A5568;
            padding: 0.3rem 0.6rem;
            border-radius: 3px;
            font-size: 0.75rem;
            font-weight: 500;
            border: 1px solid #E2E8F0;
          }
        </style>
      </head>
      <body>
        <div class="a4-page">
          ${resumeData.basics ? getPersonalInfoHTML(resumeData.basics) : ''}
          
          <div class="content-grid">
            <div class="main-column">
              ${
                resumeData.basics?.summary
                  ? getSummaryHTML(resumeData.basics)
                  : ''
              }
              
              ${
                resumeData.sections?.work?.items.length
                  ? getWorkExperienceHTML(resumeData.sections.work)
                  : ''
              }
              
              ${
                resumeData.sections?.projects?.items.length
                  ? getProjectsHTML(resumeData.sections.projects)
                  : ''
              }
              
              ${
                resumeData.sections?.education?.items.length
                  ? getEducationHTML(resumeData.sections.education)
                  : ''
              }
            </div>
            
            <div class="side-column">
              <!-- Tech Stack Section -->
              ${getTechStackHTML(techStackData)}
              
              <!-- Contact Information Section -->
              <div class="section">
                <h2 class="section-title">Contact</h2>
                <div class="contact-list">
                  ${
                    contactData.email
                      ? `<div class="contact-item"><span class="contact-label">Email:</span> ${contactData.email}</div>`
                      : ''
                  }
                  ${
                    contactData.phone
                      ? `<div class="contact-item"><span class="contact-label">Phone:</span> ${contactData.phone}</div>`
                      : ''
                  }
                  ${
                    contactData.url
                      ? `<div class="contact-item"><span class="contact-label">Website:</span> ${contactData.url}</div>`
                      : ''
                  }
                  ${
                    contactData.profiles
                      ?.map(
                        (profile) => `
                    <div class="contact-item">
                      <span class="contact-label">${
                        profile.network || ''
                      }:</span> 
                      ${profile.username || ''}
                    </div>
                  `,
                      )
                      .join('') || ''
                  }
                </div>
              </div>
              
              <!-- Skills Section -->
              ${
                resumeData.sections?.skills?.items.length
                  ? getSkillsHTML(resumeData.sections.skills)
                  : ''
              }
              
              <!-- Technical Achievements Section -->
              <div class="section">
                <h2 class="section-title">Technical Achievements</h2>
                <div class="achievements-list">
                  ${achievementsData
                    .map(
                      (achievement) => `
                    <div class="achievement-item">
                      <div class="achievement-metric">${achievement.metric}</div>
                      <div class="achievement-description">${achievement.description}</div>
                    </div>
                  `,
                    )
                    .join('')}
                </div>
              </div>
              
              <!-- Certifications Section -->
              ${
                resumeData.sections?.certifications?.items.length
                  ? getCertificationsHTML(resumeData.sections.certifications)
                  : ''
              }
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
};
