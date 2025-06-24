
export const getMinimalistBoldSkillsHTML = (skillItems: SkillItem[], settings: Settings) => {
  if (!skillItems || skillItems.length === 0) return '';

  const skillsHTML = skillItems
    .map(skill => `
      <span style="font-size: 11pt; color: #000000; font-weight: 700; margin-right: 20pt; display: inline-block; margin-bottom: 12pt; text-transform: uppercase; letter-spacing: 1px;">${skill.name}</span>
    `)
    .join('');

  return `
    <div class="minimalist-bold-section">
      <h2 class="minimalist-bold-section-title">SKILLS</h2>
      <div style="padding: 20pt; border: 2pt solid #000000; text-align: center;">
        ${skillsHTML}
      </div>
    </div>
  `;
};
