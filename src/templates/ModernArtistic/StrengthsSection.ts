
export const getModernArtisticStrengthsHTML = (strengthItems: StrengthItem[], settings: Settings) => {
  if (!strengthItems || strengthItems.length === 0) return '';

  const strengthsHTML = strengthItems
    .map((strength, index) => {
      const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4'];
      const color = colors[index % colors.length];
      
      return `
        <div style="display: inline-block; margin: 0 10pt 10pt 0; padding: 8pt 14pt; background: linear-gradient(45deg, ${color}, rgba(255,255,255,0.4)); border-radius: 22pt; box-shadow: 0 3pt 10pt rgba(0,0,0,0.12);">
          <span style="font-size: 11pt; color: #2d3748; font-weight: 600;">${strength.name}</span>
        </div>
      `;
    })
    .join('');

  return `
    <div style="margin: 32pt;">
      <h2 style="font-size: 16pt; font-weight: 700; color: #2d3748; margin-bottom: 20pt; text-transform: uppercase; letter-spacing: 1.5pt;">
        Strengths
      </h2>
      <div style="padding: 18pt; background: rgba(255,255,255,0.6); border-radius: 18pt;">
        ${strengthsHTML}
      </div>
    </div>
  `;
};
