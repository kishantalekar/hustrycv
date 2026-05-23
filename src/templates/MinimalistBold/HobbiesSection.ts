
export const getMinimalistBoldHobbiesHTML = (hobbieItems: HobbieItem[], settings: Settings) => {
  if (!hobbieItems || hobbieItems.length === 0) return '';

  const hobbiesHTML = hobbieItems
    .map(hobby => `
      <span style="font-size: 11pt; color: #000000; font-weight: 700; margin-right: 20pt; display: inline-block; margin-bottom: 12pt; text-transform: uppercase; letter-spacing: 1px;">${hobby.name}</span>
    `)
    .join('');

  return `
    <div class="minimalist-bold-section">
      <h2 class="minimalist-bold-section-title">INTERESTS</h2>
      <div style="padding: 20pt; border: 2pt solid #000000; text-align: center;">
        ${hobbiesHTML}
      </div>
    </div>
  `;
};
