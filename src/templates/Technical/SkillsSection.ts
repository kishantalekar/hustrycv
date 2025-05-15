export const getSkillsHTML = (skills: Section<SkillItem>): string => {
  if (!skills.items.length) {
    return '';
  }

  // Group skills by category if available
  const skillsByCategory: Record<string, string[]> = {};

  skills.items.forEach(item => {
    const category = item.category || 'Other';
    if (!skillsByCategory[category]) {
      skillsByCategory[category] = [];
    }
    skillsByCategory[category].push(item.name || '');
  });

  const categories = Object.keys(skillsByCategory);

  if (categories.length > 0) {
    // Render skills grouped by category
    return `
      <div class="section">
        <h2 class="section-title">${skills.title || 'Skills'}</h2>
        ${categories
          .map(
            category => `
          <div class="skill-category">
            <div class="skill-category-name">${category}</div>
            <div class="skill-items">
              ${skillsByCategory[category]
                .map(
                  skill => `
                <div class="skill-item">${skill}</div>
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
  } else {
    // Fallback to flat list if no categories
    return `
      <div class="section">
        <h2 class="section-title">${skills.title || 'Skills'}</h2>
        <div class="skill-items">
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
  }
};
