
export const getProfessionalModernReferencesHTML = (referenceItems: ReferenceItem[], settings: Settings) => {
  if (!referenceItems || referenceItems.length === 0) return '';

  const referencesHTML = referenceItems
    .map(reference => `
      <div style="margin-bottom: 24pt; padding: 20pt; background: white; border-radius: 8pt; border: 1pt solid #e2e8f0; box-shadow: 0 2pt 4pt rgba(0,0,0,0.05);">
        <h3 style="font-size: 12pt; font-weight: 600; color: #2d3748; margin-bottom: 6pt;">
          ${reference.name}
        </h3>
        <div style="font-size: 11pt; color: #3182ce; margin-bottom: 8pt; font-weight: 500;">
          ${reference.position} • ${reference.company}
        </div>
        <div style="font-size: 10pt; color: #718096; margin-bottom: 8pt; background: #f7fafc; padding: 8pt; border-radius: 6pt;">
          ${reference.contact1} ${reference.contact2 ? ` • ${reference.contact2}` : ''}
        </div>
        ${reference.referenceText ? `
          <div style="font-size: 10pt; color: #4a5568; font-style: italic; line-height: 1.6;">
            "${reference.referenceText}"
          </div>
        ` : ''}
      </div>
    `)
    .join('');

  return `
    <div class="professional-modern-section">
      <h2 class="professional-modern-section-title">References</h2>
      ${referencesHTML}
    </div>
  `;
};
