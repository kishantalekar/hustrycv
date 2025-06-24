
export const getElegantStrengthsHTML = (strengths: Section<StrengthItem>, settings: Settings) => {
  return `
    <div class="elegant-section">
      <h2 class="elegant-section-title">Core Strengths</h2>
      <hr class="elegant-divider"/>
      <div style="display: flex; flex-wrap: wrap; gap: 8pt;">
        ${strengths.items
          .map(
            (item) => `
          <div style="background: #dbeafe; color: #1e40af; padding: 8pt 16pt; border-radius: 16px; font-size: 11pt; font-weight: 500; border: 1px solid #bfdbfe;">
            ${item.name}
          </div>
        `
          )
          .join("")}
      </div>
    </div>
  `;
};
