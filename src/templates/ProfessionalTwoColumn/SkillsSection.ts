
export const getProfessionalTwoColumnSkillsHTML = (skillItems: SkillItem[], settings: Settings) => {
  if (!skillItems || skillItems.length === 0) return '';

  const skillsHTML = skillItems
    .map(skill => `
      <div style="margin-bottom: 20pt;">
        <h3 style="font-size: 11pt; font-weight: 600; color: white; margin-bottom: 8pt; text-transform: uppercase; letter-spacing: 1px;">
          ${skill.name}
        </h3>
        <div style="font-size: 10pt; color: #e5e7eb; line-height: 1.5;">
          ${skill.keywords.join(' • ')}
        </div>
      </div>
    `)
    .join('');

  return `
    <div style="margin-bottom: 24pt;">
      <h2 style="font-size: 12pt; font-weight: 700; color: white; margin-bottom: 16pt; text-transform: uppercase; letter-spacing: 2px; border-bottom: 2pt solid #2563eb; padding-bottom: 8pt;">
        Technical Skills
      </h2>
      ${skillsHTML}
    </div>
  `;
};
