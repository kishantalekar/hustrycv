
export const getTechnicalBlueStrengthsHTML = (strengthItems: StrengthItem[], settings: Settings) => {
  if (!strengthItems || strengthItems.length === 0) return '';

  const strengthsHTML = strengthItems
    .map(strength => `
      <div style="display: inline-block; margin: 0 8pt 8pt 0; padding: 8pt 16pt; background: #2563eb; color: white; border-radius: 6pt; font-size: 11pt; font-family: 'Fira Code', monospace; font-weight: 600;">
        ${strength.name}
      </div>
    `)
    .join('');

  return `
    <div class="technical-blue-section">
      <h2 class="technical-blue-section-title">// CORE STRENGTHS</h2>
      <div style="padding: 16pt; background: white; border-radius: 6pt; border: 1pt solid #e5e7eb;">
        ${strengthsHTML}
      </div>
    </div>
  `;
};
