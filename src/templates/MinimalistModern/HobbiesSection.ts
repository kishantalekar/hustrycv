
export const getMinimalistModernHobbiesHTML = (hobbieItems: HobbieItem[], settings: Settings) => {
  if (!hobbieItems || hobbieItems.length === 0) return '';

  const hobbiesHTML = hobbieItems
    .map(hobby => `
      <span style="font-size: 10pt; color: #374151; font-weight: 300; margin-right: 16pt; display: inline-block; margin-bottom: 8pt; padding: 6pt 12pt; background: #f3f4f6; border-radius: 16pt;">${hobby.name}</span>
    `)
    .join('');

  return `
    <div class="minimalist-modern-section">
      <h2 class="minimalist-modern-section-title">interests</h2>
      <div style="padding: 16pt; background: #f9fafb; border-radius: 4pt;">
        ${hobbiesHTML}
      </div>
    </div>
  `;
};
