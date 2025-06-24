
export const getTechnicalMinimalReferencesHTML = (referenceItems: ReferenceItem[], settings: Settings) => {
  if (!referenceItems || referenceItems.length === 0) return '';

  const referencesHTML = referenceItems
    .map(reference => `
      <div style="margin-bottom: 24pt; padding: 16pt; border: 1pt solid #e5e7eb; border-radius: 4pt;">
        <div style="border-bottom: 1pt solid #f3f4f6; padding-bottom: 6pt; margin-bottom: 8pt;">
          <h3 style="font-size: 11pt; font-weight: 400; color: #374151; margin-bottom: 2pt; font-family: 'Monaco', monospace;">
            ${reference.name}
          </h3>
          <div style="font-size: 10pt; color: #6b7280; margin-bottom: 4pt; font-family: 'Monaco', monospace;">
            ${reference.position} | ${reference.company}
          </div>
          <div style="font-size: 9pt; color: #9ca3af; font-family: 'Monaco', monospace;">
            ${reference.contact1} ${reference.contact2 ? ` | ${reference.contact2}` : ''}
          </div>
        </div>
        ${reference.referenceText ? `
          <div style="font-size: 10pt; color: #4b5563; font-style: italic; line-height: 1.7; font-family: 'Monaco', monospace;">
            "${reference.referenceText}"
          </div>
        ` : ''}
      </div>
    `)
    .join('');

  return `
    <div class="technical-minimal-section">
      <h2 class="technical-minimal-section-title">references</h2>
      ${referencesHTML}
    </div>
  `;
};
