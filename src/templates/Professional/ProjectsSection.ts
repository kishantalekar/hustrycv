import {Project} from '@/components/ResumePreview/ResumePreview.types';
import {githubIcon} from '../icons/icons';
// TODO: add skills in project section and dates in project section
export const getProjectsHTML = (projects: any) => {
  const projectItem = (item: Project) => {
    return `
     <div style="margin-bottom: 8pt;">
    <!--heading -->
      <div class="flex align-center space-between">
      <div class="flex space-between gap-4">
           <span class="text-bold">${item.name}</span>
            <a href="${
              item.url
            }" style="color: #000; text-decoration: none;" class="text-regular">
              ${githubIcon}
            </a>
         <span class="text-muted">|</span>
            <span class="text-italic text-muted">Flutter, Appwrite </span>
          </div>
          <span class="text-regular text-muted">June 2024 - Aug 2024</span>
        </div>
    <!-- heading end-->
     <!--Description-->
            ${
              item.description &&
              `  <div class="text-regular text-muted " style="margin: 2pt 0;">
            ${item.description}
          </div>`
            }
        
    <!--Description end-->
    <!--Highlights-->
          <ul style="margin: 2pt 0; padding-left: 14pt;">
            ${
              item?.highlights
                ? item.highlights
                    .map(
                      (highlight: string) => `
              <li class="bulleted-point" style=";"><span class="text-regular">${highlight}</span></li>
            `,
                    )
                    .join('')
                : ''
            }
          </ul>
      <!--Highlights end-->
        </div>
    `;
  };

  return `
    <div class="section">
      <h2 class="section-title">Projects</h2>
      <hr/>
    <div >
      ${projects.items
        .map(
          (item: any) => `
        ${projectItem(item)}
      `,
        )
        .join('')}
    </div>
    </div>
  `;
};
