
export const getModernNeonHobbiesHTML = (hobbieItems: HobbieItem[], settings: Settings) => {
  if (!hobbieItems || hobbieItems.length === 0) return '';

  const hobbiesHTML = hobbieItems
    .map(hobby => `
      <div style="display: inline-block; margin: 0 6pt 6pt 0; padding: 4pt 10pt; background: #111111; border: 1pt solid #00ffff; border-radius: 16pt; box-shadow: 0 0 6pt #00ffff20;">
        <span style="font-size: 9pt; color: #00ffff; font-weight: 400; text-shadow: 0 0 3pt #00ffff;">${hobby.name}</span>
      </div>
    `)
    .join('');

  return `
    <div style="margin: 32pt;">
      <h2 style="font-size: 16pt; font-weight: 700; color: #00ffff; margin-bottom: 20pt; text-transform: uppercase; letter-spacing: 2pt; text-shadow: 0 0 10pt #00ffff;">
        Interests
      </h2>
      <div style="padding: 14pt; background: #0a0a0a; border: 1pt solid #00ffff; border-radius: 6pt;">
        ${hobbiesHTML}
      </div>
    </div>
  `;
};
