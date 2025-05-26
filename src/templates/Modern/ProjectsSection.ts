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
        <div class="project-item">
          <div class="item-header">
            <div class="item-title">${item.name || ""}</div>
            <div class="item-date">${
              item.current ? "Current Project" : ""
            }</div>
          </div>
          <div class="item-description">${item.description || ""}</div>
        </div>
      `
        )
        .join("")}
    </div>
  `;
};
