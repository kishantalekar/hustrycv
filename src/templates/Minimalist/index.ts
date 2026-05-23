
import { getCommonStyles } from '../styles/resumeStyles';
import { getMinimalistPersonalInfoHTML } from './PersonalInfoHeader';
import { getMinimalistSummaryHTML } from './SummarySection';
import { getMinimalistWorkExperienceHTML } from './WorkExperienceSection';
import { getMinimalistEducationHTML } from './EducationSection';
import { getMinimalistSkillsHTML } from './SkillsSection';
import { getMinimalistProjectsHTML } from './ProjectsSection';
import { getMinimalistCertificationsHTML } from './CertificationsSection';
import { getMinimalistHobbiesHTML } from './HobbiesSection';
import { getMinimalistStrengthsHTML } from './StrengthsSection';
import { getMinimalistReferencesHTML } from './ReferencesSection';

export const getMinimalistResumeHTML = (resumeData: Resume): string => {
  if (!resumeData) {
    return `
      <html>
        <body>
          <p>No resume data available</p>
        </body>
      </html>
    `;
  }

  let fontFamily = resumeData.settings?.font.family || 'Helvetica';

  const sectionOrder = resumeData.metadata.sectionOrder;

  let sectionText = '';
  sectionOrder?.forEach(section => {
    switch (section) {
      case 'work':
        sectionText += resumeData.sections?.work?.items.length
          ? getMinimalistWorkExperienceHTML(resumeData.sections.work, resumeData?.settings)
          : '';
        break;
      case 'projects':
        sectionText += resumeData.sections?.projects?.items.length
          ? getMinimalistProjectsHTML(resumeData.sections.projects, resumeData?.settings)
          : '';
        break;
      case 'education':
        sectionText += resumeData.sections?.education?.items.length
          ? getMinimalistEducationHTML(resumeData.sections.education, resumeData?.settings)
          : '';
        break;
      case 'certifications':
        sectionText += resumeData.sections?.certifications?.items.length
          ? getMinimalistCertificationsHTML(resumeData.sections.certifications, resumeData?.settings)
          : '';
        break;
      case 'skills':
        sectionText += resumeData.sections?.skills?.items.length
          ? getMinimalistSkillsHTML(resumeData.sections.skills, resumeData?.settings)
          : '';
        break;
      case 'hobbies':
        sectionText += resumeData.sections?.hobbies?.items.length
          ? getMinimalistHobbiesHTML(resumeData.sections.hobbies, resumeData?.settings)
          : '';
        break;
      case 'strengths':
        sectionText += resumeData.sections?.strengths?.items.length
          ? getMinimalistStrengthsHTML(resumeData.sections.strengths, resumeData?.settings)
          : '';
        break;
      case 'references':
        sectionText += resumeData.sections?.references?.items.length
          ? getMinimalistReferencesHTML(resumeData.sections.references, resumeData?.settings)
          : '';
        break;
    }
  });

  return `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <style>
          body {
            margin: 0;
            font-family: "${fontFamily}", "Helvetica Neue", Arial, sans-serif;
            background-color: #ffffff;
            color: #2c2c2c;
            line-height: 1.5;
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
          
          ol, ul {
            margin-top: 0;
            margin-bottom: 0;
          }

          .minimalist-container {
            max-width: 700px;
            margin: 0 auto;
            padding: 0;
          }

          .minimalist-section {
            margin-bottom: 40pt;
            page-break-inside: avoid;
          }

          .minimalist-section-title {
            font-size: 12pt;
            font-weight: 400;
            color: #2c2c2c;
            margin-bottom: 16pt;
            text-transform: lowercase;
            letter-spacing: 2px;
            border-bottom: 1px solid #e0e0e0;
            padding-bottom: 8pt;
          }

          .minimalist-item {
            margin-bottom: 24pt;
            padding: 0;
          }

          .minimalist-item-title {
            font-size: 11pt;
            font-weight: 400;
            color: #2c2c2c;
            margin-bottom: 4pt;
          }

          .minimalist-item-subtitle {
            font-size: 10pt;
            color: #666666;
            margin-bottom: 8pt;
            font-weight: 300;
          }

          .minimalist-item-meta {
            font-size: 9pt;
            color: #999999;
            font-weight: 300;
          }

          ${getCommonStyles()}
        </style>
      </head>
      <body>
        <div class="minimalist-container">
          ${resumeData.basics ? getMinimalistPersonalInfoHTML(resumeData.basics, resumeData?.settings) : ''}
          ${resumeData.basics?.summary ? getMinimalistSummaryHTML(resumeData.basics, resumeData?.settings) : ''}
          ${sectionText}
        </div>
      </body>
    </html>
  `;
};
