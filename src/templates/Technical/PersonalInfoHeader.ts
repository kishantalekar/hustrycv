
import { getSocialIcon } from '../icons';

export const getTechnicalPersonalInfoHTML = (basics: Basics, settings: Settings) => {
  const links = basics.socials
    .map(
      (social) =>
        `<span style="display: inline-flex; align-items: center; gap: 4px;">
          <a href="${social.url}" style="color: #059669; text-decoration: none; display: inline-flex; align-items: center; gap: 4px; font-family: 'JetBrains Mono', monospace; font-size: 9pt;">
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
    <div style="background: linear-gradient(135deg, #1f2937 0%, #374151 100%); color: white; padding: 32pt 24pt; margin-bottom: 0;">
      <h1 style="font-size: 22pt; font-weight: 700; margin-bottom: 8pt; font-family: 'Inter', sans-serif;">
        ${basics.name}
      </h1>
      <div style="font-size: 10pt; margin-bottom: 8pt; font-family: 'JetBrains Mono', monospace; opacity: 0.9;">
        ${contactItems}
      </div>
      ${links ? `<div style="font-size: 10pt; font-family: 'JetBrains Mono', monospace; opacity: 0.9;">${links}</div>` : ''}
    </div>
  `;
};
