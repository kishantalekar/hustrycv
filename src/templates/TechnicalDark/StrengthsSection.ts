
export const getTechnicalDarkStrengthsHTML = (strengthItems: StrengthItem[], settings: Settings) => {
  if (!strengthItems || strengthItems.length === 0) return '';

  const strengthsHTML = strengthItems
    .map(strength => `
      <div style="display: inline-block; margin: 0 8pt 8pt 0; padding: 8pt 16pt; background: #00ff88; color: #1a1a1a; border-radius: 4pt; font-size: 11pt; font-family: 'Courier New', monospace; font-weight: 700;">
        ${strength.name}
      </div>
    `)
    .join('');

  return `
    <div class="technical-dark-section">
      <h2 class="technical-dark-section-title"># CORE_STRENGTHS</h2>
      <div style="padding: 16pt; background: #262626; border-radius: 6pt; border: 1pt solid #404040;">
        ${strengthsHTML}
      </div>
    </div>
  `;
};
