import { Section, SkillItem } from '@/types';

export const getTechStackHTML = (skills: Section<SkillItem>) => {
  if (!skills.items.length) {
    return '';
  }

  // Group skills by level
  const skillsByLevel: Record<string, SkillItem[]> = {};

  skills.items.forEach((skill) => {
    if (!skillsByLevel[skill.level]) {
      skillsByLevel[skill.level] = [];
    }
    skillsByLevel[skill.level].push(skill);
  });

  // Get level categories in order (expert, advanced, intermediate, beginner)
  const levelOrder = ['expert', 'advanced', 'intermediate', 'beginner'];
  const orderedLevels = Object.keys(skillsByLevel).sort((a, b) => {
    return levelOrder.indexOf(a) - levelOrder.indexOf(b);
  });

  return `
    <div class="section">
      <h2 class="section-title">Technical Skills</h2>
      ${orderedLevels
        .map(
          (level) => `
        <div class="tech-category">
          <h3 class="tech-category-title">${
            level.charAt(0).toUpperCase() + level.slice(1)
          }</h3>
          <div class="tech-tag-container">
            ${skillsByLevel[level]
              .map(
                (skill) => `
              <span class="tech-tag">${skill.name}</span>
              ${
                skill.keywords && skill.keywords.length
                  ? `<div class="skill-keywords">
                  ${skill.keywords.join(', ')}
                </div>`
                  : ''
              }
            `,
              )
              .join('')}
          </div>
        </div>
      `,
        )
        .join('')}
    </div>
  `;
};
