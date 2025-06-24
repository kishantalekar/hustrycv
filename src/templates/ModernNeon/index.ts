
import { getCommonStyles } from '../styles/resumeStyles';
import { getModernNeonPersonalInfoHTML } from './PersonalInfoHeader';
import { getModernNeonSummaryHTML } from './SummarySection';
import { getModernNeonWorkExperienceHTML } from './WorkExperienceSection';
import { getModernNeonEducationHTML } from './EducationSection';
import { getModernNeonSkillsHTML } from './SkillsSection';
import { getModernNeonProjectsHTML } from './ProjectsSection';
import { getModernNeonCertificationsHTML } from './CertificationsSection';
import { getModernNeonHobbiesHTML } from './HobbiesSection';
import { getModernNeonStrengthsHTML } from './StrengthsSection';
import { getModernNeonReferencesHTML } from './ReferencesSection';

export const getModernNeonResumeHTML = (resumeData: Resume): string => {
  if (!resumeData) {
    return `<html><body><p>No resume data available</p></body></html>`;
  }

  return `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800&display=swap" rel="stylesheet">
        <style>
          body {
            margin: 0;
            font-family: 'Orbitron', monospace;
            background: #0a0a0a;
            color: #00ffff;
            line-height: 1.6;
            min-height: 100vh;
            padding: 20pt;
            box-sizing: border-box;
          }
          .modern-neon-container {
            max-width: 800px;
            margin: 0 auto;
            background: #111111;
            border-radius: 16pt;
            box-shadow: 0 0 40pt #00ffff40, inset 0 0 40pt #00ffff10;
            border: 2pt solid #00ffff;
            overflow: hidden;
          }
          ${getCommonStyles()}
        </style>
      </head>
      <body>
        <div class="modern-neon-container">
          ${resumeData.basics ? getModernNeonPersonalInfoHTML(resumeData.basics, resumeData?.settings) : ''}
          ${resumeData.basics?.summary ? getModernNeonSummaryHTML(resumeData.basics, resumeData?.settings) : ''}
          ${resumeData.sections?.work?.items ? getModernNeonWorkExperienceHTML(resumeData.sections.work.items, resumeData?.settings) : ''}
          ${resumeData.sections?.education?.items ? getModernNeonEducationHTML(resumeData.sections.education.items, resumeData?.settings) : ''}
          ${resumeData.sections?.skills?.items ? getModernNeonSkillsHTML(resumeData.sections.skills.items, resumeData?.settings) : ''}
          ${resumeData.sections?.projects?.items ? getModernNeonProjectsHTML(resumeData.sections.projects.items, resumeData?.settings) : ''}
          ${resumeData.sections?.certifications?.items ? getModernNeonCertificationsHTML(resumeData.sections.certifications.items, resumeData?.settings) : ''}
          ${resumeData.sections?.hobbies?.items ? getModernNeonHobbiesHTML(resumeData.sections.hobbies.items, resumeData?.settings) : ''}
          ${resumeData.sections?.strengths?.items ? getModernNeonStrengthsHTML(resumeData.sections.strengths.items, resumeData?.settings) : ''}
          ${resumeData.sections?.references?.items ? getModernNeonReferencesHTML(resumeData.sections.references.items, resumeData?.settings) : ''}
        </div>
      </body>
    </html>
  `;
};
