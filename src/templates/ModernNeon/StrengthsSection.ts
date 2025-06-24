
export const getModernNeonStrengthsHTML = (strengthItems: StrengthItem[], settings: Settings) => {
  if (!strengthItems || strengthItems.length === 0) return '';

  const strengthsHTML = strengthItems
    .map(strength => `
      <div style="display: inline-block; margin: 0 8pt 8pt 0; padding: 6pt 12pt; background: #111111; border: 1pt solid #00ffff; border-radius: 18pt; box-shadow: 0 0 8pt #00ffff25;">
        <span style="font-size: 10pt; color: #00ffff; font-weight: 500; text-shadow: 0 0 4pt #00ffff;">${strength.name}</span>
      </div>
    `)
    .join('');

  return `
    <div style="margin: 32pt;">
      <h2 style="font-size: 16pt; font-weight: 700; color: #00ffff; margin-bottom: 20pt; text-transform: uppercase; letter-spacing: 2pt; text-shadow: 0 0 10pt #00ffff;">
        Strengths
      </h2>
      <div style="padding: 16pt; background: #0a0a0a; border: 1pt solid #00ffff; border-radius: 6pt;">
        ${strengthsHTML}
      </div>
    </div>
  `;
};
