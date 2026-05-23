
import { getCommonStyles } from '../styles/resumeStyles';
import { getModernArtisticPersonalInfoHTML } from './PersonalInfoHeader';
import { getModernArtisticSummaryHTML } from './SummarySection';
import { getModernArtisticWorkExperienceHTML } from './WorkExperienceSection';
import { getModernArtisticEducationHTML } from './EducationSection';
import { getModernArtisticSkillsHTML } from './SkillsSection';
import { getModernArtisticProjectsHTML } from './ProjectsSection';
import { getModernArtisticCertificationsHTML } from './CertificationsSection';
import { getModernArtisticHobbiesHTML } from './HobbiesSection';
import { getModernArtisticStrengthsHTML } from './StrengthsSection';
import { getModernArtisticReferencesHTML } from './ReferencesSection';

export const getModernArtisticResumeHTML = (resumeData: Resume): string => {
  if (!resumeData) {
    return `<html><body><p>No resume data available</p></body></html>`;
  }

  return `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        <style>
          body {
            margin: 0;
            font-family: 'Comfortaa', cursive;
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57, #ff9ff3, #54a0ff);
            background-size: 400% 400%;
            animation: gradientShift 15s ease infinite;
            color: #2d3748;
            line-height: 1.6;
            min-height: 100vh;
            padding: 20pt;
            box-sizing: border-box;
          }
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .modern-artistic-container {
            max-width: 800px;
            margin: 0 auto;
            background: rgba(255,255,255,0.95);
            border-radius: 30pt;
            box-shadow: 0 20pt 60pt rgba(0,0,0,0.3);
            overflow: hidden;
            position: relative;
          }
          ${getCommonStyles()}
        </style>
      </head>
      <body>
        <div class="modern-artistic-container">
          ${resumeData.basics ? getModernArtisticPersonalInfoHTML(resumeData.basics, resumeData?.settings) : ''}
          ${resumeData.basics?.summary ? getModernArtisticSummaryHTML(resumeData.basics, resumeData?.settings) : ''}
          ${resumeData.sections?.work?.items ? getModernArtisticWorkExperienceHTML(resumeData.sections.work.items, resumeData?.settings) : ''}
          ${resumeData.sections?.education?.items ? getModernArtisticEducationHTML(resumeData.sections.education.items, resumeData?.settings) : ''}
          ${resumeData.sections?.skills?.items ? getModernArtisticSkillsHTML(resumeData.sections.skills.items, resumeData?.settings) : ''}
          ${resumeData.sections?.projects?.items ? getModernArtisticProjectsHTML(resumeData.sections.projects.items, resumeData?.settings) : ''}
          ${resumeData.sections?.certifications?.items ? getModernArtisticCertificationsHTML(resumeData.sections.certifications.items, resumeData?.settings) : ''}
          ${resumeData.sections?.hobbies?.items ? getModernArtisticHobbiesHTML(resumeData.sections.hobbies.items, resumeData?.settings) : ''}
          ${resumeData.sections?.strengths?.items ? getModernArtisticStrengthsHTML(resumeData.sections.strengths.items, resumeData?.settings) : ''}
          ${resumeData.sections?.references?.items ? getModernArtisticReferencesHTML(resumeData.sections.references.items, resumeData?.settings) : ''}
        </div>
      </body>
    </html>
  `;
};
