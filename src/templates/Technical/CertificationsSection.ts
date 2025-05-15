import {getExternalLinkIcon} from '../icons/icons';

const renderCertificateHeader = (
  name: string,
  certificationUrlOrCode?: string,
) => {
  return `
    <div class="cert-header" style="display:flex;flex-direction:row;align-items:start;">
      <div class="cert-title" style="">
        <span class="cert-name">${name || ''}</span>
        
      </div>
       ${
         certificationUrlOrCode
           ? `
        <a href="${certificationUrlOrCode}" class="cert-link technical-link" target="_blank" rel="noopener noreferrer">
          ${getExternalLinkIcon({})}
        </a>
      `
           : ''
       }
    </div>
  `;
};

const renderCertificateIssuer = (authority: string) => {
  if (!authority) {
    return '';
  }

  return `
    <div class="cert-issuer">
      <span class="issuer-name">${authority}</span>
     
    </div>
  `;
};

const renderCertificateDate = (date?: string) => {
  if (!date) {
    return '';
  }

  return `
    <div class="cert-date">
      <span class="date-text">${date}</span>
    </div>
  `;
};

const renderCertificateItem = (item: CertificateItem) => {
  return `
    <div class="certification-item technical-card" style="page-break-inside:avoid;">
      ${renderCertificateHeader(item.name, item.certificationUrlOrCode)}
      ${renderCertificateIssuer(item.authority || '')}
      ${renderCertificateDate(item.date)}
    </div>
  `;
};

export const getCertificationsHTML = (
  certifications: Section<CertificateItem>,
): string => {
  if (!certifications.items.length) {
    return '';
  }

  return `
    <div class="section technical-section" style="page-break-inside: auto;">
      <h2 class="section-title"><i class="fas fa-award section-icon"></i>Certifications</h2>
      <div class="certifications-grid">
        ${certifications.items.map(renderCertificateItem).join('')}
      </div>
    </div>
  `;
};
