
export const getElegantClassicStrengthsHTML = (strengthItems: StrengthItem[], settings: Settings) => {
  if (!strengthItems || strengthItems.length === 0) return '';

  const strengthsHTML = strengthItems
    .map(strength => `
      <div style="display: inline-block; margin: 0 10pt 10pt 0; padding: 12pt 18pt; background: linear-gradient(135deg, #5a67d8 0%, #667eea 100%); color: white; border-radius: 25pt; font-size: 11pt; font-weight: 500; font-family: 'Georgia', serif; box-shadow: 0 4pt 8pt rgba(90, 103, 216, 0.3);">
        ${strength.name}
      </div>
    `)
    .join('');

  return `
    <div class="elegant-classic-section">
      <h2 class="elegant-classic-section-title">Core Strengths</h2>
      <div style="padding: 20pt; background: #f8fafc; border-radius: 8pt; border: 1pt solid #e2e8f0;">
        ${strengthsHTML}
      </div>
    </div>
  `;
};
