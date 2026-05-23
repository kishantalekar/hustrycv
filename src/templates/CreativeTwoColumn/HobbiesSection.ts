
export const getCreativeTwoColumnHobbiesHTML = (hobbieItems: HobbieItem[], settings: Settings) => {
  if (!hobbieItems || hobbieItems.length === 0) return '';

  const hobbiesHTML = hobbieItems
    .map(hobby => `
      <span style="display: inline-block; margin: 0 8pt 8pt 0; padding: 8pt 14pt; background: linear-gradient(135deg, #fef3c7, #e0e7ff); color: #8b5cf6; border-radius: 20pt; font-size: 10pt; font-weight: 600; border: 2pt solid transparent; background-clip: padding-box;">
        ${hobby.name}
      </span>
    `)
    .join('');

  return `
    <div style="margin-bottom: 28pt;">
      <h2 style="font-size: 16pt; font-weight: 800; background: linear-gradient(135deg, #8b5cf6, #f59e0b); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 20pt; text-transform: uppercase; letter-spacing: 2px;">
        Creative Interests
      </h2>
      ${hobbiesHTML}
    </div>
  `;
};
