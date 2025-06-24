
export const getTechnicalDarkSkillsHTML = (skillItems: SkillItem[], settings: Settings) => {
  if (!skillItems || skillItems.length === 0) return '';

  const skillsHTML = skillItems
    .map(skill => `
      <div style="margin-bottom: 20pt; padding: 16pt; background: #262626; border: 1pt solid #404040; border-radius: 6pt; border-left: 4pt solid #4ecdc4;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10pt;">
          <h3 style="font-size: 12pt; font-weight: 700; color: #4ecdc4; font-family: 'Courier New', monospace;">
            ${skill.name}
          </h3>
          ${skill.level ? `
            <span style="font-size: 10pt; color: #1a1a1a; background: #4ecdc4; padding: 4pt 8pt; border-radius: 4pt; font-family: 'Courier New', monospace; font-weight: 700;">
              ${skill.level}
            </span>
          ` : ''}
        </div>
        ${skill.keywords.length > 0 ? `
          <div style="font-size: 10pt; color: #cccccc; line-height: 1.5; font-family: 'Courier New', monospace;">
            ${skill.keywords.join(' | ')}
          </div>
        ` : ''}
      </div>
    `)
    .join('');

  return `
    <div class="technical-dark-section">
      <h2 class="technical-dark-section-title"># TECHNICAL_SKILLS</h2>
      ${skillsHTML}
    </div>
  `;
};
