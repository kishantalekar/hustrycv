
export const getMinimalistCleanHobbiesHTML = (hobbieItems: HobbieItem[], settings: Settings) => {
  if (!hobbieItems || hobbieItems.length === 0) return '';

  const hobbiesHTML = hobbieItems
    .map(hobby => `
      <span style="font-size: 9pt; color: #6b7280; font-weight: 200; letter-spacing: 2px; margin-right: 24pt; display: inline-block; margin-bottom: 8pt;">${hobby.name}</span>
    `)
    .join('');

  return `
    <div class="minimalist-clean-section">
      <h2 class="minimalist-clean-section-title">interests</h2>
      <div style="text-align: center;">
        ${hobbiesHTML}
      </div>
    </div>
  `;
};
