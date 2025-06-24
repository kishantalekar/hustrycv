
import { getSocialIcon } from '../icons';

export const getMinimalistPersonalInfoHTML = (basics: Basics, settings: Settings) => {
  const links = basics.socials
    .map(
      (social) =>
        `<span style="display: inline-flex; align-items: center; gap: 4px;">
          <a href="${social.url}" style="color: #666666; text-decoration: none; display: inline-flex; align-items: center; gap: 4px;">
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
      <h1 style="font-size: 28pt; font-weight: 300; color: #2c2c2c; margin-bottom: 16pt; letter-spacing: 3px;">
        ${basics.name}
      </h1>
      <div style="font-size: 10pt; color: #666666; margin-bottom: 8pt; font-weight: 300;">
        ${contactItems}
      </div>
      ${links ? `<div style="font-size: 10pt; color: #666666; font-weight: 300;">${links}</div>` : ''}
    </div>
  `;
};
