
export const getMinimalistStrengthsHTML = (strengths: Section<StrengthItem>, settings: Settings) => {
  return `
    <div class="minimalist-section">
      <h2 class="minimalist-section-title">strengths</h2>
      <div style="font-size: 10pt; color: #666666; font-weight: 300; line-height: 1.8;">
        ${strengths.items.map(item => item.name).join(" · ")}
      </div>
    </div>
  `;
};
