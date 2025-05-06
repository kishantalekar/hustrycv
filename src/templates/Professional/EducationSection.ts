import { EducationItem, Section } from '@/types';
import { getResumeStyles } from '../styles/resumeStyles';
import { formatDateRange } from './utils/formatDate';

// TODO:change date from 2018-06 - 2021-02 to Sep. 2021 – Aug 2024
// TODO:add location to education schema
export const getEducationHTML = (education: Section<EducationItem>) => {
  const styles = getResumeStyles();
  return `
  <div class="section">
  <h2 class="section-title">Education</h2>
  <hr class="mb-4"/>
    ${education.items
      .map(
        (item) => `
      <div style="margin-bottom: 8pt;" class="flex flex-col gap-2">
        <div class="flex align-center space-between">
          <span class="text-bold" style="${styles.subheader}">${
          item.institution
        }</span>
       <span class="text-regular">${item.location}</span>
        </div>
        <div class="flex flex-row space-between">
         <div class="text-regular" >
        <span class="text-italic">${item.degree}</span>
          ${
            item.gpa
              ? `<span class="text-muted" styls="${styles.small}"> • GPA: ${item.gpa}</span>`
              : ''
          }
        </div>
          ${formatDateRange(item.startDate, item.endDate, item.current)}
        </div>
       
      </div>
    `,
      )
      .join('')}
  </div>
`;
};
