export const getSkillsHTML = (skills: Section<SkillItem>): string => {
  if (!skills.items.length) {
    return '';
  }

  return `
    <div class="section">
      <h2 class="section-title">${skills.title || 'Skills'}</h2>
      <div class="skills-list">
        ${skills.items
          .map(
            item => `
          <div class="skill-item">${item.name || ''}</div>
        `,
          )
          .join('')}
      </div>
    </div>
  `;
};
