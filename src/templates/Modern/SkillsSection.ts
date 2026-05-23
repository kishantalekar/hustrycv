
export const getModernSkillsHTML = (skills: Section<SkillItem>, settings: Settings) => {
  return `
    <div class="modern-section">
      <h2 class="modern-section-title">Skills</h2>
      ${skills.items
        .map(
          (item) => `
        <div style="margin-bottom: 20pt;">
          <div style="font-weight: 600; color: #2d3748; font-size: 11pt; margin-bottom: 10pt;">
            ${item.name}
          </div>
          <div style="display: flex; flex-wrap: wrap; gap: 8pt;">
            ${item.keywords.map((keyword, index) => `
              <span style="background: linear-gradient(135deg, ${index % 2 === 0 ? '#667eea' : '#764ba2'} 0%, ${index % 2 === 0 ? '#764ba2' : '#f093fb'} 100%); color: white; padding: 6pt 12pt; border-radius: 20pt; font-size: 9pt; font-weight: 500; box-shadow: 0 2pt 4pt rgba(102, 126, 234, 0.2);">
                ${keyword}
              </span>
            `).join('')}
          </div>
        </div>
      `
        )
        .join("")}
    </div>
  `;
};
