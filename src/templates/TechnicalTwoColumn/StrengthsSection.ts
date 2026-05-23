
export const getTechnicalTwoColumnStrengthsHTML = (strengthItems: StrengthItem[], settings: Settings) => {
  if (!strengthItems || strengthItems.length === 0) return '';

  const strengthsHTML = strengthItems
    .map(strength => `
      <div style="margin-bottom: 8pt; padding: 8pt 12pt; background: #333; border: 1pt solid #00ff88; border-radius: 4pt;">
        <div style="font-size: 10pt; color: #00ff88; font-weight: 500; text-align: center; font-family: 'Courier New', monospace;">
          ${strength.name}
        </div>
      </div>
    `)
    .join('');

  return `
    <div style="margin-bottom: 24pt;">
      <h2 style="font-size: 12pt; font-weight: 700; color: #00ff88; margin-bottom: 16pt; font-family: 'Courier New', monospace; border-bottom: 2pt solid #00ff88; padding-bottom: 8pt;">
        # core.strengths
      </h2>
      ${strengthsHTML}
    </div>
  `;
};
