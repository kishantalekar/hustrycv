
import { getSocialIcon } from '../icons';

export const getProfessionalV2PersonalInfoHTML = (basics: Basics, settings: Settings) => {
  const links = basics.socials
    .map(
      (social) =>
        `<span style="display: inline-flex; align-items: center; gap: 4px;">
          <a href="${social.url}" style="color: #1a365d; text-decoration: none; display: inline-flex; align-items: center; gap: 4px;">
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
    <div style="text-align: center; margin-bottom: 24pt; border-bottom: 3px solid #1a365d; padding-bottom: 16pt;">
      <h1 style="font-size: 24pt; font-weight: 700; color: #1a365d; margin-bottom: 8pt; letter-spacing: 1px;">
        ${basics.name}
      </h1>
      <div style="font-size: 11pt; color: #4a5568; margin-bottom: 6pt;">
        ${contactItems}
      </div>
      ${links ? `<div style="font-size: 11pt; color: #4a5568;">${links}</div>` : ''}
    </div>
  `;
};
