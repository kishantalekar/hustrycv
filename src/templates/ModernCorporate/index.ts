
import { getCommonStyles } from '../styles/resumeStyles';
import { getModernCorporatePersonalInfoHTML } from './PersonalInfoHeader';
import { getModernCorporateSummaryHTML } from './SummarySection';
import { getModernCorporateWorkExperienceHTML } from './WorkExperienceSection';
import { getModernCorporateEducationHTML } from './EducationSection';
import { getModernCorporateSkillsHTML } from './SkillsSection';
import { getModernCorporateProjectsHTML } from './ProjectsSection';
import { getModernCorporateCertificationsHTML } from './CertificationsSection';
import { getModernCorporateHobbiesHTML } from './HobbiesSection';
import { getModernCorporateStrengthsHTML } from './StrengthsSection';
import { getModernCorporateReferencesHTML } from './ReferencesSection';

export const getModernCorporateResumeHTML = (resumeData: Resume): string => {
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
          ? getModernCorporateWorkExperienceHTML(resumeData.sections.work, resumeData?.settings)
          : '';
        break;
      case 'projects':
        sectionText += resumeData.sections?.projects?.items.length
          ? getModernCorporateProjectsHTML(resumeData.sections.projects, resumeData?.settings)
          : '';
        break;
      case 'education':
        sectionText += resumeData.sections?.education?.items.length
          ? getModernCorporateEducationHTML(resumeData.sections.education, resumeData?.settings)
          : '';
        break;
      case 'certifications':
        sectionText += resumeData.sections?.certifications?.items.length
          ? getModernCorporateCertificationsHTML(resumeData.sections.certifications, resumeData?.settings)
          : '';
        break;
      case 'skills':
        sectionText += resumeData.sections?.skills?.items.length
          ? getModernCorporateSkillsHTML(resumeData.sections.skills, resumeData?.settings)
          : '';
        break;
      case 'hobbies':
        sectionText += resumeData.sections?.hobbies?.items.length
          ? getModernCorporateHobbiesHTML(resumeData.sections.hobbies, resumeData?.settings)
          : '';
        break;
      case 'strengths':
        sectionText += resumeData.sections?.strengths?.items.length
          ? getModernCorporateStrengthsHTML(resumeData.sections.strengths, resumeData?.settings)
          : '';
        break;
      case 'references':
        sectionText += resumeData.sections?.references?.items.length
          ? getModernCorporateReferencesHTML(resumeData.sections.references, resumeData?.settings)
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
            font-family: "${fontFamily}", 'Inter', sans-serif;
            background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
            color: #2d3748;
            line-height: 1.6;
            min-height: 100vh;
            padding: 20pt;
            box-sizing: border-box;
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

          .modern-corporate-container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 8pt;
            box-shadow: 0 8pt 24pt rgba(0,0,0,0.1);
            overflow: hidden;
            border: 1pt solid #e2e8f0;
          }

          .modern-corporate-section {
            margin-bottom: 32pt;
            padding: 0 32pt;
            page-break-inside: avoid;
          }

          .modern-corporate-section-title {
            font-size: 14pt;
            font-weight: 600;
            color: #1a365d;
            margin-bottom: 20pt;
            text-transform: uppercase;
            letter-spacing: 1px;
            position: relative;
            padding-bottom: 8pt;
          }

          .modern-corporate-section-title::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 50pt;
            height: 2pt;
            background: linear-gradient(90deg, #3182ce, #2c5282);
            border-radius: 1pt;
          }

          .modern-corporate-item {
            margin-bottom: 24pt;
            padding: 20pt;
            background: #f7fafc;
            border-radius: 6pt;
            border-left: 4pt solid #3182ce;
            box-shadow: 0 2pt 4pt rgba(0,0,0,0.05);
          }

          .modern-corporate-item-title {
            font-size: 12pt;
            font-weight: 600;
            color: #1a365d;
            margin-bottom: 6pt;
          }

          .modern-corporate-item-subtitle {
            font-size: 10pt;
            color: #4a5568;
            margin-bottom: 8pt;
            font-weight: 500;
          }

          .modern-corporate-item-meta {
            font-size: 9pt;
            color: #718096;
            font-weight: 500;
          }

          ${getCommonStyles()}
        </style>
      </head>
      <body>
        <div class="modern-corporate-container">
          ${resumeData.basics ? getModernCorporatePersonalInfoHTML(resumeData.basics, resumeData?.settings) : ''}
          ${resumeData.basics?.summary ? getModernCorporateSummaryHTML(resumeData.basics, resumeData?.settings) : ''}
          ${sectionText}
        </div>
      </body>
    </html>
  `;
};
