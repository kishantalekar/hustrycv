
import { getExternalLinkIcon } from "../icons/icons";
import { formatDateRange } from "../Professional/utils/formatDate";

export const getElegantCertificationsHTML = (certifications: Section<CertificateItem>, settings: Settings) => {
  return `
    <div class="elegant-section">
      <h2 class="elegant-section-title">Certifications</h2>
      <hr class="elegant-divider"/>
      ${certifications.items
        .map(
          (cert) => `
        <div class="elegant-item">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div>
              <div style="display: flex; align-items: center; gap: 8pt; margin-bottom: 4pt;">
                <div class="elegant-item-title">${cert.name}</div>
                ${cert.certificationUrlOrCode ? 
                  `<a href="${cert.certificationUrlOrCode}" style="color: #2563eb; display: inline-flex; align-items: center;">
                    ${getExternalLinkIcon({ size: 14 })}
                  </a>` : ''
                }
              </div>
              <div class="elegant-item-subtitle">${cert.authority}</div>
            </div>
            <div class="elegant-item-meta">
              ${formatDateRange(cert.date)}
            </div>
          </div>
        </div>
      `
        )
        .join("")}
    </div>
  `;
};
