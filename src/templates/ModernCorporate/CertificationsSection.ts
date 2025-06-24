
import { getExternalLinkIcon } from "../icons/icons";
import { formatDateRange } from "../Professional/utils/formatDate";

export const getModernCorporateCertificationsHTML = (certifications: Section<CertificateItem>, settings: Settings) => {
  return `
    <div class="modern-corporate-section">
      <h2 class="modern-corporate-section-title">Professional Certifications</h2>
      ${certifications.items
        .map(
          (item) => `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16pt; padding: 18pt; background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%); border-radius: 6pt; box-shadow: 0 2pt 4pt rgba(0,0,0,0.05); border-left: 4pt solid #3182ce;">
          <div>
            <div class="modern-corporate-item-title">
              ${item.certificationUrlOrCode ? `
                <a href="${item.certificationUrlOrCode}" style="color: #3182ce; text-decoration: none;" target="_blank">
                  ${item.name}
                  ${getExternalLinkIcon({ size: 12 })}
                </a>
              ` : item.name}
            </div>
            ${item.authority ? `<div class="modern-corporate-item-subtitle">${item.authority}</div>` : ''}
          </div>
          <div class="modern-corporate-item-meta" style="background: #2c5282; color: white; padding: 8pt 12pt; border-radius: 4pt; font-size: 8pt; font-weight: 600;">
            ${formatDateRange(item.date)}
          </div>
        </div>
      `
        )
        .join("")}
    </div>
  `;
};
