
import { getSocialIcon } from '../icons';

export const getMinimalistModernPersonalInfoHTML = (basics: Basics, settings: Settings) => {
  const links = basics.socials
    .map(
      (social) =>
        `<span style="display: inline-flex; align-items: center; gap: 4px;">
          <a href="${social.url}" style="color: #4f46e5; text-decoration: none; display: inline-flex; align-items: center; gap: 4px;">
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
    <div style="text-align: left; margin-bottom: 36pt; padding: 20pt 0; border-bottom: 1pt solid #e5e7eb;">
      <h1 style="font-size: 24pt; font-weight: 200; color: #1f2937; margin-bottom: 8pt; letter-spacing: 2px;">
        ${basics.name}
      </h1>
      <div style="font-size: 10pt; color: #6b7280; margin-bottom: 6pt; font-weight: 300;">
        ${contactItems}
      </div>
      ${links ? `<div style="font-size: 9pt; color: #4f46e5; font-weight: 300;">${links}</div>` : ''}
    </div>
  `;
};
