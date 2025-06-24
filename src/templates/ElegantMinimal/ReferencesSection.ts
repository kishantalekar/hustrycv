
export const getElegantMinimalReferencesHTML = (referenceItems: ReferenceItem[], settings: Settings) => {
  if (!referenceItems || referenceItems.length === 0) return '';

  const referencesHTML = referenceItems
    .map(reference => `
      <div style="margin-bottom: 32pt;">
        <div style="border-bottom: 1pt solid #f1f5f9; padding-bottom: 8pt; margin-bottom: 12pt;">
          <h3 style="font-size: 11pt; font-weight: 300; color: #2d3748; margin-bottom: 2pt; letter-spacing: 2px;">
            ${reference.name}
          </h3>
          <div style="font-size: 10pt; color: #718096; margin-bottom: 4pt; font-weight: 300; letter-spacing: 1px;">
            ${reference.position} • ${reference.company}
          </div>
          <div style="font-size: 9pt; color: #a0aec0; font-weight: 300; letter-spacing: 1px;">
            ${reference.contact1} ${reference.contact2 ? ` • ${reference.contact2}` : ''}
          </div>
        </div>
        ${reference.referenceText ? `
          <div style="font-size: 10pt; color: #4a5568; font-style: italic; line-height: 1.9; font-weight: 300; padding-left: 16pt;">
            "${reference.referenceText}"
          </div>
        ` : ''}
      </div>
    `)
    .join('');

  return `
    <div class="elegant-minimal-section">
      <h2 class="elegant-minimal-section-title">references</h2>
      ${referencesHTML}
    </div>
  `;
};
