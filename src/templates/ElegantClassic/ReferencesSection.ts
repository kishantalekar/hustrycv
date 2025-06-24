
export const getElegantClassicReferencesHTML = (referenceItems: ReferenceItem[], settings: Settings) => {
  if (!referenceItems || referenceItems.length === 0) return '';

  const referencesHTML = referenceItems
    .map(reference => `
      <div style="margin-bottom: 24pt; padding: 20pt; background: #faf5ff; border: 2pt solid #e9d5ff; border-radius: 8pt;">
        <h3 style="font-size: 13pt; font-weight: 500; color: #5a67d8; margin-bottom: 6pt; font-family: 'Georgia', serif;">
          ${reference.name}
        </h3>
        <div style="font-size: 12pt; color: #7c3aed; margin-bottom: 8pt; font-family: 'Georgia', serif; font-style: italic;">
          ${reference.position} • ${reference.company}
        </div>
        <div style="font-size: 10pt; color: #6b7280; margin-bottom: 12pt; background: white; padding: 8pt; border-radius: 6pt;">
          ${reference.contact1} ${reference.contact2 ? ` • ${reference.contact2}` : ''}
        </div>
        ${reference.referenceText ? `
          <div style="font-size: 11pt; color: #4a5568; font-style: italic; line-height: 1.7; font-family: 'Georgia', serif; border-left: 3pt solid #5a67d8; padding-left: 16pt;">
            "${reference.referenceText}"
          </div>
        ` : ''}
      </div>
    `)
    .join('');

  return `
    <div class="elegant-classic-section">
      <h2 class="elegant-classic-section-title">References</h2>
      ${referencesHTML}
    </div>
  `;
};
