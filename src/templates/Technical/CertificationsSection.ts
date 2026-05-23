
import { getExternalLinkIcon } from "../icons/icons";
import { formatDateRange } from "../Professional/utils/formatDate";

export const getTechnicalCertificationsHTML = (certifications: Section<CertificateItem>, settings: Settings) => {
  return `
    <div class="technical-section">
      <h2 class="technical-section-title">Certifications</h2>
      ${certifications.items
        .map(
          (item) => `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16pt; padding: 12pt; background: #f0fdf4; border-radius: 6pt;">
          <div>
            <div class="technical-item-title">
              ${item.certificationUrlOrCode ? `
                <a href="${item.certificationUrlOrCode}" style="color: #059669; text-decoration: none;" target="_blank">
                  ${item.name}
                  ${getExternalLinkIcon({ size: 12 })}
                </a>
              ` : item.name}
            </div>
            ${item.authority ? `<div class="technical-item-subtitle">${item.authority}</div>` : ''}
          </div>
          <div class="technical-item-meta">
            ${formatDateRange(item.date)}
          </div>
        </div>
      `
        )
        .join("")}
    </div>
  `;
};
