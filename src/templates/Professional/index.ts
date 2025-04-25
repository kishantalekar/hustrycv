import {ResumeData} from '../../components/ResumePreview/ResumePreview.types';
import {getEducationHTML} from './EducationSection';
import {getPersonalInfoHTML} from './PersonalInfoHeader';
import {getProjectsHTML} from './ProjectsSection';
import {getSkillsHTML} from './SkillsSection';
import {getSummaryHTML} from './SummarySection';
import {getWorkExperienceHTML} from './WorkExperienceSection';

export const getProfessionalResumeHTML = (
  resumeData: ResumeData,
  scale: number,
): string => {
  console.log('education', resumeData?.sections?.education?.items.length);
  if (!resumeData) {
    // @ts-ignore
    return `
      <html>
        <body>
          <p>No resume data available</p>
        </body>
      </html>
    `;
  }
  // @ts-ignore
  return `
    <html>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet" />
        <style>
          body {
            margin: 0;
            font-family: 'Fira Sans', sans-serif;
            background-color: white;
          }
       @page 
            {
                size: a4 portrait;
                margin: 15pt 15pt; 
            }
        </style>
      </head>
      <body>
       <div class="a4-page">
        ${
          resumeData.basics ? getPersonalInfoHTML(resumeData.basics, scale) : ''
        }
        ${resumeData.basics?.summary ? getSummaryHTML(resumeData.basics) : ''}
        ${
          resumeData.sections?.work?.items.length
            ? getWorkExperienceHTML(resumeData.sections.work)
            : ''
        }
        ${
          resumeData.sections?.education?.items.length
            ? getEducationHTML(resumeData.sections.education)
            : ''
        }
        ${
          resumeData.sections?.skills?.items.length
            ? getSkillsHTML(resumeData.sections.skills)
            : ''
        }
        ${
          resumeData.sections?.projects?.items.length
            ? getProjectsHTML(resumeData.sections.projects)
            : ''
        }
       </div>
      </body>
    </html>
  `;
};
