
export const getModernNeonReferencesHTML = (referenceItems: ReferenceItem[], settings: Settings) => {
  if (!referenceItems || referenceItems.length === 0) return '';

  const referencesHTML = referenceItems
    .map(reference => `
      <div style="margin-bottom: 16pt; padding: 16pt; background: #111111; border: 1pt solid #00ffff; border-radius: 4pt; box-shadow: 0 0 8pt #00ffff20;">
        <h3 style="font-size: 12pt; font-weight: 600; color: #00ffff; margin-bottom: 4pt; text-shadow: 0 0 5pt #00ffff;">${reference.name}</h3>
        <div style="font-size: 10pt; color: #cccccc; margin-bottom: 6pt;">${reference.position} at ${reference.company}</div>
        <div style="font-size: 10pt; color: #ffffff; opacity: 0.8;">
          ${reference.contact1}${reference.contact2 ? ` • ${reference.contact2}` : ''}
        </div>
      </div>
    `)
    .join('');

  return `
    <div style="margin: 32pt;">
      <h2 style="font-size: 16pt; font-weight: 700; color: #00ffff; margin-bottom: 20pt; text-transform: uppercase; letter-spacing: 2pt; text-shadow: 0 0 10pt #00ffff;">
        References
      </h2>
      ${referencesHTML}
    </div>
  `;
};
