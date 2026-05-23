
export const getCreativeTwoColumnReferencesHTML = (referenceItems: ReferenceItem[], settings: Settings) => {
  if (!referenceItems || referenceItems.length === 0) return '';

  const referencesHTML = referenceItems
    .map(reference => `
      <div style="margin-bottom: 24pt; page-break-inside: avoid; background: linear-gradient(135deg, #e0e7ff 0%, #fef3c7 100%); padding: 20pt; border-radius: 12pt; border-left: 6pt solid #f59e0b; box-shadow: 0 4pt 8pt rgba(245, 158, 11, 0.1);">
        <h3 style="font-size: 13pt; font-weight: 700; color: #8b5cf6; margin-bottom: 6pt;">
          ${reference.name}
        </h3>
        <div style="font-size: 11pt; color: #f59e0b; margin-bottom: 6pt; font-weight: 600;">
          ${reference.position}
        </div>
        <div style="font-size: 10pt; color: #6b7280; font-weight: 500;">
          ${reference.contact1}
        </div>
      </div>
    `)
    .join('');

  return `
    <div class="creative-two-column-section">
      <h2 class="creative-two-column-section-title">Professional References</h2>
      ${referencesHTML}
    </div>
  `;
};
