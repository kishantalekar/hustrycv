
export const getElegantMinimalStrengthsHTML = (strengthItems: StrengthItem[], settings: Settings) => {
  if (!strengthItems || strengthItems.length === 0) return '';

  const strengthsHTML = strengthItems
    .map(strength => `
      <span style="font-size: 10pt; color: #718096; font-weight: 300; letter-spacing: 1px; margin-right: 16pt;">${strength.name}</span>
    `)
    .join('');

  return `
    <div class="elegant-minimal-section">
      <h2 class="elegant-minimal-section-title">strengths</h2>
      <div style="padding-left: 20pt; border-left: 1pt solid #e2e8f0;">
        ${strengthsHTML}
      </div>
    </div>
  `;
};
