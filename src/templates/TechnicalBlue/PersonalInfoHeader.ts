
import { getSocialIcon } from '../icons';

export const getTechnicalBluePersonalInfoHTML = (basics: Basics, settings: Settings) => {
  const links = basics.socials
    .map(
      (social) =>
        `<span style="display: inline-flex; align-items: center; gap: 4px;">
          <a href="${social.url}" style="color: #4fd1c7; text-decoration: none; display: inline-flex; align-items: center; gap: 4px;">
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
    <div style="text-align: left; margin-bottom: 32pt; background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%); color: white; padding: 28pt; margin: -28pt -28pt 32pt -28pt;">
      <h1 style="font-size: 26pt; font-weight: 600; color: #4fd1c7; margin-bottom: 12pt; font-family: 'Fira Code', monospace;">
        ${basics.name}
      </h1>
      <div style="font-size: 11pt; color: #e0e7ff; margin-bottom: 8pt; font-family: 'Fira Code', monospace;">
        ${contactItems}
      </div>
      ${links ? `<div style="font-size: 10pt; color: #c7d2fe; font-family: 'Fira Code', monospace;">${links}</div>` : ''}
    </div>
  `;
};
