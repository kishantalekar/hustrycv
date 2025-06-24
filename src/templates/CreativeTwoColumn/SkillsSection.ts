
export const getCreativeTwoColumnSkillsHTML = (skillItems: SkillItem[], settings: Settings) => {
  if (!skillItems || skillItems.length === 0) return '';

  const skillsHTML = skillItems
    .map(skill => `
      <div style="margin-bottom: 24pt; background: linear-gradient(135deg, #fef3c7 0%, #e0e7ff 100%); padding: 16pt; border-radius: 12pt; border: 2pt solid transparent; background-clip: padding-box;">
        <h3 style="font-size: 13pt; font-weight: 700; color: #8b5cf6; margin-bottom: 12pt; text-transform: uppercase; letter-spacing: 1px;">
          ${skill.name}
        </h3>
        <div style="display: flex; flex-wrap: wrap; gap: 8pt;">
          ${skill.keywords.map(keyword => `
            <span style="background: linear-gradient(135deg, #8b5cf6, #f59e0b); color: white; padding: 6pt 12pt; border-radius: 20pt; font-size: 10pt; font-weight: 600; box-shadow: 0 2pt 4pt rgba(139, 92, 246, 0.3);">
              ${keyword}
            </span>
          `).join('')}
        </div>
      </div>
    `)
    .join('');

  return `
    <div style="margin-bottom: 28pt;">
      <h2 style="font-size: 16pt; font-weight: 800; background: linear-gradient(135deg, #8b5cf6, #f59e0b); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 20pt; text-transform: uppercase; letter-spacing: 2px;">
        Creative Skills
      </h2>
      ${skillsHTML}
    </div>
  `;
};
