
export const getProfessionalExecutiveStrengthsHTML = (strengthItems: StrengthItem[], settings: Settings) => {
  if (!strengthItems || strengthItems.length === 0) return '';

  const strengthsHTML = strengthItems
    .map(strength => `
      <div style="margin-bottom: 16pt; padding: 16pt; background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%); border-radius: 6pt; border-left: 3pt solid #1a202c;">
        <span style="font-size: 12pt; color: #1a202c; font-weight: 700; letter-spacing: 0.5px;">${strength.name}</span>
      </div>
    `)
    .join('');

  return `
    <div class="professional-executive-section">
      <h2 class="professional-executive-section-title">Leadership Strengths</h2>
      ${strengthsHTML}
    </div>
  `;
};
