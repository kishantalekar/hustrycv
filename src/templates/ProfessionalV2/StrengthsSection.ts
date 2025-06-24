
export const getProfessionalV2StrengthsHTML = (strengths: Section<StrengthItem>, settings: Settings) => {
  return `
    <div class="professional-v2-section">
      <h2 class="professional-v2-section-title">Key Strengths</h2>
      <div style="display: flex; flex-wrap: wrap; gap: 8pt;">
        ${strengths.items
          .map(
            (item) => `
          <span style="background: #e6fffa; color: #1a365d; padding: 6pt 14pt; border-radius: 12pt; font-size: 10pt; font-weight: 500; border: 1px solid #b2f5ea;">
            ${item.name}
          </span>
        `
          )
          .join("")}
      </div>
    </div>
  `;
};
