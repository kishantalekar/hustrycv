
import { getCommonStyles } from '../styles/resumeStyles';
import { getModernGlassPersonalInfoHTML } from './PersonalInfoHeader';
import { getModernGlassSummaryHTML } from './SummarySection';
import { getModernGlassWorkExperienceHTML } from './WorkExperienceSection';
import { getModernGlassEducationHTML } from './EducationSection';
import { getModernGlassSkillsHTML } from './SkillsSection';
import { getModernGlassProjectsHTML } from './ProjectsSection';
import { getModernGlassCertificationsHTML } from './CertificationsSection';
import { getModernGlassHobbiesHTML } from './HobbiesSection';
import { getModernGlassStrengthsHTML } from './StrengthsSection';
import { getModernGlassReferencesHTML } from './ReferencesSection';

export const getModernGlassResumeHTML = (resumeData: Resume): string => {
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

          .modern-glass-container {
            max-width: 800px;
            margin: 0 auto;
            background: rgba(255,255,255,0.25);
            backdrop-filter: blur(20pt);
            -webkit-backdrop-filter: blur(20pt);
            border-radius: 20pt;
            box-shadow: 0 16pt 40pt rgba(0,0,0,0.2);
            border: 1pt solid rgba(255,255,255,0.3);
            overflow: hidden;
          }

          .modern-glass-section {
            margin-bottom: 32pt;
            padding: 0 32pt;
            page-break-inside: avoid;
          }

          .modern-glass-section-title {
            font-size: 16pt;
            font-weight: 600;
            color: #1a365d;
            margin-bottom: 20pt;
            text-transform: uppercase;
            letter-spacing: 1pt;
          }

          ${getCommonStyles()}
        </style>
      </head>
      <body>
        <div class="modern-glass-container">
          ${resumeData.basics ? getModernGlassPersonalInfoHTML(resumeData.basics, resumeData?.settings) : ''}
          ${resumeData.basics?.summary ? getModernGlassSummaryHTML(resumeData.basics, resumeData?.settings) : ''}
          ${resumeData.sections?.work?.items ? getModernGlassWorkExperienceHTML(resumeData.sections.work.items, resumeData?.settings) : ''}
          ${resumeData.sections?.education?.items ? getModernGlassEducationHTML(resumeData.sections.education.items, resumeData?.settings) : ''}
          ${resumeData.sections?.skills?.items ? getModernGlassSkillsHTML(resumeData.sections.skills.items, resumeData?.settings) : ''}
          ${resumeData.sections?.projects?.items ? getModernGlassProjectsHTML(resumeData.sections.projects.items, resumeData?.settings) : ''}
          ${resumeData.sections?.certifications?.items ? getModernGlassCertificationsHTML(resumeData.sections.certifications.items, resumeData?.settings) : ''}
          ${resumeData.sections?.hobbies?.items ? getModernGlassHobbiesHTML(resumeData.sections.hobbies.items, resumeData?.settings) : ''}
          ${resumeData.sections?.strengths?.items ? getModernGlassStrengthsHTML(resumeData.sections.strengths.items, resumeData?.settings) : ''}
          ${resumeData.sections?.references?.items ? getModernGlassReferencesHTML(resumeData.sections.references.items, resumeData?.settings) : ''}
        </div>
      </body>
    </html>
  `;
};
