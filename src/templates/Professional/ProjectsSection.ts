export const getProjectsHTML = (projects: any) => {
  return `
    <div class="section">
      <h2 class="section-title">Projects</h2>
      ${projects.items
        .map(
          (item: any) => `
        <div style="margin-bottom: 12pt;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span class="text-bold">${item.name}</span>
            <a href="${
              item.url
            }" style="color: #0066cc; text-decoration: none;" class="text-regular">
              ${item.url}
            </a>
          </div>
          <div class="text-regular text-muted" style="margin: 4pt 0;">
            ${item.description}
          </div>
          <ul style="margin: 4pt 0; padding-left: 16pt;">
            ${item.highlights
              .map(
                (highlight: string) => `
              <li class="text-regular">${highlight}</li>
            `,
              )
              .join('')}
          </ul>
        </div>
      `,
        )
        .join('')}
    </div>
  `;
};
