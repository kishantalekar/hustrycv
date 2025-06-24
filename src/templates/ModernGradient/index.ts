
import { getCommonStyles } from '../styles/resumeStyles';
import { getModernGradientPersonalInfoHTML } from './PersonalInfoHeader';
import { getModernGradientSummaryHTML } from './SummarySection';
import { getModernGradientWorkExperienceHTML } from './WorkExperienceSection';
import { getModernGradientEducationHTML } from './EducationSection';
import { getModernGradientSkillsHTML } from './SkillsSection';
import { getModernGradientProjectsHTML } from './ProjectsSection';
import { getModernGradientCertificationsHTML } from './CertificationsSection';
import { getModernGradientHobbiesHTML } from './HobbiesSection';
import { getModernGradientStrengthsHTML } from './StrengthsSection';
import { getModernGradientReferencesHTML } from './ReferencesSection';

export const getModernGradientResumeHTML = (resumeData: Resume): string => {
  if (!resumeData) {
    return `
      <html>
        <body>
          <p>No resume data available</p>
        </body>
      </html>
    `;
  }

  let fontFamily = resumeData.settings?.font.family || 'Poppins';

  const sectionOrder = resumeData.metadata.sectionOrder;

  let sectionText = '';
  sectionOrder?.forEach(section => {
    switch (section) {
      case 'work':
        sectionText += resumeData.sections?.work?.items.length
          ? getModernGradientWorkExperienceHTML(resumeData.sections.work, resumeData?.settings)
          : '';
        break;
      case 'projects':
        sectionText += resumeData.sections?.projects?.items.length
          ? getModernGradientProjectsHTML(resumeData.sections.projects, resumeData?.settings)
          : '';
        break;
      case 'education':
        sectionText += resumeData.sections?.education?.items.length
          ? getModernGradientEducationHTML(resumeData.sections.education, resumeData?.settings)
          : '';
        break;
      case 'certifications':
        sectionText += resumeData.sections?.certifications?.items.length
          ? getModernGradientCertificationsHTML(resumeData.sections.certifications, resumeData?.settings)
          : '';
        break;
      case 'skills':
        sectionText += resumeData.sections?.skills?.items.length
          ? getModernGradientSkillsHTML(resumeData.sections.skills, resumeData?.settings)
          : '';
        break;
      case 'hobbies':
        sectionText += resumeData.sections?.hobbies?.items.length
          ? getModernGradientHobbiesHTML(resumeData.sections.hobbies, resumeData?.settings)
          : '';
        break;
      case 'strengths':
        sectionText += resumeData.sections?.strengths?.items.length
          ? getModernGradientStrengthsHTML(resumeData.sections.strengths, resumeData?.settings)
          : '';
        break;
      case 'references':
        sectionText += resumeData.sections?.references?.items.length
          ? getModernGradientReferencesHTML(resumeData.sections.references, resumeData?.settings)
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
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        <style>
          body {
            margin: 0;
            font-family: "${fontFamily}", 'Poppins', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%);
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

          .modern-gradient-container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 20pt;
            box-shadow: 0 16pt 48pt rgba(0,0,0,0.3);
            overflow: hidden;
            position: relative;
          }

          .modern-gradient-section {
            margin-bottom: 32pt;
            padding: 0 32pt;
            page-break-inside: avoid;
          }

          .modern-gradient-section-title {
            font-size: 16pt;
            font-weight: 700;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 20pt;
            text-transform: uppercase;
            letter-spacing: 2px;
            position: relative;
            padding-bottom: 8pt;
          }

          .modern-gradient-section-title::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 80pt;
            height: 4pt;
            background: linear-gradient(90deg, #667eea, #764ba2, #f093fb);
            border-radius: 2pt;
          }

          .modern-gradient-item {
            margin-bottom: 24pt;
            padding: 24pt;
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            border-radius: 16pt;
            position: relative;
            box-shadow: 0 6pt 16pt rgba(0,0,0,0.15);
          }

          .modern-gradient-item-title {
            font-size: 12pt;
            font-weight: 700;
            color: #2d3748;
            margin-bottom: 6pt;
          }

          .modern-gradient-item-subtitle {
            font-size: 10pt;
            color: #4a5568;
            margin-bottom: 8pt;
            font-weight: 600;
          }

          .modern-gradient-item-meta {
            font-size: 9pt;
            color: #718096;
            font-weight: 600;
          }

          ${getCommonStyles()}
        </style>
      </head>
      <body>
        <div class="modern-gradient-container">
          ${resumeData.basics ? getModernGradientPersonalInfoHTML(resumeData.basics, resumeData?.settings) : ''}
          ${resumeData.basics?.summary ? getModernGradientSummaryHTML(resumeData.basics, resumeData?.settings) : ''}
          ${sectionText}
        </div>
      </body>
    </html>
  `;
};
