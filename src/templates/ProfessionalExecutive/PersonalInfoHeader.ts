
import { getSocialIcon } from '../icons';

export const getProfessionalExecutivePersonalInfoHTML = (basics: Basics, settings: Settings) => {
  const links = basics.socials
    .map(
      (social) =>
        `<span style="display: inline-flex; align-items: center; gap: 4px;">
          <a href="${social.url}" style="color: #1a202c; text-decoration: none; display: inline-flex; align-items: center; gap: 4px;">
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
    <div style="text-align: left; margin-bottom: 32pt; background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%); color: white; padding: 32pt; margin: -32pt -32pt 32pt -32pt;">
      <h1 style="font-size: 32pt; font-weight: 800; color: white; margin-bottom: 16pt; letter-spacing: 2px;">
        ${basics.name}
      </h1>
      <div style="font-size: 12pt; color: #e2e8f0; margin-bottom: 8pt; font-weight: 300;">
        ${contactItems}
      </div>
      ${links ? `<div style="font-size: 11pt; color: #e2e8f0; font-weight: 300;">${links}</div>` : ''}
    </div>
  `;
};
