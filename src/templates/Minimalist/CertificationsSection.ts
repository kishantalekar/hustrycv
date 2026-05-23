
import { getExternalLinkIcon } from "../icons/icons";
import { formatDateRange } from "../Professional/utils/formatDate";

export const getMinimalistCertificationsHTML = (certifications: Section<CertificateItem>, settings: Settings) => {
  return `
    <div class="minimalist-section">
      <h2 class="minimalist-section-title">certifications</h2>
      ${certifications.items
        .map(
          (item) => `
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 16pt;">
          <div>
            <div class="minimalist-item-title">
              ${item.certificationUrlOrCode ? `
                <a href="${item.certificationUrlOrCode}" style="color: #2c2c2c; text-decoration: none;" target="_blank">
                  ${item.name}
                  ${getExternalLinkIcon({ size: 10 })}
                </a>
              ` : item.name}
            </div>
            ${item.authority ? `<div class="minimalist-item-subtitle">${item.authority}</div>` : ''}
          </div>
          <div class="minimalist-item-meta">
            ${formatDateRange(item.date)}
          </div>
        </div>
      `
        )
        .join("")}
    </div>
  `;
};
