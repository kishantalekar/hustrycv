
export const getElegantModernReferencesHTML = (referenceItems: ReferenceItem[], settings: Settings) => {
  if (!referenceItems || referenceItems.length === 0) return '';

  const referencesHTML = referenceItems
    .map(reference => `
      <div style="margin-bottom: 28pt; padding: 24pt; background: linear-gradient(135deg, #f8fafc 0%, #edf2f7 100%); border-radius: 16pt; position: relative; overflow: hidden; border: 1pt solid #e2e8f0;">
        <div style="position: absolute; top: -20pt; right: -20pt; width: 80pt; height: 80pt; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; opacity: 0.1;"></div>
        <div style="position: relative; z-index: 1;">
          <h3 style="font-size: 13pt; font-weight: 400; color: #667eea; margin-bottom: 6pt; letter-spacing: 1px;">
            ${reference.name}
          </h3>
          <div style="font-size: 12pt; color: #764ba2; margin-bottom: 8pt; font-weight: 300;">
            ${reference.position} • ${reference.company}
          </div>
          <div style="font-size: 10pt; color: #718096; margin-bottom: 12pt; background: white; padding: 8pt; border-radius: 8pt; border: 1pt solid #e2e8f0;">
            ${reference.contact1} ${reference.contact2 ? ` • ${reference.contact2}` : ''}
          </div>
          ${reference.referenceText ? `
            <div style="font-size: 11pt; color: #4a5568; font-style: italic; line-height: 1.8; font-weight: 300; border-left: 3pt solid #667eea; padding-left: 16pt;">
              "${reference.referenceText}"
            </div>
          ` : ''}
        </div>
      </div>
    `)
    .join('');

  return `
    <div class="elegant-modern-section">
      <h2 class="elegant-modern-section-title">References</h2>
      ${referencesHTML}
    </div>
  `;
};
