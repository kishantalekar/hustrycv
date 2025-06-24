
import { getSocialIcon } from '../icons';

export const getProfessionalModernPersonalInfoHTML = (basics: Basics, settings: Settings) => {
  const links = basics.socials
    .map(
      (social) =>
        `<span style="display: inline-flex; align-items: center; gap: 4px;">
          <a href="${social.url}" style="color: #3182ce; text-decoration: none; display: inline-flex; align-items: center; gap: 4px;">
            ${getSocialIcon(social.icon)}
            ${social.label}
          </a>
        </span>`
    )
    .join(" | ");

  const contactItems = ([] as string[])
    .concat(basics.phone ? [basics.phone] : [])
    .concat(basics.email ? [basics.email] : [])
    .concat(basics.location ? [basics.location] : [])
    .join(" | ");

  return `
    <div style="text-align: center; margin-bottom: 28pt; padding: 28pt; background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%); border-radius: 12pt; border: 1pt solid #e2e8f0;">
      <h1 style="font-size: 26pt; font-weight: 600; color: #2d3748; margin-bottom: 12pt; letter-spacing: 1px;">
        ${basics.name}
      </h1>
      <div style="font-size: 11pt; color: #4a5568; margin-bottom: 8pt; font-weight: 500;">
        ${contactItems}
      </div>
      ${links ? `<div style="font-size: 10pt; color: #4a5568; font-weight: 500;">${links}</div>` : ''}
    </div>
  `;
};
