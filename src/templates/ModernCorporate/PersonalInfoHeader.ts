
import { getSocialIcon } from '../icons';

export const getModernCorporatePersonalInfoHTML = (basics: Basics, settings: Settings) => {
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
    <div style="background: linear-gradient(135deg, #1a365d 0%, #2c5282 50%, #3182ce 100%); color: white; padding: 40pt 32pt; margin-bottom: 0; position: relative; overflow: hidden;">
      <div style="position: absolute; top: 0; right: 0; width: 120pt; height: 120pt; background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05)); border-radius: 0 0 0 100pt;"></div>
      <div style="position: absolute; bottom: 0; left: 0; width: 80pt; height: 2pt; background: linear-gradient(90deg, #63b3ed, #4299e1, #3182ce);"></div>
      <div style="position: relative; z-index: 1;">
        <h1 style="font-size: 26pt; font-weight: 700; margin-bottom: 12pt; text-shadow: 0 2pt 4pt rgba(0,0,0,0.1); letter-spacing: -0.3pt;">
          ${basics.name}
        </h1>
        <div style="font-size: 11pt; margin-bottom: 8pt; opacity: 0.95; font-weight: 400;">
          ${contactItems}
        </div>
        ${links ? `<div style="font-size: 11pt; opacity: 0.95; font-weight: 400;">${links}</div>` : ''}
      </div>
    </div>
  `;
};
