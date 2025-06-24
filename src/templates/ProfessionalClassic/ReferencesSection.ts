
export const getProfessionalClassicReferencesHTML = (referenceItems: ReferenceItem[], settings: Settings) => {
  if (!referenceItems || referenceItems.length === 0) return '';

  const referencesHTML = referenceItems
    .map(reference => `
      <div style="margin-bottom: 24pt; padding: 16pt; background: #f8f9fa; border-left: 3pt solid #2d3748; border-radius: 4pt;">
        <h3 style="font-size: 12pt; font-weight: 700; color: #2d3748; margin-bottom: 4pt; font-family: 'Times New Roman', serif;">
          ${reference.name}
        </h3>
        <div style="font-size: 11pt; color: #4a5568; margin-bottom: 8pt; font-family: 'Times New Roman', serif;">
          ${reference.position} • ${reference.company}
        </div>
        <div style="font-size: 10pt; color: #718096; margin-bottom: 8pt; font-family: 'Times New Roman', serif;">
          ${reference.contact1} ${reference.contact2 ? ` • ${reference.contact2}` : ''}
        </div>
        ${reference.referenceText ? `
          <div style="font-size: 10pt; color: #4a5568; font-style: italic; line-height: 1.6; font-family: 'Times New Roman', serif;">
            "${reference.referenceText}"
          </div>
        ` : ''}
      </div>
    `)
    .join('');

  return `
    <div class="professional-classic-section">
      <h2 class="professional-classic-section-title">Professional References</h2>
      ${referencesHTML}
    </div>
  `;
};
