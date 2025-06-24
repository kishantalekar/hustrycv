
export const getElegantClassicHobbiesHTML = (hobbieItems: HobbieItem[], settings: Settings) => {
  if (!hobbieItems || hobbieItems.length === 0) return '';

  const hobbiesHTML = hobbieItems
    .map(hobby => `
      <span style="display: inline-block; margin: 0 8pt 8pt 0; padding: 8pt 16pt; background: #f0f9ff; color: #1e40af; border: 1pt solid #bfdbfe; border-radius: 20pt; font-size: 11pt; font-family: 'Georgia', serif; font-style: italic;">
        ${hobby.name}
      </span>
    `)
    .join('');

  return `
    <div class="elegant-classic-section">
      <h2 class="elegant-classic-section-title">Interests & Hobbies</h2>
      <div style="padding: 16pt; background: #fafafa; border-radius: 8pt; border: 1pt solid #e5e7eb;">
        ${hobbiesHTML}
      </div>
    </div>
  `;
};
