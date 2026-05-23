
import { getSocialIcon } from '../icons';

export const getProfessionalClassicPersonalInfoHTML = (basics: Basics, settings: Settings) => {
  const links = basics.socials
    .map(
      (social) =>
        `<span style="display: inline-flex; align-items: center; gap: 4px;">
          <a href="${social.url}" style="color: #2d3748; text-decoration: none; display: inline-flex; align-items: center; gap: 4px;">
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
    <div style="text-align: center; margin-bottom: 32pt; border-bottom: 2px solid #2d3748; padding-bottom: 20pt;">
      <h1 style="font-size: 28pt; font-weight: 700; color: #2d3748; margin-bottom: 12pt; font-family: 'Times New Roman', serif;">
        ${basics.name}
      </h1>
      <div style="font-size: 12pt; color: #4a5568; margin-bottom: 8pt; font-family: 'Times New Roman', serif;">
        ${contactItems}
      </div>
      ${links ? `<div style="font-size: 11pt; color: #4a5568; font-family: 'Times New Roman', serif;">${links}</div>` : ''}
    </div>
  `;
};
