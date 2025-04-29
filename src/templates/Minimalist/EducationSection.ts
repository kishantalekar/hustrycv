import { Section } from '../../components/ResumePreview/ResumePreview.types';

export const getEducationHTML = (education: Section): string => {
  if (!education.items.length) {return '';}

  return `
    <div class="section">
      <h2 class="section-title">${education.title || 'Education'}</h2>
      ${education.items.map(item => `
        <div class="item">
          <div class="item-header">
            <div>
              <div class="item-title">${item.institution || ''}</div>
              <div class="item-subtitle">${item.studyType || ''} ${item.area ? `in ${item.area}` : ''}</div>
            </div>
            <div>
              <div class="item-date">${item.startDate || ''} - ${item.endDate || 'Present'}</div>
              <div class="item-location">${item.location || ''}</div>
            </div>
          </div>
          ${item.score ? `<div class="item-description">GPA: ${item.score}</div>` : ''}
        </div>
      `).join('')}
    </div>
  `;
};
