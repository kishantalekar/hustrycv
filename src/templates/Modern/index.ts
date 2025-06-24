
import { getCommonStyles } from '../styles/resumeStyles';
import { getModernPersonalInfoHTML } from './PersonalInfoHeader';
import { getModernSummaryHTML } from './SummarySection';
import { getModernWorkExperienceHTML } from './WorkExperienceSection';
import { getModernEducationHTML } from './EducationSection';
import { getModernSkillsHTML } from './SkillsSection';
import { getModernProjectsHTML } from './ProjectsSection';
import { getModernCertificationsHTML } from './CertificationsSection';
import { getModernHobbiesHTML } from './HobbiesSection';
import { getModernStrengthsHTML } from './StrengthsSection';
import { getModernReferencesHTML } from './ReferencesSection';

export const getModernResumeHTML = (resumeData: Resume): string => {
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
          ? getModernWorkExperienceHTML(resumeData.sections.work, resumeData?.settings)
          : '';
        break;
      case 'projects':
        sectionText += resumeData.sections?.projects?.items.length
          ? getModernProjectsHTML(resumeData.sections.projects, resumeData?.settings)
          : '';
        break;
      case 'education':
        sectionText += resumeData.sections?.education?.items.length
          ? getModernEducationHTML(resumeData.sections.education, resumeData?.settings)
          : '';
        break;
      case 'certifications':
        sectionText += resumeData.sections?.certifications?.items.length
          ? getModernCertificationsHTML(resumeData.sections.certifications, resumeData?.settings)
          : '';
        break;
      case 'skills':
        sectionText += resumeData.sections?.skills?.items.length
          ? getModernSkillsHTML(resumeData.sections.skills, resumeData?.settings)
          : '';
        break;
      case 'hobbies':
        sectionText += resumeData.sections?.hobbies?.items.length
          ? getModernHobbiesHTML(resumeData.sections.hobbies, resumeData?.settings)
          : '';
        break;
      case 'strengths':
        sectionText += resumeData.sections?.strengths?.items.length
          ? getModernStrengthsHTML(resumeData.sections.strengths, resumeData?.settings)
          : '';
        break;
      case 'references':
        sectionText += resumeData.sections?.references?.items.length
          ? getModernReferencesHTML(resumeData.sections.references, resumeData?.settings)
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
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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

          .modern-container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 16pt;
            box-shadow: 0 8pt 32pt rgba(0,0,0,0.15);
            overflow: hidden;
            position: relative;
          }

          .modern-container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 6pt;
            background: linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
          }

          .modern-section {
            margin-bottom: 32pt;
            padding: 0 32pt;
            page-break-inside: avoid;
          }

          .modern-section-title {
            font-size: 14pt;
            font-weight: 600;
            color: #667eea;
            margin-bottom: 20pt;
            text-transform: uppercase;
            letter-spacing: 1px;
            position: relative;
            padding-bottom: 8pt;
          }

          .modern-section-title::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 40pt;
            height: 2pt;
            background: linear-gradient(90deg, #667eea, #764ba2);
            border-radius: 1pt;
          }

          .modern-item {
            margin-bottom: 24pt;
            padding: 20pt;
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            border-radius: 12pt;
            border-left: 4pt solid #667eea;
            position: relative;
            box-shadow: 0 2pt 8pt rgba(102, 126, 234, 0.1);
          }

          .modern-item-title {
            font-size: 12pt;
            font-weight: 600;
            color: #2d3748;
            margin-bottom: 6pt;
          }

          .modern-item-subtitle {
            font-size: 10pt;
            color: #4a5568;
            margin-bottom: 8pt;
            font-weight: 500;
          }

          .modern-item-meta {
            font-size: 9pt;
            color: #718096;
            font-weight: 500;
          }

          ${getCommonStyles()}
        </style>
      </head>
      <body>
        <div class="modern-container">
          ${resumeData.basics ? getModernPersonalInfoHTML(resumeData.basics, resumeData?.settings) : ''}
          ${resumeData.basics?.summary ? getModernSummaryHTML(resumeData.basics, resumeData?.settings) : ''}
          ${sectionText}
        </div>
      </body>
    </html>
  `;
};
