
import { getCommonStyles } from '../styles/resumeStyles';
import { getElegantMinimalPersonalInfoHTML } from './PersonalInfoHeader';
import { getElegantMinimalSummaryHTML } from './SummarySection';
import { getElegantMinimalWorkExperienceHTML } from './WorkExperienceSection';
import { getElegantMinimalEducationHTML } from './EducationSection';
import { getElegantMinimalSkillsHTML } from './SkillsSection';
import { getElegantMinimalProjectsHTML } from './ProjectsSection';
import { getElegantMinimalCertificationsHTML } from './CertificationsSection';
import { getElegantMinimalHobbiesHTML } from './HobbiesSection';
import { getElegantMinimalStrengthsHTML } from './StrengthsSection';
import { getElegantMinimalReferencesHTML } from './ReferencesSection';

export const getElegantMinimalResumeHTML = (resumeData: Resume): string => {
  if (!resumeData) {
    return `<html><body><p>No resume data available</p></body></html>`;
  }

  let fontFamily = resumeData.settings?.font.family || 'Helvetica';

  const sectionOrder = resumeData.metadata.sectionOrder;

  let sectionText = '';
  sectionOrder?.forEach(section => {
    switch (section) {
      case 'work':
        sectionText += resumeData.sections?.work?.items.length
          ? getElegantMinimalWorkExperienceHTML(resumeData.sections.work.items, resumeData?.settings)
          : '';
        break;
      case 'projects':
        sectionText += resumeData.sections?.projects?.items.length
          ? getElegantMinimalProjectsHTML(resumeData.sections.projects.items, resumeData?.settings)
          : '';
        break;
      case 'education':
        sectionText += resumeData.sections?.education?.items.length
          ? getElegantMinimalEducationHTML(resumeData.sections.education.items, resumeData?.settings)
          : '';
        break;
      case 'certifications':
        sectionText += resumeData.sections?.certifications?.items.length
          ? getElegantMinimalCertificationsHTML(resumeData.sections.certifications.items, resumeData?.settings)
          : '';
        break;
      case 'skills':
        sectionText += resumeData.sections?.skills?.items.length
          ? getElegantMinimalSkillsHTML(resumeData.sections.skills.items, resumeData?.settings)
          : '';
        break;
      case 'hobbies':
        sectionText += resumeData.sections?.hobbies?.items.length
          ? getElegantMinimalHobbiesHTML(resumeData.sections.hobbies.items, resumeData?.settings)
          : '';
        break;
      case 'strengths':
        sectionText += resumeData.sections?.strengths?.items.length
          ? getElegantMinimalStrengthsHTML(resumeData.sections.strengths.items, resumeData?.settings)
          : '';
        break;
      case 'references':
        sectionText += resumeData.sections?.references?.items.length
          ? getElegantMinimalReferencesHTML(resumeData.sections.references.items, resumeData?.settings)
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
            color: #4a5568;
            line-height: 1.8;
            font-weight: 300;
          }

          @page {
            size: a4 portrait;
            margin: 30mm;
          }
          
          h1, h2, h3, h4, h5, h6, p {
            margin: 0;
            padding: 0;
          }

          .elegant-minimal-container {
            max-width: 650px;
            margin: 0 auto;
            padding: 0;
          }

          .elegant-minimal-section {
            margin-bottom: 36pt;
            page-break-inside: avoid;
          }

          .elegant-minimal-section-title {
            font-size: 12pt;
            font-weight: 300;
            color: #2d3748;
            margin-bottom: 20pt;
            text-transform: lowercase;
            letter-spacing: 4px;
          }

          ${getCommonStyles()}
        </style>
      </head>
      <body>
        <div class="elegant-minimal-container">
          ${resumeData.basics ? getElegantMinimalPersonalInfoHTML(resumeData.basics, resumeData?.settings) : ''}
          ${resumeData.basics?.summary ? getElegantMinimalSummaryHTML(resumeData.basics, resumeData?.settings) : ''}
          ${sectionText}
        </div>
      </body>
    </html>
  `;
};
