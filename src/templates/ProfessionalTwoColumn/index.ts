
import { getProfessionalTwoColumnPersonalInfoHTML } from './PersonalInfoHeader';
import { getProfessionalTwoColumnSummaryHTML } from './SummarySection';
import { getProfessionalTwoColumnWorkExperienceHTML } from './WorkExperienceSection';
import { getProfessionalTwoColumnEducationHTML } from './EducationSection';
import { getProfessionalTwoColumnSkillsHTML } from './SkillsSection';
import { getProfessionalTwoColumnProjectsHTML } from './ProjectsSection';
import { getProfessionalTwoColumnCertificationsHTML } from './CertificationsSection';
import { getProfessionalTwoColumnHobbiesHTML } from './HobbiesSection';
import { getProfessionalTwoColumnStrengthsHTML } from './StrengthsSection';
import { getProfessionalTwoColumnReferencesHTML } from './ReferencesSection';

export const getProfessionalTwoColumnResumeHTML = (resumeData: Resume) => {
  const workItems = resumeData.sections.work?.items || [];
  const educationItems = resumeData.sections.education?.items || [];
  const skillItems = resumeData.sections.skills?.items || [];
  const projectItems = resumeData.sections.projects?.items || [];
  const certificationItems = resumeData.sections.certifications?.items || [];
  const hobbieItems = resumeData.sections.hobbies?.items || [];
  const strengthItems = resumeData.sections.strengths?.items || [];
  const referenceItems = resumeData.sections.references?.items || [];

  const sidebarContent = `
    ${getProfessionalTwoColumnPersonalInfoHTML(resumeData.basics, resumeData.settings)}
    ${getProfessionalTwoColumnSkillsHTML(skillItems, resumeData.settings)}
    ${getProfessionalTwoColumnCertificationsHTML(certificationItems, resumeData.settings)}
    ${getProfessionalTwoColumnStrengthsHTML(strengthItems, resumeData.settings)}
    ${getProfessionalTwoColumnHobbiesHTML(hobbieItems, resumeData.settings)}
  `;

  const mainContent = `
    ${getProfessionalTwoColumnSummaryHTML(resumeData.basics, resumeData.settings)}
    ${getProfessionalTwoColumnWorkExperienceHTML(workItems, resumeData.settings)}
    ${getProfessionalTwoColumnEducationHTML(educationItems, resumeData.settings)}
    ${getProfessionalTwoColumnProjectsHTML(projectItems, resumeData.settings)}
    ${getProfessionalTwoColumnReferencesHTML(referenceItems, resumeData.settings)}
  `;

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${resumeData.basics.name} - Resume</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', sans-serif;
          line-height: 1.6;
          color: #333;
          background: white;
        }

        .professional-two-column-container {
          display: grid;
          grid-template-columns: 280pt 1fr;
          min-height: 100vh;
          max-width: 210mm;
          margin: 0 auto;
        }

        .professional-two-column-sidebar {
          background: #1f2937;
          color: white;
          padding: 0;
        }

        .professional-two-column-main {
          padding: 28pt;
          background: white;
        }

        .professional-two-column-section {
          margin-bottom: 32pt;
        }

        .professional-two-column-section-title {
          font-size: 14pt;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 16pt;
          text-transform: uppercase;
          letter-spacing: 1px;
          border-bottom: 2pt solid #2563eb;
          padding-bottom: 8pt;
        }

        @media print {
          .professional-two-column-container {
            max-width: none;
            margin: 0;
          }
          
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
        }

        @media screen and (max-width: 768px) {
          .professional-two-column-container {
            grid-template-columns: 1fr;
          }
          
          .professional-two-column-sidebar {
            order: 2;
          }
          
          .professional-two-column-main {
            order: 1;
          }
        }
      </style>
    </head>
    <body>
      <div class="professional-two-column-container">
        <div class="professional-two-column-sidebar">
          ${sidebarContent}
        </div>
        <div class="professional-two-column-main">
          ${mainContent}
        </div>
      </div>
    </body>
    </html>
  `;
};
