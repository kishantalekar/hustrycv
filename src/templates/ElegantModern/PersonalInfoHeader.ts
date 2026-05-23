
import { getSocialIcon } from '../icons';

export const getElegantModernPersonalInfoHTML = (basics: Basics, settings: Settings) => {
  const links = basics.socials
    .map(
      (social) =>
        `<span style="display: inline-flex; align-items: center; gap: 4px;">
          <a href="${social.url}" style="color: #667eea; text-decoration: none; display: inline-flex; align-items: center; gap: 4px;">
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
    <div style="text-align: center; margin-bottom: 32pt; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40pt 24pt; margin: -24pt -24pt 32pt -24pt; border-radius: 0 0 20pt 20pt;">
      <h1 style="font-size: 28pt; font-weight: 300; color: white; margin-bottom: 16pt; letter-spacing: 4px;">
        ${basics.name}
      </h1>
      <div style="font-size: 11pt; color: rgba(255,255,255,0.9); margin-bottom: 8pt; font-weight: 300;">
        ${contactItems}
      </div>
      ${links ? `<div style="font-size: 10pt; color: rgba(255,255,255,0.8); font-weight: 300;">${links}</div>` : ''}
    </div>
  `;
};
