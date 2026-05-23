
import { getSocialIcon } from '../icons';

export const getModernPersonalInfoHTML = (basics: Basics, settings: Settings) => {
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
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40pt 32pt; margin-bottom: 0; position: relative; overflow: hidden;">
      <div style="position: absolute; top: -50pt; right: -50pt; width: 150pt; height: 150pt; background: rgba(255,255,255,0.1); border-radius: 50%; opacity: 0.3;"></div>
      <div style="position: absolute; bottom: -30pt; left: -30pt; width: 100pt; height: 100pt; background: rgba(255,255,255,0.1); border-radius: 50%; opacity: 0.2;"></div>
      <div style="position: relative; z-index: 1;">
        <h1 style="font-size: 26pt; font-weight: 700; margin-bottom: 12pt; text-shadow: 0 2pt 4pt rgba(0,0,0,0.1);">
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
