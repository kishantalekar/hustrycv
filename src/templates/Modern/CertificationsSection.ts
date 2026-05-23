
import { getExternalLinkIcon } from "../icons/icons";
import { formatDateRange } from "../Professional/utils/formatDate";

export const getModernCertificationsHTML = (certifications: Section<CertificateItem>, settings: Settings) => {
  return `
    <div class="modern-section">
      <h2 class="modern-section-title">Certifications</h2>
      ${certifications.items
        .map(
          (item) => `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16pt; padding: 16pt; background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 10pt; box-shadow: 0 2pt 4pt rgba(102, 126, 234, 0.1);">
          <div>
            <div class="modern-item-title">
              ${item.certificationUrlOrCode ? `
                <a href="${item.certificationUrlOrCode}" style="color: #667eea; text-decoration: none;" target="_blank">
                  ${item.name}
                  ${getExternalLinkIcon({ size: 12 })}
                </a>
              ` : item.name}
            </div>
            ${item.authority ? `<div class="modern-item-subtitle">${item.authority}</div>` : ''}
          </div>
          <div class="modern-item-meta" style="background: #764ba2; color: white; padding: 6pt 10pt; border-radius: 8pt; font-size: 8pt;">
            ${formatDateRange(item.date)}
          </div>
        </div>
      `
        )
        .join("")}
    </div>
  `;
};
