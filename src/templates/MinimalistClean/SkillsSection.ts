
export const getMinimalistCleanSkillsHTML = (skillItems: SkillItem[], settings: Settings) => {
  if (!skillItems || skillItems.length === 0) return '';

  const skillsHTML = skillItems
    .map(skill => `
      <span style="font-size: 9pt; color: #6b7280; font-weight: 200; letter-spacing: 2px; margin-right: 24pt; display: inline-block; margin-bottom: 8pt;">${skill.name}</span>
    `)
    .join('');

  return `
    <div class="minimalist-clean-section">
      <h2 class="minimalist-clean-section-title">skills</h2>
      <div style="text-align: center;">
        ${skillsHTML}
      </div>
    </div>
  `;
};
