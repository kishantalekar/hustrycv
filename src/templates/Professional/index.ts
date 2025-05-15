import {getCommonStyles} from '../styles/resumeStyles';
import {getCertificationsHTML} from './CertificationsSection';
import {getEducationHTML} from './EducationSection';
import {getPersonalInfoHTML} from './PersonalInfoHeader';
import {getProjectsHTML} from './ProjectsSection';
import {getSkillsHTML} from './SkillsSection';
import {getSummaryHTML} from './SummarySection';
import {getWorkExperienceHTML} from './WorkExperienceSection';

export const getProfessionalResumeHTML = (resumeData: Resume): string => {
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
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
        <style>
        @font-face{
            src:url('file:///android_asset/fonts/FireSans-Regular.ttf') format('truetype');
            font-family: 'Fira Sans', sans-serif;
          }
          body {
            margin: 0;
            font-family: 'Fira Sans', sans-serif;
             background-color: #FFFFFF;
            text-color:#111111
          }

           @page{
              size: a4 portrait;
              margin: 10mm;
            }
            h1,h2, p {
            margin:0;
            padding:0;
            }
            ol,ul{
            margin-top:0;
            margin-bottom:0;
            }
        ${getCommonStyles()}
        </style>
      </head>
      <body class="body">
       <div class="a4-page">
        ${resumeData.basics ? getPersonalInfoHTML(resumeData.basics) : ''}
        ${resumeData.basics?.summary ? getSummaryHTML(resumeData.basics) : ''}
         ${
           resumeData.sections?.education?.items.length
             ? getEducationHTML(resumeData.sections.education)
             : ''
         }
        ${
          resumeData.sections?.work?.items.length
            ? getWorkExperienceHTML(resumeData.sections.work)
            : ''
        }
        ${
          resumeData.sections?.projects?.items.length
            ? getProjectsHTML(resumeData.sections.projects)
            : ''
        }
         ${
           resumeData.sections?.skills?.items.length
             ? getSkillsHTML(resumeData.sections.skills)
             : ''
         }
        ${
          resumeData.sections?.certifications?.items.length
            ? getCertificationsHTML(resumeData.sections.certifications)
            : ''
        }
       </div>
      </body>
    </html>
  `;
};
