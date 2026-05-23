
import { getCommonStyles } from '../styles/resumeStyles';
import { getElegantClassicPersonalInfoHTML } from './PersonalInfoHeader';
import { getElegantClassicSummaryHTML } from './SummarySection';
import { getElegantClassicWorkExperienceHTML } from './WorkExperienceSection';
import { getElegantClassicEducationHTML } from './EducationSection';
import { getElegantClassicSkillsHTML } from './SkillsSection';
import { getElegantClassicProjectsHTML } from './ProjectsSection';
import { getElegantClassicCertificationsHTML } from './CertificationsSection';
import { getElegantClassicHobbiesHTML } from './HobbiesSection';
import { getElegantClassicStrengthsHTML } from './StrengthsSection';
import { getElegantClassicReferencesHTML } from './ReferencesSection';

export const getElegantClassicResumeHTML = (resumeData: Resume): string => {
  if (!resumeData) {
    return `<html><body><p>No resume data available</p></body></html>`;
  }

  let fontFamily = resumeData.settings?.font.family || 'Georgia';

  const sectionOrder = resumeData.metadata.sectionOrder;

  let sectionText = '';
  sectionOrder?.forEach(section => {
    switch (section) {
      case 'work':
        sectionText += resumeData.sections?.work?.items.length
          ? getElegantClassicWorkExperienceHTML(resumeData.sections.work.items, resumeData?.settings)
          : '';
        break;
      case 'projects':
        sectionText += resumeData.sections?.projects?.items.length
          ? getElegantClassicProjectsHTML(resumeData.sections.projects.items, resumeData?.settings)
          : '';
        break;
      case 'education':
        sectionText += resumeData.sections?.education?.items.length
          ? getElegantClassicEducationHTML(resumeData.sections.education.items, resumeData?.settings)
          : '';
        break;
      case 'certifications':
        sectionText += resumeData.sections?.certifications?.items.length
          ? getElegantClassicCertificationsHTML(resumeData.sections.certifications.items, resumeData?.settings)
          : '';
        break;
      case 'skills':
        sectionText += resumeData.sections?.skills?.items.length
          ? getElegantClassicSkillsHTML(resumeData.sections.skills.items, resumeData?.settings)
          : '';
        break;
      case 'hobbies':
        sectionText += resumeData.sections?.hobbies?.items.length
          ? getElegantClassicHobbiesHTML(resumeData.sections.hobbies.items, resumeData?.settings)
          : '';
        break;
      case 'strengths':
        sectionText += resumeData.sections?.strengths?.items.length
          ? getElegantClassicStrengthsHTML(resumeData.sections.strengths.items, resumeData?.settings)
          : '';
        break;
      case 'references':
        sectionText += resumeData.sections?.references?.items.length
          ? getElegantClassicReferencesHTML(resumeData.sections.references.items, resumeData?.settings)
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
            font-family: "${fontFamily}", "Georgia", serif;
            background-color: #ffffff;
            color: #4a5568;
            line-height: 1.7;
            font-weight: 400;
          }

          @page {
            size: a4 portrait;
            margin: 30mm;
          }
          
          h1, h2, h3, h4, h5, h6, p {
            margin: 0;
            padding: 0;
          }

          .elegant-classic-container {
            max-width: 650px;
            margin: 0 auto;
            padding: 0;
          }

          .elegant-classic-section {
            margin-bottom: 36pt;
            page-break-inside: avoid;
          }

          .elegant-classic-section-title {
            font-size: 16pt;
            font-weight: 400;
            color: #5a67d8;
            margin-bottom: 20pt;
            font-family: 'Georgia', serif;
            text-align: center;
            letter-spacing: 2px;
            position: relative;
          }

          .elegant-classic-section-title::after {
            content: '';
            position: absolute;
            bottom: -8pt;
            left: 50%;
            transform: translateX(-50%);
            width: 80pt;
            height: 1pt;
            background: #5a67d8;
          }

          ${getCommonStyles()}
        </style>
      </head>
      <body>
        <div class="elegant-classic-container">
          ${resumeData.basics ? getElegantClassicPersonalInfoHTML(resumeData.basics, resumeData?.settings) : ''}
          ${resumeData.basics?.summary ? getElegantClassicSummaryHTML(resumeData.basics, resumeData?.settings) : ''}
          ${sectionText}
        </div>
      </body>
    </html>
  `;
};
