
import { getCommonStyles } from '../styles/resumeStyles';
import { getTechnicalMinimalPersonalInfoHTML } from './PersonalInfoHeader';
import { getTechnicalMinimalSummaryHTML } from './SummarySection';
import { getTechnicalMinimalWorkExperienceHTML } from './WorkExperienceSection';
import { getTechnicalMinimalEducationHTML } from './EducationSection';
import { getTechnicalMinimalSkillsHTML } from './SkillsSection';
import { getTechnicalMinimalProjectsHTML } from './ProjectsSection';
import { getTechnicalMinimalCertificationsHTML } from './CertificationsSection';
import { getTechnicalMinimalHobbiesHTML } from './HobbiesSection';
import { getTechnicalMinimalStrengthsHTML } from './StrengthsSection';
import { getTechnicalMinimalReferencesHTML } from './ReferencesSection';

export const getTechnicalMinimalResumeHTML = (resumeData: Resume): string => {
  if (!resumeData) {
    return `<html><body><p>No resume data available</p></body></html>`;
  }

  let fontFamily = resumeData.settings?.font.family || 'Monaco';

  const sectionOrder = resumeData.metadata.sectionOrder;

  let sectionText = '';
  sectionOrder?.forEach(section => {
    switch (section) {
      case 'work':
        sectionText += resumeData.sections?.work?.items.length
          ? getTechnicalMinimalWorkExperienceHTML(resumeData.sections.work.items, resumeData?.settings)
          : '';
        break;
      case 'projects':
        sectionText += resumeData.sections?.projects?.items.length
          ? getTechnicalMinimalProjectsHTML(resumeData.sections.projects.items, resumeData?.settings)
          : '';
        break;
      case 'education':
        sectionText += resumeData.sections?.education?.items.length
          ? getTechnicalMinimalEducationHTML(resumeData.sections.education.items, resumeData?.settings)
          : '';
        break;
      case 'certifications':
        sectionText += resumeData.sections?.certifications?.items.length
          ? getTechnicalMinimalCertificationsHTML(resumeData.sections.certifications.items, resumeData?.settings)
          : '';
        break;
      case 'skills':
        sectionText += resumeData.sections?.skills?.items.length
          ? getTechnicalMinimalSkillsHTML(resumeData.sections.skills.items, resumeData?.settings)
          : '';
        break;
      case 'hobbies':
        sectionText += resumeData.sections?.hobbies?.items.length
          ? getTechnicalMinimalHobbiesHTML(resumeData.sections.hobbies.items, resumeData?.settings)
          : '';
        break;
      case 'strengths':
        sectionText += resumeData.sections?.strengths?.items.length
          ? getTechnicalMinimalStrengthsHTML(resumeData.sections.strengths.items, resumeData?.settings)
          : '';
        break;
      case 'references':
        sectionText += resumeData.sections?.references?.items.length
          ? getTechnicalMinimalReferencesHTML(resumeData.sections.references.items, resumeData?.settings)
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
            font-family: "${fontFamily}", "Monaco", monospace;
            background-color: #ffffff;
            color: #374151;
            line-height: 1.7;
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

          .technical-minimal-container {
            max-width: 650px;
            margin: 0 auto;
            padding: 0;
          }

          .technical-minimal-section {
            margin-bottom: 32pt;
            page-break-inside: avoid;
          }

          .technical-minimal-section-title {
            font-size: 12pt;
            font-weight: 400;
            color: #374151;
            margin-bottom: 16pt;
            font-family: 'Monaco', monospace;
          }

          ${getCommonStyles()}
        </style>
      </head>
      <body>
        <div class="technical-minimal-container">
          ${resumeData.basics ? getTechnicalMinimalPersonalInfoHTML(resumeData.basics, resumeData?.settings) : ''}
          ${resumeData.basics?.summary ? getTechnicalMinimalSummaryHTML(resumeData.basics, resumeData?.settings) : ''}
          ${sectionText}
        </div>
      </body>
    </html>
  `;
};
