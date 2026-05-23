
import { getCreativeTwoColumnPersonalInfoHTML } from './PersonalInfoHeader';
import { getCreativeTwoColumnSummaryHTML } from './SummarySection';
import { getCreativeTwoColumnWorkExperienceHTML } from './WorkExperienceSection';
import { getCreativeTwoColumnEducationHTML } from './EducationSection';
import { getCreativeTwoColumnSkillsHTML } from './SkillsSection';
import { getCreativeTwoColumnProjectsHTML } from './ProjectsSection';
import { getCreativeTwoColumnCertificationsHTML } from './CertificationsSection';
import { getCreativeTwoColumnHobbiesHTML } from './HobbiesSection';
import { getCreativeTwoColumnStrengthsHTML } from './StrengthsSection';
import { getCreativeTwoColumnReferencesHTML } from './ReferencesSection';

export const getCreativeTwoColumnResumeHTML = (resumeData: Resume) => {
  const workItems = resumeData.sections.work?.items || [];
  const educationItems = resumeData.sections.education?.items || [];
  const skillItems = resumeData.sections.skills?.items || [];
  const projectItems = resumeData.sections.projects?.items || [];
  const certificationItems = resumeData.sections.certifications?.items || [];
  const hobbieItems = resumeData.sections.hobbies?.items || [];
  const strengthItems = resumeData.sections.strengths?.items || [];
  const referenceItems = resumeData.sections.references?.items || [];

  const sidebarContent = `
    ${getCreativeTwoColumnPersonalInfoHTML(resumeData.basics, resumeData.settings)}
    ${getCreativeTwoColumnSkillsHTML(skillItems, resumeData.settings)}
    ${getCreativeTwoColumnCertificationsHTML(certificationItems, resumeData.settings)}
    ${getCreativeTwoColumnStrengthsHTML(strengthItems, resumeData.settings)}
    ${getCreativeTwoColumnHobbiesHTML(hobbieItems, resumeData.settings)}
  `;

  const mainContent = `
    ${getCreativeTwoColumnSummaryHTML(resumeData.basics, resumeData.settings)}
    ${getCreativeTwoColumnWorkExperienceHTML(workItems, resumeData.settings)}
    ${getCreativeTwoColumnEducationHTML(educationItems, resumeData.settings)}
    ${getCreativeTwoColumnProjectsHTML(projectItems, resumeData.settings)}
    ${getCreativeTwoColumnReferencesHTML(referenceItems, resumeData.settings)}
  `;

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${resumeData.basics.name} - Resume</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Poppins', sans-serif;
          line-height: 1.6;
          color: #333;
          background: linear-gradient(135deg, #fef3c7 0%, #e0e7ff 100%);
        }

        .creative-two-column-container {
          display: grid;
          grid-template-columns: 320pt 1fr;
          min-height: 100vh;
          max-width: 210mm;
          margin: 0 auto;
          background: white;
          box-shadow: 0 0 20pt rgba(139, 92, 246, 0.1);
        }

        .creative-two-column-sidebar {
          background: linear-gradient(180deg, #fef3c7 0%, #e0e7ff 100%);
          padding: 0;
        }

        .creative-two-column-main {
          padding: 32pt;
          background: white;
        }

        .creative-two-column-section {
          margin-bottom: 36pt;
        }

        .creative-two-column-section-title {
          font-size: 18pt;
          font-weight: 800;
          background: linear-gradient(135deg, #8b5cf6, #f59e0b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 20pt;
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        @media print {
          .creative-two-column-container {
            max-width: none;
            margin: 0;
            box-shadow: none;
          }
          
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
        }

        @media screen and (max-width: 768px) {
          .creative-two-column-container {
            grid-template-columns: 1fr;
          }
          
          .creative-two-column-sidebar {
            order: 2;
          }
          
          .creative-two-column-main {
            order: 1;
          }
        }
      </style>
    </head>
    <body>
      <div class="creative-two-column-container">
        <div class="creative-two-column-sidebar">
          ${sidebarContent}
        </div>
        <div class="creative-two-column-main">
          ${mainContent}
        </div>
      </div>
    </body>
    </html>
  `;
};
