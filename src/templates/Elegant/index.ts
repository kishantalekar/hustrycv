
import { getCommonStyles } from '../styles/resumeStyles';
import { getElegantPersonalInfoHTML } from './PersonalInfoHeader';
import { getElegantSummaryHTML } from './SummarySection';
import { getElegantWorkExperienceHTML } from './WorkExperienceSection';
import { getElegantEducationHTML } from './EducationSection';
import { getElegantSkillsHTML } from './SkillsSection';
import { getElegantProjectsHTML } from './ProjectsSection';
import { getElegantCertificationsHTML } from './CertificationsSection';
import { getElegantHobbiesHTML } from './HobbiesSection';
import { getElegantStrengthsHTML } from './StrengthsSection';
import { getElegantReferencesHTML } from './ReferencesSection';

export const getElegantResumeHTML = (resumeData: Resume): string => {
  if (!resumeData) {
    return `
      <html>
        <body>
          <p>No resume data available</p>
        </body>
      </html>
    `;
  }

  let fontFamily = resumeData.settings?.font.family || 'Inter';

  const sectionOrder = resumeData.metadata.sectionOrder;

  let sectionText = '';
  sectionOrder?.forEach(section => {
    switch (section) {
      case 'work':
        sectionText += resumeData.sections?.work?.items.length
          ? getElegantWorkExperienceHTML(resumeData.sections.work, resumeData?.settings)
          : '';
        break;
      case 'projects':
        sectionText += resumeData.sections?.projects?.items.length
          ? getElegantProjectsHTML(resumeData.sections.projects, resumeData?.settings)
          : '';
        break;
      case 'education':
        sectionText += resumeData.sections?.education?.items.length
          ? getElegantEducationHTML(resumeData.sections.education, resumeData?.settings)
          : '';
        break;
      case 'certifications':
        sectionText += resumeData.sections?.certifications?.items.length
          ? getElegantCertificationsHTML(resumeData.sections.certifications, resumeData?.settings)
          : '';
        break;
      case 'skills':
        sectionText += resumeData.sections?.skills?.items.length
          ? getElegantSkillsHTML(resumeData.sections.skills, resumeData?.settings)
          : '';
        break;
      case 'hobbies':
        sectionText += resumeData.sections?.hobbies?.items.length
          ? getElegantHobbiesHTML(resumeData.sections.hobbies, resumeData?.settings)
          : '';
        break;
      case 'strengths':
        sectionText += resumeData.sections?.strengths?.items.length
          ? getElegantStrengthsHTML(resumeData.sections.strengths, resumeData?.settings)
          : '';
        break;
      case 'references':
        sectionText += resumeData.sections?.references?.items.length
          ? getElegantReferencesHTML(resumeData.sections.references, resumeData?.settings)
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
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        <style>
          body {
            margin: 0;
            font-family: "${fontFamily}", sans-serif;
            background-color: #FFFFFF;
            color: #1a1a1a;
            line-height: 1.6;
          }

          @page {
            size: a4 portrait;
            margin: 15mm;
          }
          
          h1, h2, h3, h4, h5, h6, p {
            margin: 0;
            padding: 0;
          }
          
          ol, ul {
            margin-top: 0;
            margin-bottom: 0;
          }

          .elegant-container {
            max-width: 800px;
            margin: 0 auto;
            padding: 0;
          }

          .elegant-section {
            margin-bottom: 32pt;
            page-break-inside: avoid;
          }

          .elegant-section-title {
            font-size: 18pt;
            font-weight: 600;
            color: #2563eb;
            margin-bottom: 8pt;
            text-transform: uppercase;
            letter-spacing: 1px;
          }

          .elegant-divider {
            height: 2px;
            background: linear-gradient(to right, #2563eb, #e2e8f0);
            margin-bottom: 16pt;
            border: none;
          }

          .elegant-subtitle {
            color: #64748b;
            font-weight: 500;
          }

          .elegant-item {
            margin-bottom: 16pt;
            padding: 16pt;
            border-left: 3px solid #e2e8f0;
            background: #f8fafc;
            border-radius: 0 8px 8px 0;
          }

          .elegant-item-title {
            font-size: 14pt;
            font-weight: 600;
            color: #1e293b;
            margin-bottom: 4pt;
          }

          .elegant-item-subtitle {
            font-size: 12pt;
            color: #475569;
            margin-bottom: 8pt;
          }

          .elegant-item-meta {
            font-size: 10pt;
            color: #64748b;
            font-style: italic;
          }

          .elegant-skills-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 16pt;
          }

          .elegant-skill-item {
            background: white;
            padding: 16pt;
            border-radius: 8px;
            border: 1px solid #e2e8f0;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          }

          .elegant-skill-name {
            font-weight: 600;
            color: #2563eb;
            margin-bottom: 8pt;
            font-size: 12pt;
          }

          .elegant-keywords {
            display: flex;
            flex-wrap: wrap;
            gap: 4pt;
          }

          .elegant-keyword {
            background: #dbeafe;
            color: #1e40af;
            padding: 2pt 8pt;
            border-radius: 12px;
            font-size: 10pt;
            font-weight: 500;
          }

          ${getCommonStyles()}
        </style>
      </head>
      <body>
        <div class="elegant-container">
          ${resumeData.basics ? getElegantPersonalInfoHTML(resumeData.basics, resumeData?.settings) : ''}
          ${resumeData.basics?.summary ? getElegantSummaryHTML(resumeData.basics, resumeData?.settings) : ''}
          ${sectionText}
        </div>
      </body>
    </html>
  `;
};
