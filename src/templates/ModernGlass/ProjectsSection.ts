
export const getModernGlassProjectsHTML = (projectItems: ProjectItem[], settings: Settings) => {
  if (!projectItems || projectItems.length === 0) return '';

  const projectsHTML = projectItems
    .filter(item => item.status !== 'disabled')
    .map(project => `
      <div style="margin-bottom: 24pt; padding: 20pt; background: rgba(255,255,255,0.3); backdrop-filter: blur(12pt); -webkit-backdrop-filter: blur(12pt); border-radius: 10pt; border: 1pt solid rgba(255,255,255,0.2);">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12pt;">
          <h3 style="font-size: 13pt; font-weight: 600; color: #1a365d;">${project.name}</h3>
          ${project.url ? `<a href="${project.url}" style="font-size: 10pt; color: #4a5568; text-decoration: none;">View Project</a>` : ''}
        </div>
        <div style="font-size: 11pt; color: #4a5568; line-height: 1.7;">
          ${project.description}
        </div>
      </div>
    `)
    .join('');

  return `
    <div class="modern-glass-section">
      <h2 class="modern-glass-section-title">Projects</h2>
      ${projectsHTML}
    </div>
  `;
};
