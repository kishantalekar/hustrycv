
export const getMinimalistModernStrengthsHTML = (strengthItems: StrengthItem[], settings: Settings) => {
  if (!strengthItems || strengthItems.length === 0) return '';

  const strengthsHTML = strengthItems
    .map(strength => `
      <span style="font-size: 10pt; color: #374151; font-weight: 300; margin-right: 16pt; display: inline-block; margin-bottom: 8pt; padding: 6pt 12pt; background: #f3f4f6; border-radius: 16pt;">${strength.name}</span>
    `)
    .join('');

  return `
    <div class="minimalist-modern-section">
      <h2 class="minimalist-modern-section-title">strengths</h2>
      <div style="padding: 16pt; background: #f9fafb; border-radius: 4pt;">
        ${strengthsHTML}
      </div>
    </div>
  `;
};
