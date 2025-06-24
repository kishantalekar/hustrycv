
export const getModernNeonSkillsHTML = (skillItems: SkillItem[], settings: Settings) => {
  if (!skillItems || skillItems.length === 0) return '';

  const skillsHTML = skillItems
    .map(skill => `
      <div style="display: inline-block; margin: 0 8pt 8pt 0; padding: 6pt 12pt; background: #111111; border: 1pt solid #00ffff; border-radius: 20pt; box-shadow: 0 0 8pt #00ffff30;">
        <span style="font-size: 10pt; color: #00ffff; font-weight: 500; text-shadow: 0 0 5pt #00ffff;">${skill.name}</span>
        ${skill.level ? `<span style="font-size: 9pt; color: #cccccc; margin-left: 6pt;">(${skill.level})</span>` : ''}
      </div>
    `)
    .join('');

  return `
    <div style="margin: 32pt;">
      <h2 style="font-size: 16pt; font-weight: 700; color: #00ffff; margin-bottom: 20pt; text-transform: uppercase; letter-spacing: 2pt; text-shadow: 0 0 10pt #00ffff;">
        Skills
      </h2>
      <div style="padding: 16pt; background: #0a0a0a; border: 1pt solid #00ffff; border-radius: 8pt;">
        ${skillsHTML}
      </div>
    </div>
  `;
};
