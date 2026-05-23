
export const getProfessionalExecutiveSkillsHTML = (skillItems: SkillItem[], settings: Settings) => {
  if (!skillItems || skillItems.length === 0) return '';

  const skillsHTML = skillItems
    .map(skill => `
      <div style="margin-bottom: 20pt; padding: 16pt; background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%); border-radius: 8pt; border-left: 4pt solid #1a202c; position: relative;">
        <div style="position: absolute; top: 12pt; right: 12pt; width: 30pt; height: 30pt; background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%); border-radius: 50%; opacity: 0.1;"></div>
        <div style="position: relative; z-index: 1;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10pt;">
            <h3 style="font-size: 13pt; font-weight: 700; color: #1a202c; letter-spacing: 1px;">
              ${skill.name}
            </h3>
            <span style="font-size: 10pt; color: white; font-weight: 600; background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%); padding: 6pt 12pt; border-radius: 16pt; box-shadow: 0 2pt 4pt rgba(26,32,44,0.2);">
              ${skill.level}
            </span>
          </div>
          ${skill.keywords.length > 0 ? `
            <div style="font-size: 10pt; color: #4a5568; line-height: 1.6;">
              ${skill.keywords.join(' • ')}
            </div>
          ` : ''}
        </div>
      </div>
    `)
    .join('');

  return `
    <div class="professional-executive-section">
      <h2 class="professional-executive-section-title">Core Competencies</h2>
      ${skillsHTML}
    </div>
  `;
};
