
import { getSocialIcon } from '../icons';

export const getModernGradientPersonalInfoHTML = (basics: Basics, settings: Settings) => {
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
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%); color: white; padding: 40pt 32pt; margin-bottom: 0; position: relative; overflow: hidden;">
      <div style="position: absolute; top: 0; right: 0; width: 200pt; height: 100pt; background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 70%); border-radius: 0 0 0 100pt;"></div>
      <div style="position: absolute; bottom: 0; left: 0; width: 150pt; height: 60pt; background: linear-gradient(45deg, rgba(255,255,255,0.08) 0%, transparent 60%); border-radius: 0 100pt 0 0;"></div>
      <div style="position: relative; z-index: 1;">
        <h1 style="font-size: 28pt; font-weight: 700; margin-bottom: 12pt; text-shadow: 0 3pt 6pt rgba(0,0,0,0.2); letter-spacing: -0.5pt; background: linear-gradient(45deg, #ffffff, #f0f4f8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
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
