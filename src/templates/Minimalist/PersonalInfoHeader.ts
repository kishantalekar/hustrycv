import { Basics } from "../../components/ResumePreview/ResumePreview.types";

export const getPersonalInfoHTML = (basics: Basics): string => {
  const { name, label, email, phone, url, location } = basics;
  
  return `
    <div class="personal-info">
      <div class="name">${name || ""}</div>
      ${label ? `<div class="title">${label}</div>` : ""}
      <div class="contact-info">
        ${email ? `<div class="contact-item">${email}</div>` : ""}
        ${phone ? `<div class="contact-item">${phone}</div>` : ""}
        ${url ? `<div class="contact-item">${url}</div>` : ""}
        ${location?.city ? `<div class="contact-item">${location.city}${location.region ? `, ${location.region}` : ""}</div>` : ""}
      </div>
    </div>
  `;
};