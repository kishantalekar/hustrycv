
import { getCommonStyles } from '../styles/resumeStyles';
import { getMinimalistCleanPersonalInfoHTML } from './PersonalInfoHeader';
import { getMinimalistCleanSummaryHTML } from './SummarySection';
import { getMinimalistCleanWorkExperienceHTML } from './WorkExperienceSection';
import { getMinimalistCleanEducationHTML } from './EducationSection';
import { getMinimalistCleanSkillsHTML } from './SkillsSection';
import { getMinimalistCleanProjectsHTML } from './ProjectsSection';
import { getMinimalistCleanCertificationsHTML } from './CertificationsSection';
import { getMinimalistCleanHobbiesHTML } from './HobbiesSection';
import { getMinimalistCleanStrengthsHTML } from './StrengthsSection';
import { getMinimalistCleanReferencesHTML } from './ReferencesSection';

export const getMinimalistCleanResumeHTML = (resumeData: Resume): string => {
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
            color: #111827;
            line-height: 1.8;
            font-weight: 200;
          }

          @page {
            size: a4 portrait;
            margin: 35mm;
          }
          
          h1, h2, h3, h4, h5, h6, p {
            margin: 0;
            padding: 0;
          }

          .minimalist-clean-container {
            max-width: 600px;
            margin: 0 auto;
            padding: 0;
          }

          .minimalist-clean-section {
            margin-bottom: 48pt;
            page-break-inside: avoid;
          }

          .minimalist-clean-section-title {
            font-size: 10pt;
            font-weight: 100;
            color: #111827;
            margin-bottom: 24pt;
            text-transform: lowercase;
            letter-spacing: 6px;
            text-align: center;
          }

          ${getCommonStyles()}
        </style>
      </head>
      <body>
        <div class="minimalist-clean-container">
          ${resumeData.basics ? getMinimalistCleanPersonalInfoHTML(resumeData.basics, resumeData?.settings) : ''}
          ${resumeData.basics?.summary ? getMinimalistCleanSummaryHTML(resumeData.basics, resumeData?.settings) : ''}
          ${resumeData.sections?.work?.items && resumeData.sections.work.items.length > 0 ? getMinimalistCleanWorkExperienceHTML(resumeData.sections.work.items, resumeData?.settings) : ''}
          ${resumeData.sections?.education?.items && resumeData.sections.education.items.length > 0 ? getMinimalistCleanEducationHTML(resumeData.sections.education.items, resumeData?.settings) : ''}
          ${resumeData.sections?.skills?.items && resumeData.sections.skills.items.length > 0 ? getMinimalistCleanSkillsHTML(resumeData.sections.skills.items, resumeData?.settings) : ''}
          ${resumeData.sections?.projects?.items && resumeData.sections.projects.items.length > 0 ? getMinimalistCleanProjectsHTML(resumeData.sections.projects.items, resumeData?.settings) : ''}
          ${resumeData.sections?.certifications?.items && resumeData.sections.certifications.items.length > 0 ? getMinimalistCleanCertificationsHTML(resumeData.sections.certifications.items, resumeData?.settings) : ''}
          ${resumeData.sections?.hobbies?.items && resumeData.sections.hobbies.items.length > 0 ? getMinimalistCleanHobbiesHTML(resumeData.sections.hobbies.items, resumeData?.settings) : ''}
          ${resumeData.sections?.strengths?.items && resumeData.sections.strengths.items.length > 0 ? getMinimalistCleanStrengthsHTML(resumeData.sections.strengths.items, resumeData?.settings) : ''}
          ${resumeData.sections?.references?.items && resumeData.sections.references.items.length > 0 ? getMinimalistCleanReferencesHTML(resumeData.sections.references.items, resumeData?.settings) : ''}
        </div>
      </body>
    </html>
  `;
};
