
import { getCommonStyles } from '../styles/resumeStyles';
import { getMinimalistBoldPersonalInfoHTML } from './PersonalInfoHeader';
import { getMinimalistBoldSummaryHTML } from './SummarySection';
import { getMinimalistBoldWorkExperienceHTML } from './WorkExperienceSection';
import { getMinimalistBoldEducationHTML } from './EducationSection';
import { getMinimalistBoldSkillsHTML } from './SkillsSection';
import { getMinimalistBoldProjectsHTML } from './ProjectsSection';
import { getMinimalistBoldCertificationsHTML } from './CertificationsSection';
import { getMinimalistBoldHobbiesHTML } from './HobbiesSection';
import { getMinimalistBoldStrengthsHTML } from './StrengthsSection';
import { getMinimalistBoldReferencesHTML } from './ReferencesSection';

export const getMinimalistBoldResumeHTML = (resumeData: Resume): string => {
  if (!resumeData) {
    return `<html><body><p>No resume data available</p></body></html>`;
  }

  let fontFamily = resumeData.settings?.font.family || 'Arial';

  return `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <style>
          body {
            margin: 0;
            font-family: "${fontFamily}", Arial, sans-serif;
            background-color: #ffffff;
            color: #000000;
            line-height: 1.6;
            font-weight: 500;
          }

          @page {
            size: a4 portrait;
            margin: 25mm;
          }
          
          h1, h2, h3, h4, h5, h6, p {
            margin: 0;
            padding: 0;
          }

          .minimalist-bold-container {
            max-width: 700px;
            margin: 0 auto;
            padding: 32pt;
            background: white;
          }

          .minimalist-bold-section {
            margin-bottom: 32pt;
            page-break-inside: avoid;
          }

          .minimalist-bold-section-title {
            font-size: 14pt;
            font-weight: 900;
            color: #000000;
            margin-bottom: 20pt;
            text-transform: uppercase;
            letter-spacing: 4px;
            border-bottom: 3pt solid #000000;
            padding-bottom: 8pt;
          }

          ${getCommonStyles()}
        </style>
      </head>
      <body>
        <div class="minimalist-bold-container">
          ${resumeData.basics ? getMinimalistBoldPersonalInfoHTML(resumeData.basics, resumeData?.settings) : ''}
          ${resumeData.basics?.summary ? getMinimalistBoldSummaryHTML(resumeData.basics, resumeData?.settings) : ''}
          ${resumeData.sections?.work?.items && resumeData.sections.work.items.length > 0 ? getMinimalistBoldWorkExperienceHTML(resumeData.sections.work.items, resumeData?.settings) : ''}
          ${resumeData.sections?.education?.items && resumeData.sections.education.items.length > 0 ? getMinimalistBoldEducationHTML(resumeData.sections.education.items, resumeData?.settings) : ''}
          ${resumeData.sections?.skills?.items && resumeData.sections.skills.items.length > 0 ? getMinimalistBoldSkillsHTML(resumeData.sections.skills.items, resumeData?.settings) : ''}
          ${resumeData.sections?.projects?.items && resumeData.sections.projects.items.length > 0 ? getMinimalistBoldProjectsHTML(resumeData.sections.projects.items, resumeData?.settings) : ''}
          ${resumeData.sections?.certifications?.items && resumeData.sections.certifications.items.length > 0 ? getMinimalistBoldCertificationsHTML(resumeData.sections.certifications.items, resumeData?.settings) : ''}
          ${resumeData.sections?.hobbies?.items && resumeData.sections.hobbies.items.length > 0 ? getMinimalistBoldHobbiesHTML(resumeData.sections.hobbies.items, resumeData?.settings) : ''}
          ${resumeData.sections?.strengths?.items && resumeData.sections.strengths.items.length > 0 ? getMinimalistBoldStrengthsHTML(resumeData.sections.strengths.items, resumeData?.settings) : ''}
          ${resumeData.sections?.references?.items && resumeData.sections.references.items.length > 0 ? getMinimalistBoldReferencesHTML(resumeData.sections.references.items, resumeData?.settings) : ''}
        </div>
      </body>
    </html>
  `;
};
