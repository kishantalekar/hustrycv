
export const getProfessionalClassicStrengthsHTML = (strengthItems: StrengthItem[], settings: Settings) => {
  if (!strengthItems || strengthItems.length === 0) return '';

  const strengthsHTML = strengthItems
    .map(strength => `
      <div style="margin-bottom: 12pt; padding: 12pt; background: #f8f9fa; border-left: 3pt solid #2d3748; border-radius: 4pt;">
        <span style="font-size: 12pt; color: #2d3748; font-weight: 600; font-family: 'Times New Roman', serif;">${strength.name}</span>
      </div>
    `)
    .join('');

  return `
    <div class="professional-classic-section">
      <h2 class="professional-classic-section-title">Core Strengths</h2>
      ${strengthsHTML}
    </div>
  `;
};
