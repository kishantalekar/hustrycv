
import { getCommonStyles } from '../styles/resumeStyles';
import { getElegantModernPersonalInfoHTML } from './PersonalInfoHeader';
import { getElegantModernSummaryHTML } from './SummarySection';
import { getElegantModernWorkExperienceHTML } from './WorkExperienceSection';
import { getElegantModernEducationHTML } from './EducationSection';
import { getElegantModernSkillsHTML } from './SkillsSection';
import { getElegantModernProjectsHTML } from './ProjectsSection';
import { getElegantModernCertificationsHTML } from './CertificationsSection';
import { getElegantModernHobbiesHTML } from './HobbiesSection';
import { getElegantModernStrengthsHTML } from './StrengthsSection';
import { getElegantModernReferencesHTML } from './ReferencesSection';

export const getElegantModernResumeHTML = (resumeData: Resume): string => {
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
          ? getElegantModernWorkExperienceHTML(resumeData.sections.work.items, resumeData?.settings)
          : '';
        break;
      case 'projects':
        sectionText += resumeData.sections?.projects?.items.length
          ? getElegantModernProjectsHTML(resumeData.sections.projects.items, resumeData?.settings)
          : '';
        break;
      case 'education':
        sectionText += resumeData.sections?.education?.items.length
          ? getElegantModernEducationHTML(resumeData.sections.education.items, resumeData?.settings)
          : '';
        break;
      case 'certifications':
        sectionText += resumeData.sections?.certifications?.items.length
          ? getElegantModernCertificationsHTML(resumeData.sections.certifications.items, resumeData?.settings)
          : '';
        break;
      case 'skills':
        sectionText += resumeData.sections?.skills?.items.length
          ? getElegantModernSkillsHTML(resumeData.sections.skills.items, resumeData?.settings)
          : '';
        break;
      case 'hobbies':
        sectionText += resumeData.sections?.hobbies?.items.length
          ? getElegantModernHobbiesHTML(resumeData.sections.hobbies.items, resumeData?.settings)
          : '';
        break;
      case 'strengths':
        sectionText += resumeData.sections?.strengths?.items.length
          ? getElegantModernStrengthsHTML(resumeData.sections.strengths.items, resumeData?.settings)
          : '';
        break;
      case 'references':
        sectionText += resumeData.sections?.references?.items.length
          ? getElegantModernReferencesHTML(resumeData.sections.references.items, resumeData?.settings)
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
            line-height: 1.6;
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

          .elegant-modern-container {
            max-width: 700px;
            margin: 0 auto;
            padding: 24pt;
            background: white;
          }

          .elegant-modern-section {
            margin-bottom: 32pt;
            page-break-inside: avoid;
          }

          .elegant-modern-section-title {
            font-size: 14pt;
            font-weight: 400;
            color: #667eea;
            margin-bottom: 20pt;
            text-align: center;
            letter-spacing: 2px;
            position: relative;
          }

          .elegant-modern-section-title::before,
          .elegant-modern-section-title::after {
            content: '';
            position: absolute;
            top: 50%;
            width: 60pt;
            height: 1pt;
            background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
          }

          .elegant-modern-section-title::before {
            left: -80pt;
          }

          .elegant-modern-section-title::after {
            right: -80pt;
          }

          ${getCommonStyles()}
        </style>
      </head>
      <body>
        <div class="elegant-modern-container">
          ${resumeData.basics ? getElegantModernPersonalInfoHTML(resumeData.basics, resumeData?.settings) : ''}
          ${resumeData.basics?.summary ? getElegantModernSummaryHTML(resumeData.basics, resumeData?.settings) : ''}
          ${sectionText}
        </div>
      </body>
    </html>
  `;
};
