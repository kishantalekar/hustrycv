
export const getElegantSkillsHTML = (skills: Section<SkillItem>, settings: Settings) => {
  return `
    <div class="elegant-section">
      <h2 class="elegant-section-title">Technical Skills</h2>
      <hr class="elegant-divider"/>
      <div class="elegant-skills-grid">
        ${skills.items
          .map(
            (item) => `
          <div class="elegant-skill-item">
            <div class="elegant-skill-name">${item.name}</div>
            <div class="elegant-keywords">
              ${item.keywords.map(keyword => `<span class="elegant-keyword">${keyword}</span>`).join('')}
            </div>
          </div>
        `
          )
          .join("")}
      </div>
    </div>
  `;
};
