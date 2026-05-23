
export const getTechnicalBlueSkillsHTML = (skillItems: SkillItem[], settings: Settings) => {
  if (!skillItems || skillItems.length === 0) return '';

  const skillsHTML = skillItems
    .map(skill => `
      <div style="margin-bottom: 20pt; padding: 16pt; background: white; border: 1pt solid #3b82f6; border-radius: 6pt; box-shadow: 0 2pt 4pt rgba(59, 130, 246, 0.1);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10pt;">
          <h3 style="font-size: 12pt; font-weight: 600; color: #1e40af; font-family: 'Fira Code', monospace;">
            ${skill.name}
          </h3>
          ${skill.level ? `
            <span style="font-size: 10pt; color: white; background: #1e40af; padding: 4pt 8pt; border-radius: 4pt; font-family: 'Fira Code', monospace; font-weight: 600;">
              ${skill.level}
            </span>
          ` : ''}
        </div>
        ${skill.keywords.length > 0 ? `
          <div style="font-size: 10pt; color: #2563eb; line-height: 1.5; font-family: 'Fira Code', monospace;">
            ${skill.keywords.join(' | ')}
          </div>
        ` : ''}
      </div>
    `)
    .join('');

  return `
    <div class="technical-blue-section">
      <h2 class="technical-blue-section-title">// TECHNICAL SKILLS</h2>
      ${skillsHTML}
    </div>
  `;
};
