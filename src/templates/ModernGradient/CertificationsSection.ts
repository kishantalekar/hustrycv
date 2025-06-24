
import { getExternalLinkIcon } from "../icons/icons";
import { formatDateRange } from "../Professional/utils/formatDate";

export const getModernGradientCertificationsHTML = (certifications: Section<CertificateItem>, settings: Settings) => {
  const gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
  ];
  
  return `
    <div class="modern-gradient-section">
      <h2 class="modern-gradient-section-title">Certifications</h2>
      ${certifications.items
        .map(
          (item, index) => `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16pt; padding: 20pt; background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%); border-radius: 16pt; box-shadow: 0 4pt 12pt rgba(0,0,0,0.1); border: 2pt solid transparent; background-clip: padding-box; position: relative;">
          <div style="position: absolute; inset: 0; padding: 2pt; background: ${gradients[index % gradients.length]}; border-radius: 16pt; z-index: -1;"></div>
          <div style="background: white; border-radius: 14pt; padding: 18pt; width: 100%; display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div class="modern-gradient-item-title" style="background: ${gradients[index % gradients.length]}; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                ${item.certificationUrlOrCode ? `
                  <a href="${item.certificationUrlOrCode}" style="background: ${gradients[index % gradients.length]}; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; text-decoration: none;" target="_blank">
                    ${item.name}
                    ${getExternalLinkIcon({ size: 12 })}
                  </a>
                ` : item.name}
              </div>
              ${item.authority ? `<div class="modern-gradient-item-subtitle">${item.authority}</div>` : ''}
            </div>
            <div class="modern-gradient-item-meta" style="background: ${gradients[index % gradients.length]}; color: white; padding: 8pt 12pt; border-radius: 12pt; font-size: 8pt; font-weight: 600;">
              ${formatDateRange(item.date)}
            </div>
          </div>
        </div>
      `
        )
        .join("")}
    </div>
  `;
};
