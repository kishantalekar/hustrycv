
export const getMinimalistModernReferencesHTML = (referenceItems: ReferenceItem[], settings: Settings) => {
  if (!referenceItems || referenceItems.length === 0) return '';

  const referencesHTML = referenceItems
    .map(reference => `
      <div style="margin-bottom: 16pt; page-break-inside: avoid; padding: 16pt; background: #f9fafb; border-radius: 4pt;">
        <h3 style="font-size: 11pt; font-weight: 400; color: #1f2937; letter-spacing: 1px; margin-bottom: 6pt;">${reference.name}</h3>
        <div style="font-size: 10pt; color: #4f46e5; font-weight: 300; margin-bottom: 4pt;">${reference.position}</div>
        <div style="font-size: 9pt; color: #6b7280; font-weight: 300;">${reference.contact1}</div>
      </div>
    `)
    .join('');

  return `
    <div class="minimalist-modern-section">
      <h2 class="minimalist-modern-section-title">references</h2>
      ${referencesHTML}
    </div>
  `;
};
