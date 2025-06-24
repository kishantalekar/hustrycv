
import { getSocialIcon } from '../icons';

export const getCreativeTwoColumnPersonalInfoHTML = (basics: Basics, settings: Settings) => {
  const links = basics.socials
    .map(
      (social) =>
        `<div style="margin-bottom: 10pt;">
          <a href="${social.url}" style="color: #f59e0b; text-decoration: none; display: flex; align-items: center; gap: 8pt; font-size: 11pt; font-weight: 500;">
            ${getSocialIcon(social.icon)}
            ${social.label}
          </a>
        </div>`
    )
    .join("");

  return `
    <div style="background: linear-gradient(135deg, #8b5cf6 0%, #f59e0b 100%); color: white; padding: 28pt; margin-bottom: 0; border-radius: 0 0 20pt 20pt;">
      <h1 style="font-size: 28pt; font-weight: 800; margin-bottom: 16pt; color: white; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">
        ${basics.name}
      </h1>
      <div style="font-size: 12pt; color: rgba(255,255,255,0.9); margin-bottom: 8pt; font-weight: 300;">
        ${basics.email}
      </div>
      <div style="font-size: 12pt; color: rgba(255,255,255,0.9); margin-bottom: 8pt; font-weight: 300;">
        ${basics.phone}
      </div>
      <div style="font-size: 12pt; color: rgba(255,255,255,0.9); margin-bottom: 20pt; font-weight: 300;">
        ${basics.location}
      </div>
      <div style="border-top: 2pt solid rgba(255,255,255,0.3); padding-top: 20pt;">
        ${links}
      </div>
    </div>
  `;
};
