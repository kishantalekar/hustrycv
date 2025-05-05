import { Section, ProjectItem } from "@/types";

export const getProjectsHTML = (projects: Section<ProjectItem>): string => {
  if (!projects.items.length) {
    return "";
  }

  return `
    <div class="section">
      <h2 class="section-title">Projects</h2>
      ${projects.items
        .map(
          (item) => `
        <div class="item ${item.status}">
          <div class="item-header">
            <div class="item-title-row">
              <div class="item-title">${item.name || ""}</div>
              ${
                item.status
                  ? `<span class="status-badge">${item.status}</span>`
                  : ""
              }
            </div>
            ${
              item.links?.length
                ? `
              <div class="project-links">
                ${item.links
                  .map(
                    (link) => `
                  <a href="${link.url}" class="project-link" target="_blank" rel="noopener noreferrer">
                    <i class="${link.icon}"></i>
                    ${link.label}
                  </a>
                `
                  )
                  .join("")}
              </div>
            `
                : ""
            }
          </div>
          <div class="item-description">${item.description || ""}</div>
          ${
            item.keywords?.length
              ? `
            <div class="keywords">
              ${item.keywords
                .map(
                  (keyword) => `
                <span class="keyword">${keyword}</span>
              `
                )
                .join("")}
            </div>
          `
              : ""
          }
        </div>
      `
        )
        .join("")}
    </div>
  `;
};
