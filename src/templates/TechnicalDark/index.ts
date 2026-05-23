
import { getCommonStyles } from '../styles/resumeStyles';
import { getTechnicalDarkPersonalInfoHTML } from './PersonalInfoHeader';
import { getTechnicalDarkSummaryHTML } from './SummarySection';
import { getTechnicalDarkWorkExperienceHTML } from './WorkExperienceSection';
import { getTechnicalDarkEducationHTML } from './EducationSection';
import { getTechnicalDarkSkillsHTML } from './SkillsSection';
import { getTechnicalDarkProjectsHTML } from './ProjectsSection';
import { getTechnicalDarkCertificationsHTML } from './CertificationsSection';
import { getTechnicalDarkHobbiesHTML } from './HobbiesSection';
import { getTechnicalDarkStrengthsHTML } from './StrengthsSection';
import { getTechnicalDarkReferencesHTML } from './ReferencesSection';

export const getTechnicalDarkResumeHTML = (resumeData: Resume): string => {
  if (!resumeData) {
    return `<html><body><p>No resume data available</p></body></html>`;
  }

  let fontFamily = resumeData.settings?.font.family || 'Courier New';

  const sectionOrder = resumeData.metadata.sectionOrder;

  let sectionText = '';
  sectionOrder?.forEach(section => {
    switch (section) {
      case 'work':
        sectionText += resumeData.sections?.work?.items.length
          ? getTechnicalDarkWorkExperienceHTML(resumeData.sections.work.items, resumeData?.settings)
          : '';
        break;
      case 'projects':
        sectionText += resumeData.sections?.projects?.items.length
          ? getTechnicalDarkProjectsHTML(resumeData.sections.projects.items, resumeData?.settings)
          : '';
        break;
      case 'education':
        sectionText += resumeData.sections?.education?.items.length
          ? getTechnicalDarkEducationHTML(resumeData.sections.education.items, resumeData?.settings)
          : '';
        break;
      case 'certifications':
        sectionText += resumeData.sections?.certifications?.items.length
          ? getTechnicalDarkCertificationsHTML(resumeData.sections.certifications.items, resumeData?.settings)
          : '';
        break;
      case 'skills':
        sectionText += resumeData.sections?.skills?.items.length
          ? getTechnicalDarkSkillsHTML(resumeData.sections.skills.items, resumeData?.settings)
          : '';
        break;
      case 'hobbies':
        sectionText += resumeData.sections?.hobbies?.items.length
          ? getTechnicalDarkHobbiesHTML(resumeData.sections.hobbies.items, resumeData?.settings)
          : '';
        break;
      case 'strengths':
        sectionText += resumeData.sections?.strengths?.items.length
          ? getTechnicalDarkStrengthsHTML(resumeData.sections.strengths.items, resumeData?.settings)
          : '';
        break;
      case 'references':
        sectionText += resumeData.sections?.references?.items.length
          ? getTechnicalDarkReferencesHTML(resumeData.sections.references.items, resumeData?.settings)
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
            font-family: "${fontFamily}", "Courier New", monospace;
            background-color: #1a1a1a;
            color: #cccccc;
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

          .technical-dark-container {
            max-width: 700px;
            margin: 0 auto;
            padding: 32pt;
            background: #1a1a1a;
          }

          .technical-dark-section {
            margin-bottom: 32pt;
            page-break-inside: avoid;
          }

          .technical-dark-section-title {
            font-size: 14pt;
            font-weight: 700;
            color: #00ff88;
            margin-bottom: 16pt;
            font-family: 'Courier New', monospace;
          }

          ${getCommonStyles()}
        </style>
      </head>
      <body>
        <div class="technical-dark-container">
          ${resumeData.basics ? getTechnicalDarkPersonalInfoHTML(resumeData.basics, resumeData?.settings) : ''}
          ${resumeData.basics?.summary ? getTechnicalDarkSummaryHTML(resumeData.basics, resumeData?.settings) : ''}
          ${sectionText}
        </div>
      </body>
    </html>
  `;
};
