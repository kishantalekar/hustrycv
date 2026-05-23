
import { getSocialIcon } from '../icons';

export const getProfessionalTwoColumnPersonalInfoHTML = (basics: Basics, settings: Settings) => {
  const links = basics.socials
    .map(
      (social) =>
        `<div style="margin-bottom: 8pt;">
          <a href="${social.url}" style="color: #2563eb; text-decoration: none; display: flex; align-items: center; gap: 6pt; font-size: 10pt;">
            ${getSocialIcon(social.icon)}
            ${social.label}
          </a>
        </div>`
    )
    .join("");

  return `
    <div style="background: #1f2937; color: white; padding: 24pt; margin-bottom: 0;">
      <h1 style="font-size: 24pt; font-weight: 700; margin-bottom: 12pt; color: white;">
        ${basics.name}
      </h1>
      <div style="font-size: 11pt; color: #e5e7eb; margin-bottom: 8pt;">
        ${basics.email}
      </div>
      <div style="font-size: 11pt; color: #e5e7eb; margin-bottom: 8pt;">
        ${basics.phone}
      </div>
      <div style="font-size: 11pt; color: #e5e7eb; margin-bottom: 16pt;">
        ${basics.location}
      </div>
      <div style="border-top: 1pt solid #374151; padding-top: 16pt;">
        ${links}
      </div>
    </div>
  `;
};
