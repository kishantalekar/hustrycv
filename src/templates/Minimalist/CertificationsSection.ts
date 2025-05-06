import { Section, CertificateItem } from '@/types';

export const getCertificationsHTML = (
  certifications: Section<CertificateItem>,
): string => {
  if (!certifications.items.length) {
    return '';
  }

  return `
    <div class="section">
      <h2 class="section-title">Certifications</h2>
      <div class="certifications-grid">
        ${certifications.items
          .map(
            (item) => `
          <div class="certification-item">
            <div class="cert-header">
              <div class="cert-title">${item.name || ''}</div>
              ${item.date ? `<div class="cert-date">${item.date}</div>` : ''}
            </div>
            ${
              item.authority
                ? `<div class="cert-issuer">${item.authority}</div>`
                : ''
            }
            ${
              item.certificationUrlOrCode
                ? `
              <a href="${item.certificationUrlOrCode}" class="cert-link" target="_blank" rel="noopener noreferrer">
                View Certificate
              </a>
            `
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
