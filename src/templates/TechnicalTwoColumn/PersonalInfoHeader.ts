
import { getSocialIcon } from '../icons';

export const getTechnicalTwoColumnPersonalInfoHTML = (basics: Basics, settings: Settings) => {
  const links = basics.socials
    .map(
      (social) =>
        `<div style="margin-bottom: 8pt;">
          <a href="${social.url}" style="color: #00ff88; text-decoration: none; display: flex; align-items: center; gap: 6pt; font-size: 10pt; font-family: 'Courier New', monospace;">
            ${getSocialIcon(social.icon)}
            ${social.label}
          </a>
        </div>`
    )
    .join("");

  return `
    <div style="background: #0a0a0a; color: #00ff88; padding: 24pt; margin-bottom: 0; border-bottom: 2pt solid #00ff88;">
      <div style="font-family: 'Courier New', monospace; font-size: 11pt; color: #888; margin-bottom: 8pt;">
        # whoami
      </div>
      <h1 style="font-size: 20pt; font-weight: 700; margin-bottom: 12pt; color: #00ff88; font-family: 'Courier New', monospace;">
        ${basics.name}
      </h1>
      <div style="font-size: 10pt; color: #ccc; margin-bottom: 6pt; font-family: 'Courier New', monospace;">
        email: ${basics.email}
      </div>
      <div style="font-size: 10pt; color: #ccc; margin-bottom: 6pt; font-family: 'Courier New', monospace;">
        phone: ${basics.phone}
      </div>
      <div style="font-size: 10pt; color: #ccc; margin-bottom: 16pt; font-family: 'Courier New', monospace;">
        location: ${basics.location}
      </div>
      <div style="border-top: 1pt solid #333; padding-top: 16pt;">
        <div style="font-size: 10pt; color: #888; margin-bottom: 8pt; font-family: 'Courier New', monospace;">
          # social_links
        </div>
        ${links}
      </div>
    </div>
  `;
};
