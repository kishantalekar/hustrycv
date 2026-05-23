
export const getModernArtisticSkillsHTML = (skillItems: SkillItem[], settings: Settings) => {
  if (!skillItems || skillItems.length === 0) return '';

  const skillsHTML = skillItems
    .map((skill, index) => {
      const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
      const color = colors[index % colors.length];
      
      return `
        <div style="display: inline-block; margin: 0 12pt 12pt 0; padding: 8pt 16pt; background: ${color}; color: white; border-radius: 25pt; box-shadow: 0 4pt 16pt rgba(0,0,0,0.15); transform: rotate(${(index % 3 - 1) * 2}deg);">
          <span style="font-size: 11pt; font-weight: 500;">${skill.name}</span>
          ${skill.level ? `<span style="font-size: 9pt; margin-left: 8pt; opacity: 0.8;">(${skill.level})</span>` : ''}
        </div>
      `;
    })
    .join('');

  return `
    <div style="margin: 32pt; position: relative;">
      <div style="position: absolute; top: -20pt; left: -30pt; width: 70pt; height: 70pt; background: linear-gradient(45deg, #ff6b6b, #4ecdc4); border-radius: 50%; opacity: 0.1;"></div>
      <h2 style="font-size: 16pt; font-weight: 700; color: #2d3748; margin-bottom: 20pt; text-transform: uppercase; letter-spacing: 1.5pt; position: relative; z-index: 1;">
        Skills
      </h2>
      <div style="padding: 20pt; background: rgba(255,255,255,0.6); border-radius: 20pt; position: relative; z-index: 1;">
        ${skillsHTML}
      </div>
    </div>
  `;
};
