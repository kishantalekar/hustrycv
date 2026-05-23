
import { getExternalLinkIcon } from "../icons/icons";
import { formatDateRange } from "../Professional/utils/formatDate";

export const getModernCreativeCertificationsHTML = (certifications: Section<CertificateItem>, settings: Settings) => {
  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];
  
  return `
    <div class="modern-creative-section">
      <h2 class="modern-creative-section-title">Certifications</h2>
      ${certifications.items
        .map(
          (item, index) => `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16pt; padding: 20pt; background: linear-gradient(135deg, ${colors[index % colors.length]}10 0%, ${colors[index % colors.length]}05 100%); border-radius: 20pt; box-shadow: 0 4pt 8pt rgba(0,0,0,0.1); border: 2pt solid ${colors[index % colors.length]}30; position: relative; overflow: hidden;">
          <div style="position: absolute; top: -5pt; left: -5pt; width: 25pt; height: 25pt; background: ${colors[index % colors.length]}; border-radius: 50%; opacity: 0.1; transform: rotate(45deg);"></div>
          <div style="position: relative; z-index: 1;">
            <div class="modern-creative-item-title" style="color: ${colors[index % colors.length]};">
              ${item.certificationUrlOrCode ? `
                <a href="${item.certificationUrlOrCode}" style="color: ${colors[index % colors.length]}; text-decoration: none;" target="_blank">
                  ${item.name}
                  ${getExternalLinkIcon({ size: 12 })}
                </a>
              ` : item.name}
            </div>
            ${item.authority ? `<div class="modern-creative-item-subtitle">${item.authority}</div>` : ''}
          </div>
          <div class="modern-creative-item-meta" style="background: linear-gradient(135deg, ${colors[index % colors.length]}, ${colors[(index + 2) % colors.length]}); color: white; padding: 8pt 12pt; border-radius: 15pt; font-size: 8pt; font-weight: 600; transform: rotate(-3deg);">
            ${formatDateRange(item.date)}
          </div>
        </div>
      `
        )
        .join("")}
    </div>
  `;
};
