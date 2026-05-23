
export const getProfessionalExecutiveHobbiesHTML = (hobbieItems: HobbieItem[], settings: Settings) => {
  if (!hobbieItems || hobbieItems.length === 0) return '';

  const hobbiesHTML = hobbieItems
    .map(hobby => `
      <div style="display: inline-block; margin: 0 8pt 8pt 0; padding: 8pt 16pt; background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%); border-radius: 20pt; box-shadow: 0 2pt 4pt rgba(26,32,44,0.2);">
        <span style="font-size: 10pt; color: white; font-weight: 500;">${hobby.name}</span>
      </div>
    `)
    .join('');

  return `
    <div class="professional-executive-section">
      <h2 class="professional-executive-section-title">Personal Interests</h2>
      <div style="padding: 20pt; background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%); border-radius: 8pt; border-left: 4pt solid #1a202c;">
        ${hobbiesHTML}
      </div>
    </div>
  `;
};
