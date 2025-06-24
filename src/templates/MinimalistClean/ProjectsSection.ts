
export const getMinimalistCleanProjectsHTML = (projectItems: ProjectItem[], settings: Settings) => {
  if (!projectItems || projectItems.length === 0) return '';

  const projectsHTML = projectItems
    .map(project => `
      <div style="margin-bottom: 32pt; page-break-inside: avoid;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8pt;">
          <h3 style="font-size: 11pt; font-weight: 200; color: #111827; letter-spacing: 2px;">${project.name}</h3>
          <span style="font-size: 8pt; color: #6b7280; font-weight: 100; letter-spacing: 2px;">${project.startDate} - ${project.endDate}</span>
        </div>
        <div style="font-size: 9pt; color: #4b5563; line-height: 2.0; font-weight: 200; text-align: justify; margin-bottom: 8pt;">
          ${project.description}
        </div>
      </div>
    `)
    .join('');

  return `
    <div class="minimalist-clean-section">
      <h2 class="minimalist-clean-section-title">projects</h2>
      ${projectsHTML}
    </div>
  `;
};
