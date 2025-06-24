
import { getCommonStyles } from '../styles/resumeStyles';
import { getProfessionalClassicPersonalInfoHTML } from './PersonalInfoHeader';
import { getProfessionalClassicSummaryHTML } from './SummarySection';
import { getProfessionalClassicWorkExperienceHTML } from './WorkExperienceSection';
import { getProfessionalClassicEducationHTML } from './EducationSection';
import { getProfessionalClassicSkillsHTML } from './SkillsSection';
import { getProfessionalClassicProjectsHTML } from './ProjectsSection';
import { getProfessionalClassicCertificationsHTML } from './CertificationsSection';
import { getProfessionalClassicHobbiesHTML } from './HobbiesSection';
import { getProfessionalClassicStrengthsHTML } from './StrengthsSection';
import { getProfessionalClassicReferencesHTML } from './ReferencesSection';

export const getProfessionalClassicResumeHTML = (resumeData: Resume): string => {
  if (!resumeData) {
    return `<html><body><p>No resume data available</p></body></html>`;
  }

  let fontFamily = resumeData.settings?.font.family || 'Times New Roman';

  return `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <style>
          body {
            margin: 0;
            font-family: "${fontFamily}", "Times New Roman", serif;
            background-color: #ffffff;
            color: #2d3748;
            line-height: 1.6;
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

          .professional-classic-container {
            max-width: 700px;
            margin: 0 auto;
            padding: 0;
          }

          .professional-classic-section {
            margin-bottom: 32pt;
            page-break-inside: avoid;
          }

          .professional-classic-section-title {
            font-size: 14pt;
            font-weight: 700;
            color: #2d3748;
            margin-bottom: 16pt;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            border-bottom: 2px solid #2d3748;
            padding-bottom: 8pt;
            font-family: 'Times New Roman', serif;
          }

          ${getCommonStyles()}
        </style>
      </head>
      <body>
        <div class="professional-classic-container">
          ${resumeData.basics ? getProfessionalClassicPersonalInfoHTML(resumeData.basics, resumeData?.settings) : ''}
          ${resumeData.basics?.summary ? getProfessionalClassicSummaryHTML(resumeData.basics, resumeData?.settings) : ''}
          ${resumeData.sections?.work?.visible && resumeData.sections.work.items?.length > 0 ? getProfessionalClassicWorkExperienceHTML(resumeData.sections.work.items, resumeData?.settings) : ''}
          ${resumeData.sections?.education?.visible && resumeData.sections.education.items?.length > 0 ? getProfessionalClassicEducationHTML(resumeData.sections.education.items, resumeData?.settings) : ''}
          ${resumeData.sections?.skills?.visible && resumeData.sections.skills.items?.length > 0 ? getProfessionalClassicSkillsHTML(resumeData.sections.skills.items, resumeData?.settings) : ''}
          ${resumeData.sections?.projects?.visible && resumeData.sections.projects.items?.length > 0 ? getProfessionalClassicProjectsHTML(resumeData.sections.projects.items, resumeData?.settings) : ''}
          ${resumeData.sections?.certifications?.visible && resumeData.sections.certifications.items?.length > 0 ? getProfessionalClassicCertificationsHTML(resumeData.sections.certifications.items, resumeData?.settings) : ''}
          ${resumeData.sections?.strengths?.visible && resumeData.sections.strengths.items?.length > 0 ? getProfessionalClassicStrengthsHTML(resumeData.sections.strengths.items, resumeData?.settings) : ''}
          ${resumeData.sections?.hobbies?.visible && resumeData.sections.hobbies.items?.length > 0 ? getProfessionalClassicHobbiesHTML(resumeData.sections.hobbies.items, resumeData?.settings) : ''}
          ${resumeData.sections?.references?.visible && resumeData.sections.references.items?.length > 0 ? getProfessionalClassicReferencesHTML(resumeData.sections.references.items, resumeData?.settings) : ''}
        </div>
      </body>
    </html>
  `;
};
