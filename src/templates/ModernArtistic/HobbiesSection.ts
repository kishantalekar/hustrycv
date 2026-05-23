
export const getModernArtisticHobbiesHTML = (hobbieItems: HobbieItem[], settings: Settings) => {
  if (!hobbieItems || hobbieItems.length === 0) return '';

  const hobbiesHTML = hobbieItems
    .map((hobby, index) => {
      const colors = ['#ff9ff3', '#54a0ff', '#96ceb4', '#feca57'];
      const color = colors[index % colors.length];
      
      return `
        <div style="display: inline-block; margin: 0 8pt 8pt 0; padding: 6pt 12pt; background: linear-gradient(135deg, ${color}, rgba(255,255,255,0.3)); border-radius: 20pt; box-shadow: 0 2pt 8pt rgba(0,0,0,0.1);">
          <span style="font-size: 10pt; color: #2d3748; font-weight: 500;">${hobby.name}</span>
        </div>
      `;
    })
    .join('');

  return `
    <div style="margin: 32pt;">
      <h2 style="font-size: 16pt; font-weight: 700; color: #2d3748; margin-bottom: 20pt; text-transform: uppercase; letter-spacing: 1.5pt;">
        Interests
      </h2>
      <div style="padding: 16pt; background: rgba(255,255,255,0.5); border-radius: 16pt;">
        ${hobbiesHTML}
      </div>
    </div>
  `;
};
