
import { getCommonStyles } from '../styles/resumeStyles';
import { getTechnicalBluePersonalInfoHTML } from './PersonalInfoHeader';
import { getTechnicalBlueSummaryHTML } from './SummarySection';
import { getTechnicalBlueWorkExperienceHTML } from './WorkExperienceSection';
import { getTechnicalBlueEducationHTML } from './EducationSection';
import { getTechnicalBlueSkillsHTML } from './SkillsSection';
import { getTechnicalBlueProjectsHTML } from './ProjectsSection';
import { getTechnicalBlueCertificationsHTML } from './CertificationsSection';
import { getTechnicalBlueHobbiesHTML } from './HobbiesSection';
import { getTechnicalBlueStrengthsHTML } from './StrengthsSection';
import { getTechnicalBlueReferencesHTML } from './ReferencesSection';

export const getTechnicalBlueResumeHTML = (resumeData: Resume): string => {
  if (!resumeData) {
    return `<html><body><p>No resume data available</p></body></html>`;
  }

  let fontFamily = resumeData.settings?.font.family || 'Fira Code';

  const sectionOrder = resumeData.metadata.sectionOrder;

  let sectionText = '';
  sectionOrder?.forEach(section => {
    switch (section) {
      case 'work':
        sectionText += resumeData.sections?.work?.items.length
          ? getTechnicalBlueWorkExperienceHTML(resumeData.sections.work.items, resumeData?.settings)
          : '';
        break;
      case 'projects':
        sectionText += resumeData.sections?.projects?.items.length
          ? getTechnicalBlueProjectsHTML(resumeData.sections.projects.items, resumeData?.settings)
          : '';
        break;
      case 'education':
        sectionText += resumeData.sections?.education?.items.length
          ? getTechnicalBlueEducationHTML(resumeData.sections.education.items, resumeData?.settings)
          : '';
        break;
      case 'certifications':
        sectionText += resumeData.sections?.certifications?.items.length
          ? getTechnicalBlueCertificationsHTML(resumeData.sections.certifications.items, resumeData?.settings)
          : '';
        break;
      case 'skills':
        sectionText += resumeData.sections?.skills?.items.length
          ? getTechnicalBlueSkillsHTML(resumeData.sections.skills.items, resumeData?.settings)
          : '';
        break;
      case 'hobbies':
        sectionText += resumeData.sections?.hobbies?.items.length
          ? getTechnicalBlueHobbiesHTML(resumeData.sections.hobbies.items, resumeData?.settings)
          : '';
        break;
      case 'strengths':
        sectionText += resumeData.sections?.strengths?.items.length
          ? getTechnicalBlueStrengthsHTML(resumeData.sections.strengths.items, resumeData?.settings)
          : '';
        break;
      case 'references':
        sectionText += resumeData.sections?.references?.items.length
          ? getTechnicalBlueReferencesHTML(resumeData.sections.references.items, resumeData?.settings)
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
            font-family: "${fontFamily}", "Fira Code", monospace;
            background-color: #f8fafc;
            color: #1e40af;
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

          .technical-blue-container {
            max-width: 700px;
            margin: 0 auto;
            padding: 28pt;
            background: #f8fafc;
          }

          .technical-blue-section {
            margin-bottom: 32pt;
            page-break-inside: avoid;
          }

          .technical-blue-section-title {
            font-size: 13pt;
            font-weight: 600;
            color: #2563eb;
            margin-bottom: 16pt;
            font-family: 'Fira Code', monospace;
          }

          ${getCommonStyles()}
        </style>
      </head>
      <body>
        <div class="technical-blue-container">
          ${resumeData.basics ? getTechnicalBluePersonalInfoHTML(resumeData.basics, resumeData?.settings) : ''}
          ${resumeData.basics?.summary ? getTechnicalBlueSummaryHTML(resumeData.basics, resumeData?.settings) : ''}
          ${sectionText}
        </div>
      </body>
    </html>
  `;
};
