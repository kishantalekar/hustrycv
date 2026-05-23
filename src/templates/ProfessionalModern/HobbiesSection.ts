
export const getProfessionalModernHobbiesHTML = (hobbieItems: HobbieItem[], settings: Settings) => {
  if (!hobbieItems || hobbieItems.length === 0) return '';

  const hobbiesHTML = hobbieItems
    .map(hobby => `
      <div style="display: inline-block; margin: 0 8pt 8pt 0; padding: 6pt 12pt; background: linear-gradient(135deg, #3182ce 0%, #63b3ed 100%); border-radius: 16pt;">
        <span style="font-size: 10pt; color: white; font-weight: 500;">${hobby.name}</span>
      </div>
    `)
    .join('');

  return `
    <div class="professional-modern-section">
      <h2 class="professional-modern-section-title">Interests</h2>
      <div style="padding: 16pt; background: white; border-radius: 8pt; border: 1pt solid #e2e8f0;">
        ${hobbiesHTML}
      </div>
    </div>
  `;
};
