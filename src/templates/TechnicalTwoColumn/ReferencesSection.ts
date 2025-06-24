
export const getTechnicalTwoColumnReferencesHTML = (referenceItems: ReferenceItem[], settings: Settings) => {
  if (!referenceItems || referenceItems.length === 0) return '';

  const referencesHTML = referenceItems
    .map(reference => `
      <div style="margin-bottom: 20pt; page-break-inside: avoid; background: #1a1a1a; padding: 16pt; border-radius: 4pt; border-left: 4pt solid #00ff88;">
        <h3 style="font-size: 11pt; font-weight: 600; color: #00ff88; margin-bottom: 4pt; font-family: 'Courier New', monospace;">
          ${reference.name}
        </h3>
        <div style="font-size: 10pt; color: #ccc; margin-bottom: 4pt; font-family: 'Courier New', monospace;">
          role: ${reference.position}
        </div>
        <div style="font-size: 9pt; color: #888; font-family: 'Courier New', monospace;">
          contact: ${reference.contact1}
        </div>
      </div>
    `)
    .join('');

  return `
    <div class="technical-two-column-section">
      <h2 class="technical-two-column-section-title">// references.contacts</h2>
      ${referencesHTML}
    </div>
  `;
};
