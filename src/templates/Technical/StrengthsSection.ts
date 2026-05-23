
export const getTechnicalStrengthsHTML = (strengths: Section<StrengthItem>, settings: Settings) => {
  return `
    <div class="technical-section">
      <h2 class="technical-section-title">Core Strengths</h2>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180pt, 1fr)); gap: 12pt;">
        ${strengths.items
          .map(
            (item) => `
          <div style="background: #059669; color: white; padding: 12pt; border-radius: 6pt; text-align: center; font-size: 10pt; font-weight: 500;">
            ${item.name}
          </div>
        `
          )
          .join("")}
      </div>
    </div>
  `;
};
