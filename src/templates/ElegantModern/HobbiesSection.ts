
export const getElegantModernHobbiesHTML = (hobbieItems: HobbieItem[], settings: Settings) => {
  if (!hobbieItems || hobbieItems.length === 0) return '';

  const hobbiesHTML = hobbieItems
    .map(hobby => `
      <span style="display: inline-block; margin: 0 8pt 8pt 0; padding: 10pt 16pt; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 25pt; font-size: 10pt; font-weight: 300; letter-spacing: 0.5px;">
        ${hobby.name}
      </span>
    `)
    .join('');

  return `
    <div class="elegant-modern-section">
      <h2 class="elegant-modern-section-title">Interests</h2>
      <div style="padding: 20pt; background: linear-gradient(135deg, #f8fafc 0%, #edf2f7 100%); border-radius: 16pt; position: relative; overflow: hidden;">
        <div style="position: absolute; top: -20pt; right: -20pt; width: 80pt; height: 80pt; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; opacity: 0.1;"></div>
        <div style="position: relative; z-index: 1;">
          ${hobbiesHTML}
        </div>
      </div>
    </div>
  `;
};
