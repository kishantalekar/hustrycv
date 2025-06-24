
import { getExternalLinkIcon } from "../icons/icons";
import { formatDateRange } from "../Professional/utils/formatDate";

export const getProfessionalV2CertificationsHTML = (certifications: Section<CertificateItem>, settings: Settings) => {
  return `
    <div class="professional-v2-section">
      <h2 class="professional-v2-section-title">Certifications</h2>
      ${certifications.items
        .map(
          (item) => `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12pt;">
          <div>
            <div class="professional-v2-item-title">
              ${item.certificationUrlOrCode ? `
                <a href="${item.certificationUrlOrCode}" style="color: #1a365d; text-decoration: none;" target="_blank">
                  ${item.name}
                  ${getExternalLinkIcon({ size: 14 })}
                </a>
              ` : item.name}
            </div>
            ${item.authority ? `<div class="professional-v2-item-subtitle">${item.authority}</div>` : ''}
          </div>
          <div class="professional-v2-item-meta">
            ${formatDateRange(item.date)}
          </div>
        </div>
      `
        )
        .join("")}
    </div>
  `;
};
