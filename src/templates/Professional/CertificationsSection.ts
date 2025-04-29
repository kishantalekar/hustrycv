import { getExternalLinkIcon } from '../icons/externalLink';
import { getResumeStyles } from '../styles/resumeStyles';

export const getCertificationsHTML = (certifications: any) => {
  const styles = getResumeStyles();

  return `
  <div class="section">
    <h2 class="section-title">Certifications</h2>
    <hr/>
    <div style="${styles.certificationCard}">
      ${certifications.items
        .map(
          (cert: any) => `
        <div style="${styles.certificationItem}">
          <div class="text-bold">${cert.name}</div> 
           <a href="${cert.certificationUrlOrCode}" 
             style="color: #000; text-decoration: none; display: inline-flex; align-items: center; margin-left: 4px;" 
             target="_blank">
             ${getExternalLinkIcon}
          </a>
          <div class="text-regular"> - ${cert.authority}</div>
        </div>
      `,
        )
        .join('')}
    </div>  
    `;
};
