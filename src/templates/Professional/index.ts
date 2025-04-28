import {ResumeData} from '../../components/ResumePreview/ResumePreview.types';
import {getCommonStyles} from '../styles/resumeStyles';
import {getCertificationsHTML} from './CertificationsSection';
import {getEducationHTML} from './EducationSection';
import {getPersonalInfoHTML} from './PersonalInfoHeader';
import {getProjectsHTML} from './ProjectsSection';
import {getSkillsHTML} from './SkillsSection';
import {getSummaryHTML} from './SummarySection';
import {getWorkExperienceHTML} from './WorkExperienceSection';

export const getProfessionalResumeHTML = (resumeData: ResumeData): string => {
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
     
        <style>

        @font-face{
            src:url('file:///android_asset/fonts/FireSans-Regular.ttf') format('truetype');
            font-family: 'Fira Sans', sans-serif;

        }
          body {
            margin: 0;
            font-family: 'Fira Sans', sans-serif;
            background-color: white;
          }

       @page{
              size: a4 portrait;
              margin: 10mm;
            }
        h1,h2, p {
            margin:0;
        }
        ${getCommonStyles()}
        </style>
      </head>
      <body>
       <div class="a4-page">
        ${resumeData.basics ? getPersonalInfoHTML(resumeData.basics) : ''}
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
