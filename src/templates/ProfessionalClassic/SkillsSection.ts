
export const getProfessionalClassicSkillsHTML = (skillItems: SkillItem[], settings: Settings) => {
  if (!skillItems || skillItems.length === 0) return '';

  const skillsHTML = skillItems
    .map(skill => `
      <div style="margin-bottom: 16pt; padding: 12pt; background: #f8f9fa; border-left: 3pt solid #2d3748; border-radius: 4pt;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8pt;">
          <h3 style="font-size: 12pt; font-weight: 700; color: #2d3748; font-family: 'Times New Roman', serif;">
            ${skill.name}
          </h3>
          <span style="font-size: 10pt; color: #4a5568; font-weight: 600; background: white; padding: 4pt 8pt; border-radius: 12pt; border: 1pt solid #e2e8f0; font-family: 'Times New Roman', serif;">
            ${skill.level}
          </span>
        </div>
        ${skill.keywords.length > 0 ? `
          <div style="font-size: 10pt; color: #718096; font-family: 'Times New Roman', serif;">
            ${skill.keywords.join(' • ')}
          </div>
        ` : ''}
      </div>
    `)
    .join('');

  return `
    <div class="professional-classic-section">
      <h2 class="professional-classic-section-title">Skills & Competencies</h2>
      ${skillsHTML}
    </div>
  `;
};
