
import { getSocialIcon } from '../icons';

export const getTechnicalMinimalPersonalInfoHTML = (basics: Basics, settings: Settings) => {
  const links = basics.socials
    .map(
      (social) =>
        `<span style="display: inline-flex; align-items: center; gap: 4px;">
          <a href="${social.url}" style="color: #6b7280; text-decoration: none; display: inline-flex; align-items: center; gap: 4px;">
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
    <div style="text-align: left; margin-bottom: 32pt; border-bottom: 1pt solid #e5e7eb; padding-bottom: 20pt;">
      <h1 style="font-size: 22pt; font-weight: 300; color: #374151; margin-bottom: 8pt; font-family: 'Monaco', monospace;">
        ${basics.name}
      </h1>
      <div style="font-size: 10pt; color: #6b7280; margin-bottom: 6pt; font-family: 'Monaco', monospace;">
        ${contactItems}
      </div>
      ${links ? `<div style="font-size: 9pt; color: #9ca3af; font-family: 'Monaco', monospace;">${links}</div>` : ''}
    </div>
  `;
};
