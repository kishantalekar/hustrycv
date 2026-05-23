
import { getCommonStyles } from '../styles/resumeStyles';
import { getModernCreativePersonalInfoHTML } from './PersonalInfoHeader';
import { getModernCreativeSummaryHTML } from './SummarySection';
import { getModernCreativeWorkExperienceHTML } from './WorkExperienceSection';
import { getModernCreativeEducationHTML } from './EducationSection';
import { getModernCreativeSkillsHTML } from './SkillsSection';
import { getModernCreativeProjectsHTML } from './ProjectsSection';
import { getModernCreativeCertificationsHTML } from './CertificationsSection';
import { getModernCreativeHobbiesHTML } from './HobbiesSection';
import { getModernCreativeStrengthsHTML } from './StrengthsSection';
import { getModernCreativeReferencesHTML } from './ReferencesSection';

export const getModernCreativeResumeHTML = (resumeData: Resume): string => {
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
          ? getModernCreativeWorkExperienceHTML(resumeData.sections.work, resumeData?.settings)
          : '';
        break;
      case 'projects':
        sectionText += resumeData.sections?.projects?.items.length
          ? getModernCreativeProjectsHTML(resumeData.sections.projects, resumeData?.settings)
          : '';
        break;
      case 'education':
        sectionText += resumeData.sections?.education?.items.length
          ? getModernCreativeEducationHTML(resumeData.sections.education, resumeData?.settings)
          : '';
        break;
      case 'certifications':
        sectionText += resumeData.sections?.certifications?.items.length
          ? getModernCreativeCertificationsHTML(resumeData.sections.certifications, resumeData?.settings)
          : '';
        break;
      case 'skills':
        sectionText += resumeData.sections?.skills?.items.length
          ? getModernCreativeSkillsHTML(resumeData.sections.skills, resumeData?.settings)
          : '';
        break;
      case 'hobbies':
        sectionText += resumeData.sections?.hobbies?.items.length
          ? getModernCreativeHobbiesHTML(resumeData.sections.hobbies, resumeData?.settings)
          : '';
        break;
      case 'strengths':
        sectionText += resumeData.sections?.strengths?.items.length
          ? getModernCreativeStrengthsHTML(resumeData.sections.strengths, resumeData?.settings)
          : '';
        break;
      case 'references':
        sectionText += resumeData.sections?.references?.items.length
          ? getModernCreativeReferencesHTML(resumeData.sections.references, resumeData?.settings)
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
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
        <style>
          body {
            margin: 0;
            font-family: "${fontFamily}", 'Poppins', sans-serif;
            background: linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 25%, #45b7d1 50%, #96ceb4 75%, #feca57 100%);
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

          .modern-creative-container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 20pt;
            box-shadow: 0 12pt 40pt rgba(0,0,0,0.2);
            overflow: hidden;
            position: relative;
          }

          .modern-creative-section {
            margin-bottom: 32pt;
            padding: 0 32pt;
            page-break-inside: avoid;
          }

          .modern-creative-section-title {
            font-size: 16pt;
            font-weight: 700;
            color: #ff6b6b;
            margin-bottom: 20pt;
            text-transform: uppercase;
            letter-spacing: 2px;
            position: relative;
            padding-bottom: 8pt;
            background: linear-gradient(135deg, #ff6b6b, #4ecdc4);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          .modern-creative-section-title::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 60pt;
            height: 3pt;
            background: linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1);
            border-radius: 2pt;
          }

          .modern-creative-item {
            margin-bottom: 24pt;
            padding: 24pt;
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            border-radius: 16pt;
            border-left: 6pt solid #ff6b6b;
            position: relative;
            box-shadow: 0 4pt 12pt rgba(0,0,0,0.1);
          }

          .modern-creative-item-title {
            font-size: 12pt;
            font-weight: 700;
            color: #2d3748;
            margin-bottom: 6pt;
          }

          .modern-creative-item-subtitle {
            font-size: 10pt;
            color: #4a5568;
            margin-bottom: 8pt;
            font-weight: 600;
          }

          .modern-creative-item-meta {
            font-size: 9pt;
            color: #718096;
            font-weight: 600;
          }

          ${getCommonStyles()}
        </style>
      </head>
      <body>
        <div class="modern-creative-container">
          ${resumeData.basics ? getModernCreativePersonalInfoHTML(resumeData.basics, resumeData?.settings) : ''}
          ${resumeData.basics?.summary ? getModernCreativeSummaryHTML(resumeData.basics, resumeData?.settings) : ''}
          ${sectionText}
        </div>
      </body>
    </html>
  `;
};
