import { Section } from "../../components/ResumePreview/ResumePreview.types";

export const getProjectsHTML = (projects: Section): string => {
  if (!projects.items.length) return "";
  
  return `
    <div class="section">
      <h2 class="section-title">${projects.title || "Projects"}</h2>
      ${projects.items.map(item => `
        <div class="item">
          <div class="item-header">
            <div class="item-title">${item.name || ""}</div>
            ${item.startDate ? `
              <div class="item-date">${item.startDate || ""} - ${item.endDate || "Present"}</div>
            ` : ""}
          </div>
          <div class="item-description">${item.description || ""}</div>
          ${item.highlights && item.highlights.length ? `
            <ul class="bullet-list">
              ${item.highlights.map(highlight => `
                <li class="bullet-item">${highlight}</li>
              `).join("")}
            </ul>
          ` : ""}
        </div>
      `).join("")}
    </div>
  `;
};