
export const getMinimalistModernSkillsHTML = (skillItems: SkillItem[], settings: Settings) => {
  if (!skillItems || skillItems.length === 0) return '';

  const skillsHTML = skillItems
    .map(skill => `
      <span style="font-size: 10pt; color: #374151; font-weight: 300; margin-right: 16pt; display: inline-block; margin-bottom: 8pt; padding: 6pt 12pt; background: #f3f4f6; border-radius: 16pt;">${skill.name}</span>
    `)
    .join('');

  return `
    <div class="minimalist-modern-section">
      <h2 class="minimalist-modern-section-title">skills</h2>
      <div style="padding: 16pt; background: #f9fafb; border-radius: 4pt;">
        ${skillsHTML}
      </div>
    </div>
  `;
};
