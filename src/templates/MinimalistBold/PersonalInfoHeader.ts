
import { getSocialIcon } from '../icons';

export const getMinimalistBoldPersonalInfoHTML = (basics: Basics, settings: Settings) => {
  const links = basics.socials
    .map(
      (social) =>
        `<span style="display: inline-flex; align-items: center; gap: 4px;">
          <a href="${social.url}" style="color: #000000; text-decoration: none; display: inline-flex; align-items: center; gap: 4px; font-weight: 700;">
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
    <div style="text-align: center; margin-bottom: 40pt; background: #000000; color: white; padding: 32pt; margin: -32pt -32pt 40pt -32pt;">
      <h1 style="font-size: 32pt; font-weight: 900; color: white; margin-bottom: 16pt; letter-spacing: 4px; text-transform: uppercase;">
        ${basics.name}
      </h1>
      <div style="font-size: 12pt; color: #e5e7eb; margin-bottom: 8pt; font-weight: 600;">
        ${contactItems}
      </div>
      ${links ? `<div style="font-size: 11pt; color: #d1d5db; font-weight: 600;">${links}</div>` : ''}
    </div>
  `;
};
