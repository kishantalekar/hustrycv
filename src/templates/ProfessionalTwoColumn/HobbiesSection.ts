
export const getProfessionalTwoColumnHobbiesHTML = (hobbieItems: HobbieItem[], settings: Settings) => {
  if (!hobbieItems || hobbieItems.length === 0) return '';

  const hobbiesHTML = hobbieItems
    .map(hobby => `
      <span style="display: inline-block; margin: 0 6pt 6pt 0; padding: 4pt 8pt; background: #374151; color: #e5e7eb; border-radius: 12pt; font-size: 9pt;">
        ${hobby.name}
      </span>
    `)
    .join('');

  return `
    <div style="margin-bottom: 24pt;">
      <h2 style="font-size: 12pt; font-weight: 700; color: white; margin-bottom: 16pt; text-transform: uppercase; letter-spacing: 2px; border-bottom: 2pt solid #2563eb; padding-bottom: 8pt;">
        Interests
      </h2>
      ${hobbiesHTML}
    </div>
  `;
};
