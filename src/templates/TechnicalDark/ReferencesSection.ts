
export const getTechnicalDarkReferencesHTML = (referenceItems: ReferenceItem[], settings: Settings) => {
  if (!referenceItems || referenceItems.length === 0) return '';

  const referencesHTML = referenceItems
    .map(reference => `
      <div style="margin-bottom: 24pt; padding: 20pt; background: #262626; border: 1pt solid #404040; border-radius: 8pt; border-left: 4pt solid #9370db;">
        <h3 style="font-size: 13pt; font-weight: 700; color: #9370db; margin-bottom: 6pt; font-family: 'Courier New', monospace;">
          ${reference.name}
        </h3>
        <div style="font-size: 12pt; color: #e5e5e5; margin-bottom: 8pt; font-family: 'Courier New', monospace;">
          ${reference.position} • ${reference.company}
        </div>
        <div style="font-size: 10pt; color: #00ffff; margin-bottom: 12pt; background: #1a1a1a; padding: 8pt; border-radius: 4pt; font-family: 'Courier New', monospace;">
          ${reference.contact1} ${reference.contact2 ? ` • ${reference.contact2}` : ''}
        </div>
        ${reference.referenceText ? `
          <div style="font-size: 11pt; color: #cccccc; font-style: italic; line-height: 1.6; font-family: 'Courier New', monospace; border-left: 3pt solid #9370db; padding-left: 16pt;">
            "${reference.referenceText}"
          </div>
        ` : ''}
      </div>
    `)
    .join('');

  return `
    <div class="technical-dark-section">
      <h2 class="technical-dark-section-title"># REFERENCES</h2>
      ${referencesHTML}
    </div>
  `;
};
