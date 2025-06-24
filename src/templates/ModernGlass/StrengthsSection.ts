
export const getModernGlassStrengthsHTML = (strengthItems: StrengthItem[], settings: Settings) => {
  if (!strengthItems || strengthItems.length === 0) return '';

  const strengthsHTML = strengthItems
    .map(strength => `
      <div style="display: inline-block; margin: 0 10pt 10pt 0; padding: 8pt 14pt; background: rgba(255,255,255,0.35); backdrop-filter: blur(10pt); -webkit-backdrop-filter: blur(10pt); border-radius: 18pt; border: 1pt solid rgba(255,255,255,0.3);">
        <span style="font-size: 11pt; color: #1a365d; font-weight: 500;">${strength.name}</span>
      </div>
    `)
    .join('');

  return `
    <div class="modern-glass-section">
      <h2 class="modern-glass-section-title">Strengths</h2>
      <div style="padding: 18pt; background: rgba(255,255,255,0.2); backdrop-filter: blur(12pt); -webkit-backdrop-filter: blur(12pt); border-radius: 10pt; border: 1pt solid rgba(255,255,255,0.2);">
        ${strengthsHTML}
      </div>
    </div>
  `;
};
