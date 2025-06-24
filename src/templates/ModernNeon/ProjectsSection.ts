
export const getModernNeonProjectsHTML = (projectItems: ProjectItem[], settings: Settings) => {
  if (!projectItems || projectItems.length === 0) return '';

  const projectsHTML = projectItems
    .filter(item => item.status !== 'disabled')
    .map(project => `
      <div style="margin-bottom: 20pt; padding: 16pt; background: #111111; border: 1pt solid #00ffff; border-radius: 6pt; box-shadow: 0 0 10pt #00ffff20;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10pt;">
          <h3 style="font-size: 13pt; font-weight: 600; color: #00ffff; text-shadow: 0 0 6pt #00ffff;">${project.name}</h3>
          ${project.url ? `<a href="${project.url}" style="font-size: 9pt; color: #cccccc; text-decoration: none;">View Project</a>` : ''}
        </div>
        <div style="font-size: 11pt; color: #ffffff; line-height: 1.6; opacity: 0.9;">
          ${project.description}
        </div>
      </div>
    `)
    .join('');

  return `
    <div style="margin: 32pt;">
      <h2 style="font-size: 16pt; font-weight: 700; color: #00ffff; margin-bottom: 20pt; text-transform: uppercase; letter-spacing: 2pt; text-shadow: 0 0 10pt #00ffff;">
        Projects
      </h2>
      ${projectsHTML}
    </div>
  `;
};
