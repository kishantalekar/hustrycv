
export const getModernGlassSkillsHTML = (skillItems: SkillItem[], settings: Settings) => {
  if (!skillItems || skillItems.length === 0) return '';

  const skillsHTML = skillItems
    .map(skill => `
      <div style="display: inline-block; margin: 0 12pt 12pt 0; padding: 8pt 16pt; background: rgba(255,255,255,0.4); backdrop-filter: blur(10pt); -webkit-backdrop-filter: blur(10pt); border-radius: 20pt; border: 1pt solid rgba(255,255,255,0.3); box-shadow: 0 2pt 8pt rgba(0,0,0,0.05);">
        <span style="font-size: 11pt; color: #1a365d; font-weight: 500;">${skill.name}</span>
        ${skill.level ? `<span style="font-size: 9pt; color: #4a5568; margin-left: 8pt;">(${skill.level})</span>` : ''}
      </div>
    `)
    .join('');

  return `
    <div class="modern-glass-section">
      <h2 class="modern-glass-section-title">Skills</h2>
      <div style="padding: 20pt; background: rgba(255,255,255,0.2); backdrop-filter: blur(15pt); -webkit-backdrop-filter: blur(15pt); border-radius: 12pt; border: 1pt solid rgba(255,255,255,0.2);">
        ${skillsHTML}
      </div>
    </div>
  `;
};
