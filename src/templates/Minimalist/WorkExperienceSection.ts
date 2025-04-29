import { Section } from '../../components/ResumePreview/ResumePreview.types';

export const getWorkExperienceHTML = (work: Section): string => {
  if (!work.items.length) {return '';}

  return `
    <div class="section">
      <h2 class="section-title">${work.title || 'Work Experience'}</h2>
      ${work.items.map(item => `
        <div class="item">
          <div class="item-header">
            <div>
              <div class="item-title">${item.name || ''}</div>
              <div class="item-subtitle">${item.position || ''}</div>
            </div>
            <div>
              <div class="item-date">${item.startDate || ''} - ${item.endDate || 'Present'}</div>
              <div class="item-location">${item.location || ''}</div>
            </div>
          </div>
          <div class="item-description">${item.description || ''}</div>
          ${item.highlights && item.highlights.length ? `
            <ul class="bullet-list">
              ${item.highlights.map(highlight => `
                <li class="bullet-item">${highlight}</li>
              `).join('')}
            </ul>
          ` : ''}
        </div>
      `).join('')}
    </div>
  `;
};
