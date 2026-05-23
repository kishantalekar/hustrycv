
export const getMinimalistCleanStrengthsHTML = (strengthItems: StrengthItem[], settings: Settings) => {
  if (!strengthItems || strengthItems.length === 0) return '';

  const strengthsHTML = strengthItems
    .map(strength => `
      <span style="font-size: 9pt; color: #6b7280; font-weight: 200; letter-spacing: 2px; margin-right: 24pt; display: inline-block; margin-bottom: 8pt;">${strength.name}</span>
    `)
    .join('');

  return `
    <div class="minimalist-clean-section">
      <h2 class="minimalist-clean-section-title">strengths</h2>
      <div style="text-align: center;">
        ${strengthsHTML}
      </div>
    </div>
  `;
};
