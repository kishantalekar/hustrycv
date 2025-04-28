interface TechSkill {
  name: string;
  level: number;
}

interface TechCategory {
  name: string;
  skills: TechSkill[];
}

interface TechStackData {
  categories: TechCategory[];
}

export const getTechStackHTML = (techStackData: TechStackData) => {
  return `
    <div class="section">
      <h2 class="section-title">Technical Stack</h2>
      ${techStackData.categories
        .map(
          (category) => `
        <div class="tech-category">
          <h3 class="tech-category-title">${category.name}</h3>
          <div class="tech-tag-container">
            ${category.skills
              .map(
                (skill) => `
              <span class="tech-tag">${skill.name}</span>
            `
              )
              .join("")}
          </div>
        </div>
      `
        )
        .join("")}
    </div>
  `;
};
