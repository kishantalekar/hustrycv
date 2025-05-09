import {LinkItem, ProjectItem, Section} from '@/types';
import {getSocialIcon} from '../icons';
import {getResumeStyles} from '../styles/resumeStyles';
import {renderJobDescription} from './components/description';
import {renderKeywords} from './components/keywords';
import {formatDateRange} from './utils/formatDate';

const renderProjectHeader = (name: string, links: LinkItem[]) => {
  const styles = getResumeStyles();
  return `
    <div class="flex space-between gap-4">
      <span class="text-bold">${name}</span>
      ${links.length > 0 ? ' | ' : ''}
      ${links
        .map(
          social =>
            `<span style="display: inline-flex; align-items: center; gap: 4px;">
          <a href="${social.url}" style="${
              styles.link
            }; display: inline-flex; align-items: center; gap: 4px;">
            ${getSocialIcon(social.icon)}
            ${social.label}
          </a>
        </span>`,
        )
        .join(' | ')}
    
    </div>
  `;
};

// const renderProjectDate = (startDate: string, endDate: string) => {
//   return `
//     <span class="text-regular text-muted">${startDate} - ${endDate}</span>
//   `;
// };

const renderProjectHeading = (item: ProjectItem) => {
  console.log('current', item.current);
  return `
    <div class="flex align-center space-between">
      ${renderProjectHeader(item.name, item.links)}
      ${formatDateRange(item.startDate, item.endDate, item.current)}
    </div>
  `;
};

const renderProjectItem = (item: ProjectItem, index: number) => {
  return `
  <div style="margin-bottom: 8pt;page-break-inside:avoid;">
  ${index === 0 ? '<h2 class="section-title">Projects</h2>   <hr/>' : ''} 
      ${renderProjectHeading(item)}
      ${renderJobDescription(item.description)}
      ${renderKeywords(item.keywords || [])}
    </div>
  `;
};

export const getProjectsHTML = (projects: Section<ProjectItem>) => {
  return `
    <div class="section" style="page-break-inside:auto;">
 
      <div style="page-break-inside:auto;">
        ${projects.items.map(renderProjectItem).join('')}
      </div>
    </div>
  `;
};
