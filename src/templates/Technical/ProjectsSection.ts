import { Section, ProjectItem } from "@/types";

export const getProjectsHTML = (projects: Section<ProjectItem>): string => {
  if (!projects.items.length) {
    return "";
  }

  return `
    <div class="section">
      <h2 class="section-title">Projects</h2>
      ${projects.items
        .map((item) => {
          // Create project links HTML
          const projectLinks =
            item.links && item.links.length > 0
              ? `<div class="project-links">
                ${item.links
                  .map(
                    (link) => `
                  <a href="${link.url}" class="project-link" target="_blank" rel="noopener noreferrer">
                    ${link.label}
                  </a>
                `
                  )
                  .join("")}
              </div>`
              : "";

          // Create status badge if available
          const statusBadge = item.status
            ? `<span class="status-badge status-${item.status.toLowerCase()}">${
                item.status
              }</span>`
            : "";

          return `
          <div class="project-item">
            <div class="project-header">
              <div class="project-title">${item.name || ""} ${statusBadge}</div>
              ${
                item.startDate
                  ? `<div class="project-date">${item.startDate || ""} - ${
                      item.endDate || (item.current ? "Present" : "")
                    }</div>`
                  : ""
              }
            </div>
            <div class="project-description">${item.description || ""}</div>
            ${projectLinks}
            ${
              item.keywords && item.keywords.length
                ? `<div class="tech-tag-container">
                  ${item.keywords
                    .map(
                      (keyword) => `<span class="tech-tag">${keyword}</span>`
                    )
                    .join("")}
                </div>`
                : ""
            }
          </div>
        `;
        })
        .join("")}
    </div>
  `;
};
