
import { getSocialIcon } from "../icons";

export const getElegantPersonalInfoHTML = (basics: Basics, settings: Settings) => {
  const links = basics.socials
    .map(
      (social) =>
        `<span style="display: inline-flex; align-items: center; gap: 4px;">
          <a href="${social.url}" style="color: #2563eb; text-decoration: none; display: inline-flex; align-items: center; gap: 4px;">
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
    <div class="elegant-section" style="text-align: center; margin-bottom: 40pt;">
      <h1 style="font-size: 36pt; font-weight: 700; color: #1e293b; margin-bottom: 8pt; letter-spacing: -1px;">
        ${basics.name}
      </h1>
      <div style="font-size: 12pt; color: #64748b; margin-bottom: 8pt;">
        ${contactItems}
      </div>
      ${links ? `<div style="font-size: 12pt; color: #2563eb;">${links}</div>` : ''}
    </div>
  `;
};
