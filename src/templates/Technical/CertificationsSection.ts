import { Section } from '../../components/ResumePreview/ResumePreview.types';

export const getCertificationsHTML = (certifications: Section): string => {
  if (!certifications.items.length) {return '';}

  return `
    <div class="section">
      <h2 class="section-title">${certifications.title || 'Certifications'}</h2>
      <div class="certifications-list">
        ${certifications.items
          .map(
            (item) => `
          <div class="certification-item">
            <div class="certification-name">${item.name || ''}</div>
            <div class="certification-issuer">${item.issuer || ''}</div>
            ${
              item.date
                ? `<div class="certification-date">${item.date}</div>`
                : ''
            }
            ${
              item.url
                ? `<a href="${item.url}" class="certification-link" target="_blank">View Certificate</a>`
                : ''
            }
          </div>
        `,
          )
          .join('')}
      </div>
    </div>
  `;
};
