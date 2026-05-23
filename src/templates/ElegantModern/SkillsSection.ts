
export const getElegantModernSkillsHTML = (skillItems: SkillItem[], settings: Settings) => {
  if (!skillItems || skillItems.length === 0) return '';

  const skillsHTML = skillItems
    .map(skill => `
      <div style="margin-bottom: 20pt; padding: 20pt; background: linear-gradient(135deg, #f8fafc 0%, #edf2f7 100%); border-radius: 16pt; position: relative; overflow: hidden;">
        <div style="position: absolute; top: -20pt; right: -20pt; width: 80pt; height: 80pt; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; opacity: 0.1;"></div>
        <div style="position: relative; z-index: 1;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12pt;">
            <h3 style="font-size: 12pt; font-weight: 400; color: #667eea; letter-spacing: 1px;">
              ${skill.name}
            </h3>
            ${skill.level ? `
              <span style="font-size: 10pt; color: white; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 6pt 12pt; border-radius: 16pt; font-weight: 300;">
                ${skill.level}
              </span>
            ` : ''}
          </div>
          ${skill.keywords.length > 0 ? `
            <div style="font-size: 10pt; color: #718096; line-height: 1.6; font-weight: 300;">
              ${skill.keywords.join(' • ')}
            </div>
          ` : ''}
        </div>
      </div>
    `)
    .join('');

  return `
    <div class="elegant-modern-section">
      <h2 class="elegant-modern-section-title">Skills</h2>
      ${skillsHTML}
    </div>
  `;
};
