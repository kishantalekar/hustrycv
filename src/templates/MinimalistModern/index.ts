
import { getCommonStyles } from '../styles/resumeStyles';
import { getMinimalistModernPersonalInfoHTML } from './PersonalInfoHeader';
import { getMinimalistModernSummaryHTML } from './SummarySection';
import { getMinimalistModernWorkExperienceHTML } from './WorkExperienceSection';
import { getMinimalistModernEducationHTML } from './EducationSection';
import { getMinimalistModernSkillsHTML } from './SkillsSection';
import { getMinimalistModernProjectsHTML } from './ProjectsSection';
import { getMinimalistModernCertificationsHTML } from './CertificationsSection';
import { getMinimalistModernHobbiesHTML } from './HobbiesSection';
import { getMinimalistModernStrengthsHTML } from './StrengthsSection';
import { getMinimalistModernReferencesHTML } from './ReferencesSection';

export const getMinimalistModernResumeHTML = (resumeData: Resume): string => {
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
            color: #1f2937;
            line-height: 1.7;
            font-weight: 300;
          }

          @page {
            size: a4 portrait;
            margin: 25mm;
          }
          
          h1, h2, h3, h4, h5, h6, p {
            margin: 0;
            padding: 0;
          }

          .minimalist-modern-container {
            max-width: 650px;
            margin: 0 auto;
            padding: 0;
          }

          .minimalist-modern-section {
            margin-bottom: 32pt;
            page-break-inside: avoid;
          }

          .minimalist-modern-section-title {
            font-size: 12pt;
            font-weight: 400;
            color: #4f46e5;
            margin-bottom: 16pt;
            text-transform: lowercase;
            letter-spacing: 2px;
          }

          ${getCommonStyles()}
        </style>
      </head>
      <body>
        <div class="minimalist-modern-container">
          ${resumeData.basics ? getMinimalistModernPersonalInfoHTML(resumeData.basics, resumeData?.settings) : ''}
          ${resumeData.basics?.summary ? getMinimalistModernSummaryHTML(resumeData.basics, resumeData?.settings) : ''}
          ${resumeData.sections?.work?.items && resumeData.sections.work.items.length > 0 ? getMinimalistModernWorkExperienceHTML(resumeData.sections.work.items, resumeData?.settings) : ''}
          ${resumeData.sections?.education?.items && resumeData.sections.education.items.length > 0 ? getMinimalistModernEducationHTML(resumeData.sections.education.items, resumeData?.settings) : ''}
          ${resumeData.sections?.skills?.items && resumeData.sections.skills.items.length > 0 ? getMinimalistModernSkillsHTML(resumeData.sections.skills.items, resumeData?.settings) : ''}
          ${resumeData.sections?.projects?.items && resumeData.sections.projects.items.length > 0 ? getMinimalistModernProjectsHTML(resumeData.sections.projects.items, resumeData?.settings) : ''}
          ${resumeData.sections?.certifications?.items && resumeData.sections.certifications.items.length > 0 ? getMinimalistModernCertificationsHTML(resumeData.sections.certifications.items, resumeData?.settings) : ''}
          ${resumeData.sections?.hobbies?.items && resumeData.sections.hobbies.items.length > 0 ? getMinimalistModernHobbiesHTML(resumeData.sections.hobbies.items, resumeData?.settings) : ''}
          ${resumeData.sections?.strengths?.items && resumeData.sections.strengths.items.length > 0 ? getMinimalistModernStrengthsHTML(resumeData.sections.strengths.items, resumeData?.settings) : ''}
          ${resumeData.sections?.references?.items && resumeData.sections.references.items.length > 0 ? getMinimalistModernReferencesHTML(resumeData.sections.references.items, resumeData?.settings) : ''}
        </div>
      </body>
    </html>
  `;
};
