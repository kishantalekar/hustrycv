
export const getTechnicalMinimalStrengthsHTML = (strengthItems: StrengthItem[], settings: Settings) => {
  if (!strengthItems || strengthItems.length === 0) return '';

  const strengthsHTML = strengthItems
    .map(strength => `
      <span style="font-size: 10pt; color: #6b7280; font-family: 'Monaco', monospace; margin-right: 12pt;">${strength.name}</span>
    `)
    .join('');

  return `
    <div class="technical-minimal-section">
      <h2 class="technical-minimal-section-title">strengths</h2>
      <div style="padding: 12pt; border: 1pt solid #e5e7eb; border-radius: 4pt;">
        ${strengthsHTML}
      </div>
    </div>
  `;
};
