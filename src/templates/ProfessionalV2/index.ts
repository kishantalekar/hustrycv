
import { getCommonStyles } from '../styles/resumeStyles';
import { getProfessionalV2PersonalInfoHTML } from './PersonalInfoHeader';
import { getProfessionalV2SummaryHTML } from './SummarySection';
import { getProfessionalV2WorkExperienceHTML } from './WorkExperienceSection';
import { getProfessionalV2EducationHTML } from './EducationSection';
import { getProfessionalV2SkillsHTML } from './SkillsSection';
import { getProfessionalV2ProjectsHTML } from './ProjectsSection';
import { getProfessionalV2CertificationsHTML } from './CertificationsSection';
import { getProfessionalV2HobbiesHTML } from './HobbiesSection';
import { getProfessionalV2StrengthsHTML } from './StrengthsSection';
import { getProfessionalV2ReferencesHTML } from './ReferencesSection';

export const getProfessionalV2ResumeHTML = (resumeData: Resume): string => {
  if (!resumeData) {
    return `
      <html>
        <body>
          <p>No resume data available</p>
        </body>
      </html>
    `;
  }

  let fontFamily = resumeData.settings?.font.family || 'Georgia';

  const sectionOrder = resumeData.metadata.sectionOrder;

  let sectionText = '';
  sectionOrder?.forEach(section => {
    switch (section) {
      case 'work':
        sectionText += resumeData.sections?.work?.items.length
          ? getProfessionalV2WorkExperienceHTML(resumeData.sections.work, resumeData?.settings)
          : '';
        break;
      case 'projects':
        sectionText += resumeData.sections?.projects?.items.length
          ? getProfessionalV2ProjectsHTML(resumeData.sections.projects, resumeData?.settings)
          : '';
        break;
      case 'education':
        sectionText += resumeData.sections?.education?.items.length
          ? getProfessionalV2EducationHTML(resumeData.sections.education, resumeData?.settings)
          : '';
        break;
      case 'certifications':
        sectionText += resumeData.sections?.certifications?.items.length
          ? getProfessionalV2CertificationsHTML(resumeData.sections.certifications, resumeData?.settings)
          : '';
        break;
      case 'skills':
        sectionText += resumeData.sections?.skills?.items.length
          ? getProfessionalV2SkillsHTML(resumeData.sections.skills, resumeData?.settings)
          : '';
        break;
      case 'hobbies':
        sectionText += resumeData.sections?.hobbies?.items.length
          ? getProfessionalV2HobbiesHTML(resumeData.sections.hobbies, resumeData?.settings)
          : '';
        break;
      case 'strengths':
        sectionText += resumeData.sections?.strengths?.items.length
          ? getProfessionalV2StrengthsHTML(resumeData.sections.strengths, resumeData?.settings)
          : '';
        break;
      case 'references':
        sectionText += resumeData.sections?.references?.items.length
          ? getProfessionalV2ReferencesHTML(resumeData.sections.references, resumeData?.settings)
          : '';
        break;
    }
  });

  return `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Georgia:wght@400;700&family=Crimson+Text:wght@400;600&display=swap" rel="stylesheet">
        <style>
          body {
            margin: 0;
            font-family: "${fontFamily}", serif;
            background-color: #FFFFFF;
            color: #2c2c2c;
            line-height: 1.5;
          }

          @page {
            size: a4 portrait;
            margin: 20mm;
          }
          
          h1, h2, h3, h4, h5, h6, p {
            margin: 0;
            padding: 0;
          }
          
          ol, ul {
            margin-top: 0;
            margin-bottom: 0;
          }

          .professional-v2-container {
            max-width: 800px;
            margin: 0 auto;
            padding: 0;
          }

          .professional-v2-section {
            margin-bottom: 28pt;
            page-break-inside: avoid;
          }

          .professional-v2-section-title {
            font-size: 16pt;
            font-weight: 700;
            color: #1a365d;
            margin-bottom: 6pt;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            border-bottom: 2px solid #1a365d;
            padding-bottom: 4pt;
          }

          .professional-v2-item {
            margin-bottom: 18pt;
            padding: 0;
          }

          .professional-v2-item-title {
            font-size: 13pt;
            font-weight: 600;
            color: #1a365d;
            margin-bottom: 3pt;
          }

          .professional-v2-item-subtitle {
            font-size: 11pt;
            color: #4a5568;
            margin-bottom: 6pt;
            font-style: italic;
          }

          .professional-v2-item-meta {
            font-size: 10pt;
            color: #718096;
            font-weight: 500;
          }

          .professional-v2-skills-section {
            margin-bottom: 12pt;
          }

          .professional-v2-skill-category {
            font-weight: 600;
            color: #1a365d;
            font-size: 11pt;
          }

          .professional-v2-skill-list {
            color: #4a5568;
            font-size: 11pt;
            margin-left: 8pt;
          }

          ${getCommonStyles()}
        </style>
      </head>
      <body>
        <div class="professional-v2-container">
          ${resumeData.basics ? getProfessionalV2PersonalInfoHTML(resumeData.basics, resumeData?.settings) : ''}
          ${resumeData.basics?.summary ? getProfessionalV2SummaryHTML(resumeData.basics, resumeData?.settings) : ''}
          ${sectionText}
        </div>
      </body>
    </html>
  `;
};
