import {Section, WorkItem} from '@/types';
import {renderJobDescription} from './components/description';
import {renderKeywords} from './components/keywords';
import {formatDateRange} from './utils/formatDate';

const renderWorkHeader = (
  position: string,
  startDate: string,
  endDate: string,
  current: boolean,
) => {
  return `
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <span class="text-bold">${position}</span>
     ${formatDateRange(startDate, endDate, current)}
    </div>
  `;
};

const renderCompanyInfo = (company: string, location: string) => {
  return `
    <div class="text-regular flex flex-row space-between text-regular text-italic" style="margin: 4px 0;">
      <span class="text-italic">${company}</span> 
      <span>${location}</span> 
    </div>
  `;
};

const renderWorkItem = (item: WorkItem, index: number) => {
  return `
    <div style="margin-bottom: 8pt;page-break-inside:avoid;">
    ${index === 0 ? '<h2 class="section-title">Experience</h2> <hr/>' : ''}
      ${renderWorkHeader(
        item.position,
        item.startDate,
        item.endDate,
        item.current,
      )}
      ${renderCompanyInfo(item.company, item.location)}
      ${renderJobDescription(item.description)}
      ${renderKeywords(item.keywords ?? [], 'Skills')}
    </div>
  `;
};

export const getWorkExperienceHTML = (work: Section<WorkItem>) => {
  return `
  <div class="section" style="break-inside:auto;">
   
    ${work.items.map(renderWorkItem).join(' ')}
  </div>
`;
};
