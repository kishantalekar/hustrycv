import {getCommonStyles} from '../styles/resumeStyles';
import {getCertificationsHTML} from './CertificationsSection';
import {getEducationHTML} from './EducationSection';
import {getHobbieHTML} from './hobbieSection';
import {getPersonalInfoHTML} from './PersonalInfoHeader';
import {getProjectsHTML} from './ProjectsSection';
import {getReferencesHTML} from './referencesSection';
import {getSkillsHTML} from './SkillsSection';
import {getStrengthsHTML} from './strengthsSection';
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

  let fontFamily = '';
  try {
    fontFamily = resumeData.settings?.font.family;
  } catch (error) {}

  if (!fontFamily) {
    fontFamily = 'Fira Sans';
  }

  const sectionOrder = resumeData.metadata.sectionOrder;

  let sectionText = '';
  sectionOrder?.forEach(section => {
    switch (section) {
      case 'work':
        sectionText += ` ${
          resumeData.sections?.work?.items.length
            ? getWorkExperienceHTML(
                resumeData.sections.work,
                resumeData?.settings,
              )
            : ''
        }`;
        break;
      case 'projects':
        sectionText += `  ${
          resumeData.sections?.projects?.items.length
            ? getProjectsHTML(
                resumeData.sections.projects,
                resumeData?.settings,
              )
            : ''
        }`;
        break;
      case 'education':
        sectionText += ` ${
          resumeData.sections?.education?.items.length
            ? getEducationHTML(
                resumeData.sections.education,
                resumeData?.settings,
              )
            : ''
        }`;
        break;
      case 'certifications':
        sectionText += `  ${
          resumeData.sections?.certifications?.items.length
            ? getCertificationsHTML(
                resumeData.sections.certifications,
                resumeData?.settings,
              )
            : ''
        }`;
        break;
      case 'skills':
        sectionText += `${
          resumeData.sections?.skills?.items.length
            ? getSkillsHTML(resumeData.sections.skills, resumeData?.settings)
            : ''
        }`;
        break;
      case 'hobbies':
        sectionText += ` ${
          resumeData.sections?.hobbies?.items.length
            ? getHobbieHTML(resumeData.sections.hobbies, resumeData?.settings)
            : ''
        }
        `;
        break;
      case 'references':
        sectionText += ` ${resumeData.sections?.references?.items.length ? getReferencesHTML(resumeData.sections.references, resumeData?.settings) : ''}`;
        break;
      case 'strengths':
        sectionText += ` ${resumeData.sections?.strengths?.items.length ? getStrengthsHTML(resumeData.sections.strengths, resumeData?.settings) : ''}`;
        break;
    }
  });

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
            font-family: "${fontFamily}, "sans-serif";
             background-color: #FFFFFF;
            text-color:#111111
          }

           @page{
              size: a4 portrait;
              margin: 10mm;
            }
            h1,h2,h3,h4,h5,h6, p {
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
        ${
          resumeData.basics
            ? getPersonalInfoHTML(resumeData.basics, resumeData?.settings)
            : ''
        }
        ${
          resumeData.basics?.summary
            ? getSummaryHTML(resumeData.basics, resumeData?.settings)
            : ''
        }
        
       ${sectionText}
       </div>
      </body>
    </html>
  `;
};
