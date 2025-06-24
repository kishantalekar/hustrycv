
import { getSocialIcon } from '../icons';

export const getModernCreativePersonalInfoHTML = (basics: Basics, settings: Settings) => {
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
    <div style="background: linear-gradient(45deg, #ff6b6b 0%, #4ecdc4 25%, #45b7d1 50%, #96ceb4 75%, #feca57 100%); color: white; padding: 40pt 32pt; margin-bottom: 0; position: relative; overflow: hidden; clip-path: polygon(0 0, 100% 0, 85% 100%, 0% 100%);">
      <div style="position: absolute; top: -20pt; right: 20pt; width: 80pt; height: 80pt; background: rgba(255,255,255,0.1); transform: rotate(45deg); border-radius: 20pt;"></div>
      <div style="position: absolute; bottom: -10pt; left: 60pt; width: 60pt; height: 60pt; background: rgba(255,255,255,0.15); border-radius: 50%; transform: skew(-15deg);"></div>
      <div style="position: relative; z-index: 1;">
        <h1 style="font-size: 28pt; font-weight: 800; margin-bottom: 12pt; text-shadow: 0 3pt 6pt rgba(0,0,0,0.2); letter-spacing: -0.5pt;">
          ${basics.name}
        </h1>
        <div style="font-size: 11pt; margin-bottom: 8pt; opacity: 0.95; font-weight: 500;">
          ${contactItems}
        </div>
        ${links ? `<div style="font-size: 11pt; opacity: 0.95; font-weight: 500;">${links}</div>` : ''}
      </div>
    </div>
  `;
};
