
export const getTechnicalTwoColumnHobbiesHTML = (hobbieItems: HobbieItem[], settings: Settings) => {
  if (!hobbieItems || hobbieItems.length === 0) return '';

  const hobbiesHTML = hobbieItems
    .map(hobby => `
      <span style="display: inline-block; margin: 0 6pt 6pt 0; padding: 4pt 8pt; background: #333; color: #00ff88; border-radius: 4pt; font-size: 9pt; font-family: 'Courier New', monospace; border: 1pt solid #555;">
        ${hobby.name}
      </span>
    `)
    .join('');

  return `
    <div style="margin-bottom: 24pt;">
      <h2 style="font-size: 12pt; font-weight: 700; color: #00ff88; margin-bottom: 16pt; font-family: 'Courier New', monospace; border-bottom: 2pt solid #00ff88; padding-bottom: 8pt;">
        # interests.array
      </h2>
      ${hobbiesHTML}
    </div>
  `;
};
