import {getCertificationsHTML} from './CertificationsSection';
import {certificationsSectionStyles} from './CertificationsSection.styles';
import {getEducationHTML} from './EducationSection';
import {educationSectionStyles} from './EducationSection.styles';
import {getPersonalInfoHTML} from './PersonalInfoHeader';
import {getProjectsHTML} from './ProjectsSection';
import {getSummaryHTML} from './SummarySection';
import {getTechnicalStyles} from './technicalStyles';
import {getTechStackHTML} from './TechStackSection';
import {getWorkExperienceHTML} from './WorkExperienceSection';

export const getTechnicalResumeHTML = (resumeData: Resume): string => {
  if (!resumeData) {
    return `
      <html>
        <body>
          <p>No resume data available</p>
        </body>
      </html>
    `;
  }

  // Use the skills section from the resume data
  const {
    skills,
    // certifications, projects
  } = resumeData.sections;

  // Professional achievements
  const achievementsData = [
    {metric: '99.9%', description: 'System uptime maintained'},
    {metric: '60%', description: 'Reduction in build time'},
    {metric: '500K+', description: 'Active users supported'},
  ];

  // Contact information
  const contactData = resumeData.basics
    ? {
        email: resumeData.basics.email,
        phone: resumeData.basics.phone,
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
            margin: 10mm;
          }
          
          h1, h2, h3, p {
            margin: 0;
            padding: 0;
          }
          
          code, .tech-tag {
            font-family: 'Roboto Mono', monospace;
          }
          
          ${getTechnicalStyles()}
          @import url('/src/templates/Technical/styles.css');
          
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
            ${certificationsSectionStyles}
            ${educationSectionStyles}
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
              ${skills?.items.length ? getTechStackHTML(skills) : ''}
              
            
              
            
              
            
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
