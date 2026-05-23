
export const getProfessionalExecutiveReferencesHTML = (referenceItems: ReferenceItem[], settings: Settings) => {
  if (!referenceItems || referenceItems.length === 0) return '';

  const referencesHTML = referenceItems
    .map(reference => `
      <div style="margin-bottom: 28pt; padding: 20pt; background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%); border-radius: 8pt; border-left: 4pt solid #1a202c; position: relative;">
        <div style="position: absolute; top: 16pt; right: 16pt; width: 40pt; height: 40pt; background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%); border-radius: 50%; opacity: 0.1;"></div>
        <div style="position: relative; z-index: 1;">
          <h3 style="font-size: 13pt; font-weight: 700; color: #1a202c; margin-bottom: 6pt; letter-spacing: 0.5px;">
            ${reference.name}
          </h3>
          <div style="font-size: 11pt; color: #2d3748; margin-bottom: 10pt; font-weight: 500;">
            ${reference.position} • ${reference.company}
          </div>
          <div style="font-size: 10pt; color: #4a5568; margin-bottom: 10pt; background: white; padding: 8pt; border-radius: 6pt;">
            ${reference.contact1} ${reference.contact2 ? ` • ${reference.contact2}` : ''}
          </div>
          ${reference.referenceText ? `
            <div style="font-size: 10pt; color: #2d3748; font-style: italic; line-height: 1.7;">
              "${reference.referenceText}"
            </div>
          ` : ''}
        </div>
      </div>
    `)
    .join('');

  return `
    <div class="professional-executive-section">
      <h2 class="professional-executive-section-title">Executive References</h2>
      ${referencesHTML}
    </div>
  `;
};
