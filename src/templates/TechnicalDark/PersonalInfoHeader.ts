
import { getSocialIcon } from '../icons';

export const getTechnicalDarkPersonalInfoHTML = (basics: Basics, settings: Settings) => {
  const links = basics.socials
    .map(
      (social) =>
        `<span style="display: inline-flex; align-items: center; gap: 4px;">
          <a href="${social.url}" style="color: #00ff88; text-decoration: none; display: inline-flex; align-items: center; gap: 4px;">
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
    <div style="text-align: center; margin-bottom: 32pt; background: #1a1a1a; color: #00ff88; padding: 32pt; margin: -32pt -32pt 32pt -32pt; border-bottom: 2pt solid #00ff88;">
      <h1 style="font-size: 28pt; font-weight: 700; color: #00ff88; margin-bottom: 16pt; font-family: 'Courier New', monospace; letter-spacing: 2px;">
        ${basics.name}
      </h1>
      <div style="font-size: 11pt; color: #cccccc; margin-bottom: 8pt; font-family: 'Courier New', monospace;">
        ${contactItems}
      </div>
      ${links ? `<div style="font-size: 10pt; color: #cccccc; font-family: 'Courier New', monospace;">${links}</div>` : ''}
    </div>
  `;
};
