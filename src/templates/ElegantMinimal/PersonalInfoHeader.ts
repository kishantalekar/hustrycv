
import { getSocialIcon } from '../icons';

export const getElegantMinimalPersonalInfoHTML = (basics: Basics, settings: Settings) => {
  const links = basics.socials
    .map(
      (social) =>
        `<span style="display: inline-flex; align-items: center; gap: 4px;">
          <a href="${social.url}" style="color: #a0aec0; text-decoration: none; display: inline-flex; align-items: center; gap: 4px;">
            ${getSocialIcon(social.icon)}
            ${social.label}
          </a>
        </span>`
    )
    .join(" • ");

  const contactItems = ([] as string[])
    .concat(basics.phone ? [basics.phone] : [])
    .concat(basics.email ? [basics.email] : [])
    .concat(basics.location ? [basics.location] : [])
    .join(" • ");

  return `
    <div style="text-align: left; margin-bottom: 40pt; border-bottom: 1pt solid #e2e8f0; padding-bottom: 24pt;">
      <h1 style="font-size: 24pt; font-weight: 200; color: #2d3748; margin-bottom: 12pt; letter-spacing: 6px;">
        ${basics.name}
      </h1>
      <div style="font-size: 10pt; color: #718096; margin-bottom: 6pt; font-weight: 300; letter-spacing: 1px;">
        ${contactItems}
      </div>
      ${links ? `<div style="font-size: 9pt; color: #a0aec0; font-weight: 300; letter-spacing: 1px;">${links}</div>` : ''}
    </div>
  `;
};
