
export const getTechnicalMinimalHobbiesHTML = (hobbieItems: HobbieItem[], settings: Settings) => {
  if (!hobbieItems || hobbieItems.length === 0) return '';

  const hobbiesHTML = hobbieItems
    .map(hobby => `
      <span style="font-size: 10pt; color: #6b7280; font-family: 'Monaco', monospace; margin-right: 12pt;">${hobby.name}</span>
    `)
    .join('');

  return `
    <div class="technical-minimal-section">
      <h2 class="technical-minimal-section-title">interests</h2>
      <div style="padding: 12pt; border: 1pt solid #e5e7eb; border-radius: 4pt;">
        ${hobbiesHTML}
      </div>
    </div>
  `;
};
