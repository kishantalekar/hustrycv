
import { getCommonStyles } from '../styles/resumeStyles';
import { getTechnicalPersonalInfoHTML } from './PersonalInfoHeader';
import { getTechnicalSummaryHTML } from './SummarySection';
import { getTechnicalWorkExperienceHTML } from './WorkExperienceSection';
import { getTechnicalEducationHTML } from './EducationSection';
import { getTechnicalSkillsHTML } from './SkillsSection';
import { getTechnicalProjectsHTML } from './ProjectsSection';
import { getTechnicalCertificationsHTML } from './CertificationsSection';
import { getTechnicalHobbiesHTML } from './HobbiesSection';
import { getTechnicalStrengthsHTML } from './StrengthsSection';
import { getTechnicalReferencesHTML } from './ReferencesSection';

export const getTechnicalResumeHTML = (resumeData: Resume): string => {
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
          ? getTechnicalWorkExperienceHTML(resumeData.sections.work, resumeData?.settings)
          : '';
        break;
      case 'projects':
        sectionText += resumeData.sections?.projects?.items.length
          ? getTechnicalProjectsHTML(resumeData.sections.projects, resumeData?.settings)
          : '';
        break;
      case 'education':
        sectionText += resumeData.sections?.education?.items.length
          ? getTechnicalEducationHTML(resumeData.sections.education, resumeData?.settings)
          : '';
        break;
      case 'certifications':
        sectionText += resumeData.sections?.certifications?.items.length
          ? getTechnicalCertificationsHTML(resumeData.sections.certifications, resumeData?.settings)
          : '';
        break;
      case 'skills':
        sectionText += resumeData.sections?.skills?.items.length
          ? getTechnicalSkillsHTML(resumeData.sections.skills, resumeData?.settings)
          : '';
        break;
      case 'hobbies':
        sectionText += resumeData.sections?.hobbies?.items.length
          ? getTechnicalHobbiesHTML(resumeData.sections.hobbies, resumeData?.settings)
          : '';
        break;
      case 'strengths':
        sectionText += resumeData.sections?.strengths?.items.length
          ? getTechnicalStrengthsHTML(resumeData.sections.strengths, resumeData?.settings)
          : '';
        break;
      case 'references':
        sectionText += resumeData.sections?.references?.items.length
          ? getTechnicalReferencesHTML(resumeData.sections.references, resumeData?.settings)
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
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
        <style>
          body {
            margin: 0;
            font-family: "${fontFamily}", 'Inter', sans-serif;
            background-color: #fafafa;
            color: #1f2937;
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

          .technical-container {
            max-width: 800px;
            margin: 0 auto;
            padding: 0;
            background: white;
            border-radius: 8px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            overflow: hidden;
          }

          .technical-section {
            margin-bottom: 32pt;
            padding: 0 24pt;
            page-break-inside: avoid;
          }

          .technical-section-title {
            font-size: 14pt;
            font-weight: 600;
            color: #059669;
            margin-bottom: 16pt;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            position: relative;
            padding-left: 12pt;
          }

          .technical-section-title::before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 4pt;
            height: 16pt;
            background: linear-gradient(to bottom, #059669, #10b981);
            border-radius: 2pt;
          }

          .technical-item {
            margin-bottom: 20pt;
            padding: 16pt;
            background: #f8fafc;
            border-left: 3px solid #e5e7eb;
            border-radius: 0 6pt 6pt 0;
          }

          .technical-item-title {
            font-size: 12pt;
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 4pt;
          }

          .technical-item-subtitle {
            font-size: 10pt;
            color: #6b7280;
            margin-bottom: 8pt;
            font-family: 'JetBrains Mono', monospace;
          }

          .technical-item-meta {
            font-size: 9pt;
            color: #9ca3af;
            font-weight: 500;
          }

          ${getCommonStyles()}
        </style>
      </head>
      <body>
        <div class="technical-container">
          ${resumeData.basics ? getTechnicalPersonalInfoHTML(resumeData.basics, resumeData?.settings) : ''}
          ${resumeData.basics?.summary ? getTechnicalSummaryHTML(resumeData.basics, resumeData?.settings) : ''}
          ${sectionText}
        </div>
      </body>
    </html>
  `;
};
