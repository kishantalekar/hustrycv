
export const getTechnicalMinimalSkillsHTML = (skillItems: SkillItem[], settings: Settings) => {
  if (!skillItems || skillItems.length === 0) return '';

  const skillsHTML = skillItems
    .map(skill => `
      <div style="margin-bottom: 16pt; padding: 12pt; border: 1pt solid #e5e7eb; border-radius: 4pt;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8pt;">
          <h3 style="font-size: 11pt; font-weight: 400; color: #374151; font-family: 'Monaco', monospace;">
            ${skill.name}
          </h3>
          ${skill.level ? `
            <span style="font-size: 9pt; color: #6b7280; font-family: 'Monaco', monospace;">
              ${skill.level}
            </span>
          ` : ''}
        </div>
        ${skill.keywords.length > 0 ? `
          <div style="font-size: 9pt; color: #9ca3af; line-height: 1.6; font-family: 'Monaco', monospace;">
            ${skill.keywords.join(' | ')}
          </div>
        ` : ''}
      </div>
    `)
    .join('');

  return `
    <div class="technical-minimal-section">
      <h2 class="technical-minimal-section-title">skills</h2>
      ${skillsHTML}
    </div>
  `;
};
