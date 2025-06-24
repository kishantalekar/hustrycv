
export const getTechnicalBlueReferencesHTML = (referenceItems: ReferenceItem[], settings: Settings) => {
  if (!referenceItems || referenceItems.length === 0) return '';

  const referencesHTML = referenceItems
    .map(reference => `
      <div style="margin-bottom: 24pt; padding: 20pt; background: white; border: 2pt solid #3b82f6; border-radius: 8pt; box-shadow: 0 4pt 8pt rgba(59, 130, 246, 0.1);">
        <h3 style="font-size: 13pt; font-weight: 600; color: #1e40af; margin-bottom: 6pt; font-family: 'Fira Code', monospace;">
          ${reference.name}
        </h3>
        <div style="font-size: 12pt; color: #2563eb; margin-bottom: 8pt; font-family: 'Fira Code', monospace;">
          ${reference.position} • ${reference.company}
        </div>
        <div style="font-size: 10pt; color: white; background: #1e40af; margin-bottom: 12pt; padding: 8pt; border-radius: 4pt; font-family: 'Fira Code', monospace;">
          ${reference.contact1} ${reference.contact2 ? ` • ${reference.contact2}` : ''}
        </div>
        ${reference.referenceText ? `
          <div style="font-size: 11pt; color: #1e40af; font-style: italic; line-height: 1.6; font-family: 'Fira Code', monospace; border-left: 3pt solid #2563eb; padding-left: 16pt;">
            "${reference.referenceText}"
          </div>
        ` : ''}
      </div>
    `)
    .join('');

  return `
    <div class="technical-blue-section">
      <h2 class="technical-blue-section-title">// REFERENCES</h2>
      ${referencesHTML}
    </div>
  `;
};
