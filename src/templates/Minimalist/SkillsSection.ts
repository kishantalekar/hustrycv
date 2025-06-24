
export const getMinimalistSkillsHTML = (skills: Section<SkillItem>, settings: Settings) => {
  return `
    <div class="minimalist-section">
      <h2 class="minimalist-section-title">skills</h2>
      ${skills.items
        .map(
          (item) => `
        <div style="margin-bottom: 16pt;">
          <div style="font-weight: 400; color: #2c2c2c; font-size: 10pt; margin-bottom: 6pt;">
            ${item.name}
          </div>
          <div style="font-size: 10pt; color: #666666; font-weight: 300; line-height: 1.5;">
            ${item.keywords.join(" · ")}
          </div>
        </div>
      `
        )
        .join("")}
    </div>
  `;
};
