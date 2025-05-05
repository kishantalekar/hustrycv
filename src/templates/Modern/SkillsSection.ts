import { Section, SkillItem } from "@/types";

export const getSkillsHTML = (skills: Section<SkillItem>): string => {
  if (!skills.items.length) return "";

  return `
    <div class="section">
      <h2 class="section-title">Skills</h2>
      <div class="skills-list">
        ${skills.items
          .map(
            (item) => `
          <div class="skill-category">
            <div class="skill-category-name">${item.name || ""}</div>
            ${
              item.keywords && item.keywords.length
                ? `
              <div class="skill-keywords">
                ${item.keywords
                  .map(
                    (keyword) => `<span class="skill-keyword">${keyword}</span>`
                  )
                  .join("")}
              </div>
            `
                : ""
            }
          </div>
        `
          )
          .join("")}
      </div>
    </div>
  `;
};
