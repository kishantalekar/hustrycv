
export const getMinimalistCleanReferencesHTML = (referenceItems: ReferenceItem[], settings: Settings) => {
  if (!referenceItems || referenceItems.length === 0) return '';

  const referencesHTML = referenceItems
    .map(reference => `
      <div style="margin-bottom: 24pt; page-break-inside: avoid; text-align: center;">
        <h3 style="font-size: 10pt; font-weight: 200; color: #111827; letter-spacing: 2px; margin-bottom: 6pt;">${reference.name}</h3>
        <div style="font-size: 9pt; color: #6b7280; font-weight: 100; letter-spacing: 2px; margin-bottom: 4pt;">${reference.position}</div>
        <div style="font-size: 8pt; color: #9ca3af; font-weight: 100; letter-spacing: 2px;">${reference.contact1}</div>
      </div>
    `)
    .join('');

  return `
    <div class="minimalist-clean-section">
      <h2 class="minimalist-clean-section-title">references</h2>
      ${referencesHTML}
    </div>
  `;
};
