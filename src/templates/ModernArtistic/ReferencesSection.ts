
export const getModernArtisticReferencesHTML = (referenceItems: ReferenceItem[], settings: Settings) => {
  if (!referenceItems || referenceItems.length === 0) return '';

  const referencesHTML = referenceItems
    .map((reference, index) => {
      const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1'];
      const color = colors[index % colors.length];
      
      return `
        <div style="margin-bottom: 20pt; padding: 18pt; background: rgba(255,255,255,0.8); border-radius: 12pt; border-top: 3pt solid ${color}; box-shadow: 0 5pt 18pt rgba(0,0,0,0.1); position: relative;">
          <div style="position: absolute; bottom: 8pt; right: 8pt; width: 20pt; height: 20pt; background: ${color}; border-radius: 50%; opacity: 0.2;"></div>
          <h3 style="font-size: 12pt; font-weight: 600; color: #2d3748; margin-bottom: 4pt; position: relative; z-index: 1;">${reference.name}</h3>
          <div style="font-size: 10pt; color: #4a5568; margin-bottom: 6pt; position: relative; z-index: 1;">${reference.position} at ${reference.company}</div>
          <div style="font-size: 10pt; color: #4a5568; position: relative; z-index: 1;">
            ${reference.contact1}${reference.contact2 ? ` • ${reference.contact2}` : ''}
          </div>
        </div>
      `;
    })
    .join('');

  return `
    <div style="margin: 32pt;">
      <h2 style="font-size: 16pt; font-weight: 700; color: #2d3748; margin-bottom: 20pt; text-transform: uppercase; letter-spacing: 1.5pt;">
        References
      </h2>
      ${referencesHTML}
    </div>
  `;
};
