import {Resume} from '@/types';
import {getCertificationsHTML} from './CertificationsSection';
import {getEducationHTML} from './EducationSection';
import {getModernStyles} from './modernStyles';
import {getPersonalInfoHTML} from './PersonalInfoHeader';
import {getProjectsHTML} from './ProjectsSection';
import {getSkillsHTML} from './SkillsSection';
import {getSummaryHTML} from './SummarySection';
import {getWorkExperienceHTML} from './WorkExperienceSection';

export const getModernResumeHTML = (resumeData: Resume): string => {
  if (!resumeData) {
    return `
      <html>
        <body>
          <p>No resume data available</p>
        </body>
      </html>
    `;
  }

  // Contact information
  const contactData = resumeData.basics
    ? {
        email: resumeData.basics.email,
        phone: resumeData.basics.phone,
        // url: resumeData.basics.url,
        // profiles: resumeData.basics.profiles || [],
      }
    : {};

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        <style>
          body {
            margin: 0;
            font-family: 'Poppins', sans-serif;
            background-color: white;
            color: #333333;
            line-height: 1.5;
          }

          @page {
            size: a4 portrait;
            margin: 10mm;
          }
          
          h1, h2, h3, p {
            margin: 0;
            padding: 0;
          }
          
          ${getModernStyles()}
          
          /* Contact styles */
          .contact-list {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            margin-bottom: 1.5rem;
          }
          
          .contact-item {
            font-size: 0.85rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }
          
          .contact-label {
            font-weight: 500;
            color: #555;
            min-width: 70px;
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
              
                </div>
              </div>
              
              <!-- Skills Section -->
              ${
                resumeData.sections?.skills?.items.length
                  ? getSkillsHTML(resumeData.sections.skills)
                  : ''
              }
              
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
