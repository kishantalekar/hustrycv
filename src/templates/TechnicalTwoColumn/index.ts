
import { getTechnicalTwoColumnPersonalInfoHTML } from './PersonalInfoHeader';
import { getTechnicalTwoColumnSummaryHTML } from './SummarySection';
import { getTechnicalTwoColumnWorkExperienceHTML } from './WorkExperienceSection';
import { getTechnicalTwoColumnEducationHTML } from './EducationSection';
import { getTechnicalTwoColumnSkillsHTML } from './SkillsSection';
import { getTechnicalTwoColumnProjectsHTML } from './ProjectsSection';
import { getTechnicalTwoColumnCertificationsHTML } from './CertificationsSection';
import { getTechnicalTwoColumnHobbiesHTML } from './HobbiesSection';
import { getTechnicalTwoColumnStrengthsHTML } from './StrengthsSection';
import { getTechnicalTwoColumnReferencesHTML } from './ReferencesSection';

export const getTechnicalTwoColumnResumeHTML = (resumeData: Resume) => {
  const workItems = resumeData.sections.work?.items || [];
  const educationItems = resumeData.sections.education?.items || [];
  const skillItems = resumeData.sections.skills?.items || [];
  const projectItems = resumeData.sections.projects?.items || [];
  const certificationItems = resumeData.sections.certifications?.items || [];
  const hobbieItems = resumeData.sections.hobbies?.items || [];
  const strengthItems = resumeData.sections.strengths?.items || [];
  const referenceItems = resumeData.sections.references?.items || [];

  const sidebarContent = `
    ${getTechnicalTwoColumnPersonalInfoHTML(resumeData.basics, resumeData.settings)}
    ${getTechnicalTwoColumnSkillsHTML(skillItems, resumeData.settings)}
    ${getTechnicalTwoColumnCertificationsHTML(certificationItems, resumeData.settings)}
    ${getTechnicalTwoColumnStrengthsHTML(strengthItems, resumeData.settings)}
    ${getTechnicalTwoColumnHobbiesHTML(hobbieItems, resumeData.settings)}
  `;

  const mainContent = `
    ${getTechnicalTwoColumnSummaryHTML(resumeData.basics, resumeData.settings)}
    ${getTechnicalTwoColumnWorkExperienceHTML(workItems, resumeData.settings)}
    ${getTechnicalTwoColumnEducationHTML(educationItems, resumeData.settings)}
    ${getTechnicalTwoColumnProjectsHTML(projectItems, resumeData.settings)}
    ${getTechnicalTwoColumnReferencesHTML(referenceItems, resumeData.settings)}
  `;

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${resumeData.basics.name} - Resume</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Courier New', monospace;
          line-height: 1.6;
          color: #e5e7eb;
          background: #0a0a0a;
        }

        .technical-two-column-container {
          display: grid;
          grid-template-columns: 300pt 1fr;
          min-height: 100vh;
          max-width: 210mm;
          margin: 0 auto;
        }

        .technical-two-column-sidebar {
          background: #0a0a0a;
          color: #00ff88;
          padding: 0;
          border-right: 2pt solid #333;
        }

        .technical-two-column-main {
          padding: 28pt;
          background: #111;
        }

        .technical-two-column-section {
          margin-bottom: 32pt;
        }

        .technical-two-column-section-title {
          font-size: 14pt;
          font-weight: 600;
          color: #00ff88;
          margin-bottom: 16pt;
          font-family: 'Courier New', monospace;
          border-bottom: 2pt solid #00ff88;
          padding-bottom: 8pt;
        }

        @media print {
          .technical-two-column-container {
            max-width: none;
            margin: 0;
          }
          
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
        }

        @media screen and (max-width: 768px) {
          .technical-two-column-container {
            grid-template-columns: 1fr;
          }
          
          .technical-two-column-sidebar {
            order: 2;
          }
          
          .technical-two-column-main {
            order: 1;
          }
        }
      </style>
    </head>
    <body>
      <div class="technical-two-column-container">
        <div class="technical-two-column-sidebar">
          ${sidebarContent}
        </div>
        <div class="technical-two-column-main">
          ${mainContent}
        </div>
      </div>
    </body>
    </html>
  `;
};
