
export const getTechnicalBlueHobbiesHTML = (hobbieItems: HobbieItem[], settings: Settings) => {
  if (!hobbieItems || hobbieItems.length === 0) return '';

  const hobbiesHTML = hobbieItems
    .map(hobby => `
      <span style="display: inline-block; margin: 0 8pt 8pt 0; padding: 6pt 12pt; background: #eff6ff; color: #1e40af; border: 1pt solid #3b82f6; border-radius: 6pt; font-size: 10pt; font-family: 'Fira Code', monospace; font-weight: 500;">
        ${hobby.name}
      </span>
    `)
    .join('');

  return `
    <div class="technical-blue-section">
      <h2 class="technical-blue-section-title">// INTERESTS</h2>
      <div style="padding: 16pt; background: white; border-radius: 6pt; border: 1pt solid #e5e7eb;">
        ${hobbiesHTML}
      </div>
    </div>
  `;
};
