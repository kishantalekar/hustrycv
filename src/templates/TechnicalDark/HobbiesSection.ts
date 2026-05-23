
export const getTechnicalDarkHobbiesHTML = (hobbieItems: HobbieItem[], settings: Settings) => {
  if (!hobbieItems || hobbieItems.length === 0) return '';

  const hobbiesHTML = hobbieItems
    .map(hobby => `
      <span style="display: inline-block; margin: 0 8pt 8pt 0; padding: 6pt 12pt; background: #404040; color: #00ff88; border: 1pt solid #00ff88; border-radius: 4pt; font-size: 10pt; font-family: 'Courier New', monospace; font-weight: 700;">
        ${hobby.name}
      </span>
    `)
    .join('');

  return `
    <div class="technical-dark-section">
      <h2 class="technical-dark-section-title"># INTERESTS</h2>
      <div style="padding: 16pt; background: #262626; border-radius: 6pt; border: 1pt solid #404040;">
        ${hobbiesHTML}
      </div>
    </div>
  `;
};
