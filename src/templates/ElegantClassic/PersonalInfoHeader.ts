
import { getSocialIcon } from '../icons';

export const getElegantClassicPersonalInfoHTML = (basics: Basics, settings: Settings) => {
  const links = basics.socials
    .map(
      (social) =>
        `<span style="display: inline-flex; align-items: center; gap: 4px;">
          <a href="${social.url}" style="color: #5a67d8; text-decoration: none; display: inline-flex; align-items: center; gap: 4px;">
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
    <div style="text-align: center; margin-bottom: 36pt; padding: 24pt; border: 2pt solid #5a67d8; border-radius: 8pt;">
      <h1 style="font-size: 30pt; font-weight: 300; color: #5a67d8; margin-bottom: 16pt; font-family: 'Georgia', serif; letter-spacing: 3px;">
        ${basics.name}
      </h1>
      <div style="font-size: 12pt; color: #4a5568; margin-bottom: 8pt; font-family: 'Georgia', serif;">
        ${contactItems}
      </div>
      ${links ? `<div style="font-size: 11pt; color: #4a5568; font-family: 'Georgia', serif;">${links}</div>` : ''}
    </div>
  `;
};
