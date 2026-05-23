
import { getCommonStyles } from '../styles/resumeStyles';
import { getProfessionalModernPersonalInfoHTML } from './PersonalInfoHeader';
import { getProfessionalModernSummaryHTML } from './SummarySection';
import { getProfessionalModernWorkExperienceHTML } from './WorkExperienceSection';
import { getProfessionalModernEducationHTML } from './EducationSection';
import { getProfessionalModernSkillsHTML } from './SkillsSection';
import { getProfessionalModernProjectsHTML } from './ProjectsSection';
import { getProfessionalModernCertificationsHTML } from './CertificationsSection';
import { getProfessionalModernHobbiesHTML } from './HobbiesSection';
import { getProfessionalModernStrengthsHTML } from './StrengthsSection';
import { getProfessionalModernReferencesHTML } from './ReferencesSection';

export const getProfessionalModernResumeHTML = (resumeData: Resume): string => {
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
            background-color: #f8fafc;
            color: #2d3748;
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

          .professional-modern-container {
            max-width: 700px;
            margin: 0 auto;
            padding: 24pt;
            background: #f8fafc;
          }

          .professional-modern-section {
            margin-bottom: 32pt;
            page-break-inside: avoid;
          }

          .professional-modern-section-title {
            font-size: 14pt;
            font-weight: 600;
            color: #2d3748;
            margin-bottom: 16pt;
            padding: 12pt 0;
            border-bottom: 2pt solid #3182ce;
            position: relative;
          }

          .professional-modern-section-title::before {
            content: '';
            position: absolute;
            bottom: -2pt;
            left: 0;
            width: 40pt;
            height: 2pt;
            background: #63b3ed;
          }

          ${getCommonStyles()}
        </style>
      </head>
      <body>
        <div class="professional-modern-container">
          ${resumeData.basics ? getProfessionalModernPersonalInfoHTML(resumeData.basics, resumeData?.settings) : ''}
          ${resumeData.basics?.summary ? getProfessionalModernSummaryHTML(resumeData.basics, resumeData?.settings) : ''}
          ${resumeData.sections?.work?.visible && resumeData.sections.work.items?.length > 0 ? getProfessionalModernWorkExperienceHTML(resumeData.sections.work.items, resumeData?.settings) : ''}
          ${resumeData.sections?.education?.visible && resumeData.sections.education.items?.length > 0 ? getProfessionalModernEducationHTML(resumeData.sections.education.items, resumeData?.settings) : ''}
          ${resumeData.sections?.skills?.visible && resumeData.sections.skills.items?.length > 0 ? getProfessionalModernSkillsHTML(resumeData.sections.skills.items, resumeData?.settings) : ''}
          ${resumeData.sections?.projects?.visible && resumeData.sections.projects.items?.length > 0 ? getProfessionalModernProjectsHTML(resumeData.sections.projects.items, resumeData?.settings) : ''}
          ${resumeData.sections?.certifications?.visible && resumeData.sections.certifications.items?.length > 0 ? getProfessionalModernCertificationsHTML(resumeData.sections.certifications.items, resumeData?.settings) : ''}
          ${resumeData.sections?.strengths?.visible && resumeData.sections.strengths.items?.length > 0 ? getProfessionalModernStrengthsHTML(resumeData.sections.strengths.items, resumeData?.settings) : ''}
          ${resumeData.sections?.hobbies?.visible && resumeData.sections.hobbies.items?.length > 0 ? getProfessionalModernHobbiesHTML(resumeData.sections.hobbies.items, resumeData?.settings) : ''}
          ${resumeData.sections?.references?.visible && resumeData.sections.references.items?.length > 0 ? getProfessionalModernReferencesHTML(resumeData.sections.references.items, resumeData?.settings) : ''}
        </div>
      </body>
    </html>
  `;
};
