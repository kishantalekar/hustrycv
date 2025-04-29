import { Section } from '../../components/ResumePreview/ResumePreview.types';

export const getEducationHTML = (education: Section): string => {
  if (!education.items.length) {return '';}

  return `
    <div class="section">
      <h2 class="section-title">${education.title || 'Education'}</h2>
      ${education.items
        .map(
          (item) => `
        <div class="education-item">
          <div class="education-header">
            <div class="education-degree">${item.studyType || ''} ${
            item.area ? `in ${item.area}` : ''
          }</div>
            <div class="education-date">${item.startDate || ''} - ${
            item.endDate || 'Present'
          }</div>
          </div>
          <div class="education-institution">${item.institution || ''} ${
            item.location ? `• ${item.location}` : ''
          }</div>
          ${
            item.score
              ? `<div class="education-description">GPA: ${item.score}</div>`
              : ''
          }
          ${
            item.courses && item.courses.length
              ? `
            <div class="education-description">
              <strong>Relevant Coursework:</strong> ${item.courses.join(', ')}
            </div>
          `
              : ''
          }
        </div>
      `,
        )
        .join('')}
    </div>
  `;
};
