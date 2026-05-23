
export const getMinimalistBoldReferencesHTML = (referenceItems: ReferenceItem[], settings: Settings) => {
  if (!referenceItems || referenceItems.length === 0) return '';

  const referencesHTML = referenceItems
    .map(reference => `
      <div style="margin-bottom: 24pt; page-break-inside: avoid; padding: 20pt; border: 2pt solid #000000; text-align: center;">
        <h3 style="font-size: 12pt; font-weight: 700; color: #000000; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 8pt;">${reference.name}</h3>
        <div style="font-size: 11pt; color: #374151; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6pt;">${reference.position}</div>
        <div style="font-size: 10pt; color: #374151; font-weight: 600;">${reference.contact1}</div>
      </div>
    `)
    .join('');

  return `
    <div class="minimalist-bold-section">
      <h2 class="minimalist-bold-section-title">REFERENCES</h2>
      ${referencesHTML}
    </div>
  `;
};
