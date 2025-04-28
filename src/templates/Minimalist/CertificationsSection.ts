import { Section } from "../../components/ResumePreview/ResumePreview.types";

export const getCertificationsHTML = (certifications: Section): string => {
  if (!certifications.items.length) return "";

  return `
    <div class="section">
      <h2 class="section-title">${certifications.title || "Certifications"}</h2>
      ${certifications.items
        .map(
          (item) => `
        <div class="item">
          <div class="item-title">${item.name || ""}</div>
          <div class="item-subtitle">${item.issuer || ""}</div>
          ${item.date ? `<div class="item-date">${item.date}</div>` : ""}
        </div>
      `
        )
        .join("")}
    </div>
  `;
};
