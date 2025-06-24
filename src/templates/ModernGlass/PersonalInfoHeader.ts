
import { getSocialIcon } from '../icons';

export const getModernGlassPersonalInfoHTML = (basics: Basics, settings: Settings) => {
  const links = basics.socials
    .map(
      (social) =>
        `<span style="display: inline-flex; align-items: center; gap: 4px;">
          <a href="${social.url}" style="color: white; text-decoration: none; display: inline-flex; align-items: center; gap: 4px; opacity: 0.9; transition: opacity 0.2s;">
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
    <div style="background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%); backdrop-filter: blur(20pt); -webkit-backdrop-filter: blur(20pt); color: #2d3748; padding: 40pt 32pt; margin-bottom: 0; position: relative; border-bottom: 1pt solid rgba(255,255,255,0.2);">
      <div style="position: absolute; top: -20pt; right: 20pt; width: 80pt; height: 80pt; background: rgba(255,255,255,0.1); border-radius: 50%; backdrop-filter: blur(10pt);"></div>
      <div style="position: relative; z-index: 1;">
        <h1 style="font-size: 28pt; font-weight: 700; margin-bottom: 12pt; color: #1a365d; letter-spacing: -0.5pt;">
          ${basics.name}
        </h1>
        <div style="font-size: 11pt; margin-bottom: 8pt; color: #4a5568; font-weight: 500;">
          ${contactItems}
        </div>
        ${links ? `<div style="font-size: 11pt; color: #4a5568; font-weight: 500;">${links}</div>` : ''}
      </div>
    </div>
  `;
};
