
export const getProfessionalModernStrengthsHTML = (strengthItems: StrengthItem[], settings: Settings) => {
  if (!strengthItems || strengthItems.length === 0) return '';

  const strengthsHTML = strengthItems
    .map(strength => `
      <div style="margin-bottom: 12pt; padding: 12pt; background: white; border-radius: 6pt; border: 1pt solid #e2e8f0; box-shadow: 0 1pt 3pt rgba(0,0,0,0.1);">
        <span style="font-size: 11pt; color: #2d3748; font-weight: 600;">${strength.name}</span>
      </div>
    `)
    .join('');

  return `
    <div class="professional-modern-section">
      <h2 class="professional-modern-section-title">Strengths</h2>
      ${strengthsHTML}
    </div>
  `;
};
