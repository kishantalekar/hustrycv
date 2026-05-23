
export const getElegantMinimalSkillsHTML = (skillItems: SkillItem[], settings: Settings) => {
  if (!skillItems || skillItems.length === 0) return '';

  const skillsHTML = skillItems
    .map(skill => `
      <div style="margin-bottom: 20pt;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8pt;">
          <h3 style="font-size: 11pt; font-weight: 300; color: #2d3748; letter-spacing: 2px;">
            ${skill.name}
          </h3>
          ${skill.level ? `
            <span style="font-size: 9pt; color: #718096; font-weight: 300; letter-spacing: 1px;">
              ${skill.level}
            </span>
          ` : ''}
        </div>
        ${skill.keywords.length > 0 ? `
          <div style="font-size: 9pt; color: #a0aec0; line-height: 1.8; font-weight: 300; letter-spacing: 1px; padding-left: 12pt;">
            ${skill.keywords.join(' • ')}
          </div>
        ` : ''}
      </div>
    `)
    .join('');

  return `
    <div class="elegant-minimal-section">
      <h2 class="elegant-minimal-section-title">skills</h2>
      ${skillsHTML}
    </div>
  `;
};
