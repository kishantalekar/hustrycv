import { Basics } from "@/types";

export const getPersonalInfoHTML = (basics: Basics): string => {
  const { name, email, phone, location, socials } = basics;

  return `
    <div class="personal-info">
      <div class="name">${name || ""}</div>
      <div class="contact-info">
        ${email ? `<div class="contact-item">${email}</div>` : ""}
        ${phone ? `<div class="contact-item">${phone}</div>` : ""}
        ${location ? `<div class="contact-item">${location}</div>` : ""}
        ${
          socials
            ? `
          <div class="social-links">
            ${socials
              .map(
                (social) => `
              <a href="${social.url}" class="social-link" target="_blank" rel="noopener noreferrer">
                <i class="${social.icon}"></i>
                ${social.label}
              </a>
            `
              )
              .join("")}
          </div>
        `
            : ""
        }
      </div>
    </div>
  `;
};
