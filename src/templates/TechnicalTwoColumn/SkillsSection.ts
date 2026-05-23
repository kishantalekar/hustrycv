
export const getTechnicalTwoColumnSkillsHTML = (skillItems: SkillItem[], settings: Settings) => {
  if (!skillItems || skillItems.length === 0) return '';

  const skillsHTML = skillItems
    .map(skill => `
      <div style="margin-bottom: 20pt;">
        <h3 style="font-size: 11pt; font-weight: 600; color: #00ff88; margin-bottom: 8pt; font-family: 'Courier New', monospace;">
          ${skill.name}.skills
        </h3>
        <div style="display: flex; flex-wrap: wrap; gap: 6pt;">
          ${skill.keywords.map(keyword => `
            <span style="background: #333; color: #00ff88; padding: 4pt 8pt; border-radius: 4pt; font-size: 9pt; font-family: 'Courier New', monospace; border: 1pt solid #00ff88;">
              ${keyword}
            </span>
          `).join('')}
        </div>
      </div>
    `)
    .join('');

  return `
    <div style="margin-bottom: 24pt;">
      <h2 style="font-size: 12pt; font-weight: 700; color: #00ff88; margin-bottom: 16pt; font-family: 'Courier New', monospace; border-bottom: 2pt solid #00ff88; padding-bottom: 8pt;">
        # technical.stack
      </h2>
      ${skillsHTML}
    </div>
  `;
};
