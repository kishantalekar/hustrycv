
export const getModernCorporateStrengthsHTML = (strengths: Section<StrengthItem>, settings: Settings) => {
  return `
    <div class="modern-corporate-section">
      <h2 class="modern-corporate-section-title">Core Strengths</h2>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160pt, 1fr)); gap: 12pt;">
        ${strengths.items
          .map(
            (item) => `
          <div style="background: linear-gradient(135deg, #3182ce 0%, #2c5282 100%); color: white; padding: 18pt; border-radius: 6pt; text-align: center; font-size: 10pt; font-weight: 600; box-shadow: 0 4pt 8pt rgba(49, 130, 206, 0.2);">
            ${item.name}
          </div>
        `
          )
          .join("")}
      </div>
    </div>
  `;
};
