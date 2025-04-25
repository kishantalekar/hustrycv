import {getResumeStyles} from '../../utils/resumeStyles';
import {getExternalLinkIcon} from '../icons/externalLink';

export const getCertificationsHTML = (certifications: any) => {
  const styles = getResumeStyles();

  const res = `
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
    <a href="https://example.com">https://example.com</a>
<a href="">https://example.com</a>

<!-- NG -->
<a>https://example.com</a>
<a href="https://example.com">LINK</a>

<!-- Open https://example.com -->
<a href="https://foo.com">https://example.com</a>
  </div>
`;
  console.log(res);
  return res;
};
