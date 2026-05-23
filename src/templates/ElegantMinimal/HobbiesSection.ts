
export const getElegantMinimalHobbiesHTML = (hobbieItems: HobbieItem[], settings: Settings) => {
  if (!hobbieItems || hobbieItems.length === 0) return '';

  const hobbiesHTML = hobbieItems
    .map(hobby => `
      <span style="font-size: 10pt; color: #718096; font-weight: 300; letter-spacing: 1px; margin-right: 16pt;">${hobby.name}</span>
    `)
    .join('');

  return `
    <div class="elegant-minimal-section">
      <h2 class="elegant-minimal-section-title">interests</h2>
      <div style="padding-left: 20pt; border-left: 1pt solid #e2e8f0;">
        ${hobbiesHTML}
      </div>
    </div>
  `;
};
