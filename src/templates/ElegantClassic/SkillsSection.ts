
export const getElegantClassicSkillsHTML = (skillItems: SkillItem[], settings: Settings) => {
  if (!skillItems || skillItems.length === 0) return '';

  const skillsHTML = skillItems
    .map(skill => `
      <div style="margin-bottom: 18pt; padding: 16pt; background: #faf5ff; border: 1pt solid #e9d5ff; border-radius: 8pt;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10pt;">
          <h3 style="font-size: 12pt; font-weight: 500; color: #5a67d8; font-family: 'Georgia', serif;">
            ${skill.name}
          </h3>
          ${skill.level ? `
            <span style="font-size: 10pt; color: white; background: #5a67d8; padding: 4pt 12pt; border-radius: 16pt; font-family: 'Georgia', serif;">
              ${skill.level}
            </span>
          ` : ''}
        </div>
        ${skill.keywords.length > 0 ? `
          <div style="font-size: 11pt; color: #6b7280; line-height: 1.6; font-family: 'Georgia', serif; font-style: italic;">
            ${skill.keywords.join(' • ')}
          </div>
        ` : ''}
      </div>
    `)
    .join('');

  return `
    <div class="elegant-classic-section">
      <h2 class="elegant-classic-section-title">Skills & Expertise</h2>
      ${skillsHTML}
    </div>
  `;
};
