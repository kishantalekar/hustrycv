import {getExternalLinkIcon} from '../icons/icons';
import {getResumeStyles} from '../styles/resumeStyles';
import {formatDateRange} from './utils/formatDate';

const renderCertificateTitle = (name: string) => {
  return `
    <div class="text-bold">${name}</div>
  `;
};

const renderCertificateLink = (url: string) => {
  if (url.length === 0) return '';
  return `
    <a href="${url}" 
      style="color: #000; text-decoration: none; display: inline-flex; align-items: center; margin-left: 4px;" 
      target="_blank">
      ${getExternalLinkIcon({size: 18})}
    </a>
  `;
};

const renderCertificateAuthority = (authority: string) => {
  if (!authority) {
    return '';
  }
  return `
    <div class="text-regular"> - ${authority}</div>
  `;
};

const renderCertificateItem = (cert: CertificateItem) => {
  const styles = getResumeStyles();
  return `
    <div style="${styles.certificationItem}" class="space-between">
    <div style="${styles.certificationItem}">
      ${renderCertificateTitle(cert.name)}
      ${renderCertificateLink(cert?.certificationUrlOrCode)}
      ${renderCertificateAuthority(cert.authority)}
</div>
      ${formatDateRange(cert.date)}
    </div>
  `;
};

// Example usage of the formatDateRange function:
// const formattedDate = formatDateRange("2022-01", "2022-12", false); // Jan 2022 - Dec 2022
// const currentPosition = formatDateRange("2023-01", undefined, true); // Jan 2023 - Present
// const singleDate = formatDateRange("2023-01", undefined, false); // Jan 2023

export const getCertificationsHTML = (
  certifications: Section<CertificateItem>,
) => {
  const styles = getResumeStyles();
  return `
    <div class="section">
      <h2 class="section-title">Certifications</h2>
      <hr/>
      <div style="${styles.certificationCard}">
        ${certifications.items.map(renderCertificateItem).join('')}
      </div>
    </div>
  `;
};
