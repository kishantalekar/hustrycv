
export const getProfessionalTwoColumnReferencesHTML = (referenceItems: ReferenceItem[], settings: Settings) => {
  if (!referenceItems || referenceItems.length === 0) return '';

  const referencesHTML = referenceItems
    .map(reference => `
      <div style="margin-bottom: 20pt; page-break-inside: avoid;">
        <h3 style="font-size: 11pt; font-weight: 600; color: #1f2937; margin-bottom: 4pt;">
          ${reference.name}
        </h3>
        <div style="font-size: 10pt; color: #2563eb; margin-bottom: 4pt;">
          ${reference.position}
        </div>
        <div style="font-size: 9pt; color: #6b7280;">
          ${reference.contact1}
        </div>
      </div>
    `)
    .join('');

  return `
    <div class="professional-two-column-section">
      <h2 class="professional-two-column-section-title">References</h2>
      ${referencesHTML}
    </div>
  `;
};
