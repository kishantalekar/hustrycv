
import { getSocialIcon } from '../icons';

export const getMinimalistCleanPersonalInfoHTML = (basics: Basics, settings: Settings) => {
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
    .join(" · ");

  const contactItems = ([] as string[])
    .concat(basics.phone ? [basics.phone] : [])
    .concat(basics.email ? [basics.email] : [])
    .concat(basics.location ? [basics.location] : [])
    .join(" · ");

  return `
    <div style="text-align: center; margin-bottom: 48pt;">
      <h1 style="font-size: 20pt; font-weight: 100; color: #111827; margin-bottom: 12pt; letter-spacing: 8px; text-transform: uppercase;">
        ${basics.name}
      </h1>
      <div style="font-size: 9pt; color: #6b7280; margin-bottom: 6pt; font-weight: 300; letter-spacing: 2px;">
        ${contactItems}
      </div>
      ${links ? `<div style="font-size: 8pt; color: #9ca3af; font-weight: 300; letter-spacing: 2px;">${links}</div>` : ''}
    </div>
  `;
};
