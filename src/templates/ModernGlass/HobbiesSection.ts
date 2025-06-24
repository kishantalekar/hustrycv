
export const getModernGlassHobbiesHTML = (hobbieItems: HobbieItem[], settings: Settings) => {
  if (!hobbieItems || hobbieItems.length === 0) return '';

  const hobbiesHTML = hobbieItems
    .map(hobby => `
      <div style="display: inline-block; margin: 0 8pt 8pt 0; padding: 6pt 12pt; background: rgba(255,255,255,0.3); backdrop-filter: blur(8pt); -webkit-backdrop-filter: blur(8pt); border-radius: 16pt; border: 1pt solid rgba(255,255,255,0.2);">
        <span style="font-size: 10pt; color: #1a365d; font-weight: 500;">${hobby.name}</span>
      </div>
    `)
    .join('');

  return `
    <div class="modern-glass-section">
      <h2 class="modern-glass-section-title">Interests</h2>
      <div style="padding: 16pt; background: rgba(255,255,255,0.2); backdrop-filter: blur(12pt); -webkit-backdrop-filter: blur(12pt); border-radius: 10pt; border: 1pt solid rgba(255,255,255,0.2);">
        ${hobbiesHTML}
      </div>
    </div>
  `;
};
