
export const getProfessionalModernSkillsHTML = (skillItems: SkillItem[], settings: Settings) => {
  if (!skillItems || skillItems.length === 0) return '';

  const skillsHTML = skillItems
    .map(skill => `
      <div style="margin-bottom: 16pt; padding: 16pt; background: white; border-radius: 8pt; border: 1pt solid #e2e8f0; box-shadow: 0 2pt 4pt rgba(0,0,0,0.05);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8pt;">
          <h3 style="font-size: 12pt; font-weight: 600; color: #2d3748;">
            ${skill.name}
          </h3>
          <span style="font-size: 10pt; color: white; font-weight: 500; background: linear-gradient(135deg, #3182ce 0%, #63b3ed 100%); padding: 4pt 10pt; border-radius: 12pt;">
            ${skill.level}
          </span>
        </div>
        ${skill.keywords.length > 0 ? `
          <div style="font-size: 10pt; color: #718096; line-height: 1.5;">
            ${skill.keywords.join(' • ')}
          </div>
        ` : ''}
      </div>
    `)
    .join('');

  return `
    <div class="professional-modern-section">
      <h2 class="professional-modern-section-title">Skills</h2>
      ${skillsHTML}
    </div>
  `;
};
