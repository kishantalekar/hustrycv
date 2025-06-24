
export const getProfessionalV2SkillsHTML = (skills: Section<SkillItem>, settings: Settings) => {
  return `
    <div class="professional-v2-section">
      <h2 class="professional-v2-section-title">Core Competencies</h2>
      ${skills.items
        .map(
          (item) => `
        <div class="professional-v2-skills-section">
          <div class="professional-v2-skill-category">${item.name}:</div>
          <div class="professional-v2-skill-list">${item.keywords.join(", ")}</div>
        </div>
      `
        )
        .join("")}
    </div>
  `;
};
