
export const getMinimalistBoldProjectsHTML = (projectItems: ProjectItem[], settings: Settings) => {
  if (!projectItems || projectItems.length === 0) return '';

  const projectsHTML = projectItems
    .map(project => `
      <div style="margin-bottom: 32pt; page-break-inside: avoid;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 12pt;">
          <h3 style="font-size: 14pt; font-weight: 700; color: #000000; text-transform: uppercase; letter-spacing: 2px;">${project.name}</h3>
          <span style="font-size: 10pt; color: #374151; font-weight: 600;">${project.startDate} - ${project.endDate}</span>
        </div>
        <div style="font-size: 11pt; color: #374151; line-height: 1.7; font-weight: 500; text-align: justify; padding: 20pt; border: 2pt solid #000000; margin-bottom: 12pt;">
          ${project.description}
        </div>
      </div>
    `)
    .join('');

  return `
    <div class="minimalist-bold-section">
      <h2 class="minimalist-bold-section-title">PROJECTS</h2>
      ${projectsHTML}
    </div>
  `;
};
