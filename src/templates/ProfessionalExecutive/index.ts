
import { getCommonStyles } from '../styles/resumeStyles';
import { getProfessionalExecutivePersonalInfoHTML } from './PersonalInfoHeader';
import { getProfessionalExecutiveSummaryHTML } from './SummarySection';
import { getProfessionalExecutiveWorkExperienceHTML } from './WorkExperienceSection';
import { getProfessionalExecutiveEducationHTML } from './EducationSection';
import { getProfessionalExecutiveSkillsHTML } from './SkillsSection';
import { getProfessionalExecutiveProjectsHTML } from './ProjectsSection';
import { getProfessionalExecutiveCertificationsHTML } from './CertificationsSection';
import { getProfessionalExecutiveHobbiesHTML } from './HobbiesSection';
import { getProfessionalExecutiveStrengthsHTML } from './StrengthsSection';
import { getProfessionalExecutiveReferencesHTML } from './ReferencesSection';

export const getProfessionalExecutiveResumeHTML = (resumeData: Resume): string => {
  if (!resumeData) {
    return `<html><body><p>No resume data available</p></body></html>`;
  }

  let fontFamily = resumeData.settings?.font.family || 'Helvetica';

  return `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <style>
          body {
            margin: 0;
            font-family: "${fontFamily}", "Helvetica Neue", Arial, sans-serif;
            background-color: #ffffff;
            color: #2d3748;
            line-height: 1.6;
            font-weight: 400;
          }

          @page {
            size: a4 portrait;
            margin: 25mm;
          }
          
          h1, h2, h3, h4, h5, h6, p {
            margin: 0;
            padding: 0;
          }

          .professional-executive-container {
            max-width: 700px;
            margin: 0 auto;
            padding: 32pt;
            background: white;
            box-shadow: 0 4pt 12pt rgba(0,0,0,0.1);
          }

          .professional-executive-section {
            margin-bottom: 36pt;
            page-break-inside: avoid;
          }

          .professional-executive-section-title {
            font-size: 16pt;
            font-weight: 700;
            color: #1a202c;
            margin-bottom: 20pt;
            text-transform: uppercase;
            letter-spacing: 2px;
            position: relative;
            padding-bottom: 12pt;
          }

          .professional-executive-section-title::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 60pt;
            height: 3pt;
            background: linear-gradient(90deg, #1a202c 0%, #2d3748 100%);
          }

          ${getCommonStyles()}
        </style>
      </head>
      <body>
        <div class="professional-executive-container">
          ${resumeData.basics ? getProfessionalExecutivePersonalInfoHTML(resumeData.basics, resumeData?.settings) : ''}
          ${resumeData.basics?.summary ? getProfessionalExecutiveSummaryHTML(resumeData.basics, resumeData?.settings) : ''}
          ${resumeData.sections?.work?.visible && resumeData.sections.work.items?.length > 0 ? getProfessionalExecutiveWorkExperienceHTML(resumeData.sections.work.items, resumeData?.settings) : ''}
          ${resumeData.sections?.education?.visible && resumeData.sections.education.items?.length > 0 ? getProfessionalExecutiveEducationHTML(resumeData.sections.education.items, resumeData?.settings) : ''}
          ${resumeData.sections?.skills?.visible && resumeData.sections.skills.items?.length > 0 ? getProfessionalExecutiveSkillsHTML(resumeData.sections.skills.items, resumeData?.settings) : ''}
          ${resumeData.sections?.projects?.visible && resumeData.sections.projects.items?.length > 0 ? getProfessionalExecutiveProjectsHTML(resumeData.sections.projects.items, resumeData?.settings) : ''}
          ${resumeData.sections?.certifications?.visible && resumeData.sections.certifications.items?.length > 0 ? getProfessionalExecutiveCertificationsHTML(resumeData.sections.certifications.items, resumeData?.settings) : ''}
          ${resumeData.sections?.strengths?.visible && resumeData.sections.strengths.items?.length > 0 ? getProfessionalExecutiveStrengthsHTML(resumeData.sections.strengths.items, resumeData?.settings) : ''}
          ${resumeData.sections?.hobbies?.visible && resumeData.sections.hobbies.items?.length > 0 ? getProfessionalExecutiveHobbiesHTML(resumeData.sections.hobbies.items, resumeData?.settings) : ''}
          ${resumeData.sections?.references?.visible && resumeData.sections.references.items?.length > 0 ? getProfessionalExecutiveReferencesHTML(resumeData.sections.references.items, resumeData?.settings) : ''}
        </div>
      </body>
    </html>
  `;
};
