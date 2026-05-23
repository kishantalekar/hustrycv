
export const getModernArtisticProjectsHTML = (projectItems: ProjectItem[], settings: Settings) => {
  if (!projectItems || projectItems.length === 0) return '';

  const projectsHTML = projectItems
    .filter(item => item.status !== 'disabled')
    .map((project, index) => {
      const colors = ['#96ceb4', '#feca57', '#ff9ff3', '#54a0ff'];
      const color = colors[index % colors.length];
      
      return `
        <div style="margin-bottom: 24pt; padding: 20pt; background: rgba(255,255,255,0.85); border-radius: 16pt; border-right: 4pt solid ${color}; box-shadow: 0 6pt 20pt rgba(0,0,0,0.1); position: relative; overflow: hidden;">
          <div style="position: absolute; top: 5pt; left: 5pt; width: 15pt; height: 15pt; background: ${color}; clip-path: polygon(50% 0%, 0% 100%, 100% 100%); opacity: 0.3;"></div>
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12pt; position: relative; z-index: 1;">
            <h3 style="font-size: 13pt; font-weight: 600; color: #2d3748;">${project.name}</h3>
            ${project.url ? `<a href="${project.url}" style="font-size: 10pt; color: ${color}; text-decoration: none; font-weight: 500;">View Project</a>` : ''}
          </div>
          <div style="font-size: 11pt; color: #4a5568; line-height: 1.7; position: relative; z-index: 1;">
            ${project.description}
          </div>
        </div>
      `;
    })
    .join('');

  return `
    <div style="margin: 32pt;">
      <h2 style="font-size: 16pt; font-weight: 700; color: #2d3748; margin-bottom: 20pt; text-transform: uppercase; letter-spacing: 1.5pt;">
        Projects
      </h2>
      ${projectsHTML}
    </div>
  `;
};
