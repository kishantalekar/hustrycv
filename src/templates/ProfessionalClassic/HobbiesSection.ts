
export const getProfessionalClassicHobbiesHTML = (hobbieItems: HobbieItem[], settings: Settings) => {
  if (!hobbieItems || hobbieItems.length === 0) return '';

  const hobbiesHTML = hobbieItems
    .map(hobby => `
      <div style="display: inline-block; margin: 0 12pt 12pt 0; padding: 8pt 16pt; background: white; border: 2pt solid #2d3748; border-radius: 20pt;">
        <span style="font-size: 11pt; color: #2d3748; font-weight: 600; font-family: 'Times New Roman', serif;">${hobby.name}</span>
      </div>
    `)
    .join('');

  return `
    <div class="professional-classic-section">
      <h2 class="professional-classic-section-title">Interests & Activities</h2>
      <div style="padding: 16pt; background: #f8f9fa; border-radius: 6pt;">
        ${hobbiesHTML}
      </div>
    </div>
  `;
};
