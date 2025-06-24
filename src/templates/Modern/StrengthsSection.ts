
export const getModernStrengthsHTML = (strengths: Section<StrengthItem>, settings: Settings) => {
  return `
    <div class="modern-section">
      <h2 class="modern-section-title">Strengths</h2>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150pt, 1fr)); gap: 12pt;">
        ${strengths.items
          .map(
            (item, index) => `
          <div style="background: linear-gradient(135deg, ${index % 2 === 0 ? '#667eea' : '#764ba2'} 0%, ${index % 2 === 0 ? '#764ba2' : '#f093fb'} 100%); color: white; padding: 16pt; border-radius: 12pt; text-align: center; font-size: 10pt; font-weight: 600; box-shadow: 0 4pt 8pt rgba(102, 126, 234, 0.2);">
            ${item.name}
          </div>
        `
          )
          .join("")}
      </div>
    </div>
  `;
};
