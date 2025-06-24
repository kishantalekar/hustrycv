
export const getModernGlassReferencesHTML = (referenceItems: ReferenceItem[], settings: Settings) => {
  if (!referenceItems || referenceItems.length === 0) return '';

  const referencesHTML = referenceItems
    .map(reference => `
      <div style="margin-bottom: 20pt; padding: 18pt; background: rgba(255,255,255,0.3); backdrop-filter: blur(12pt); -webkit-backdrop-filter: blur(12pt); border-radius: 10pt; border: 1pt solid rgba(255,255,255,0.2);">
        <h3 style="font-size: 12pt; font-weight: 600; color: #1a365d; margin-bottom: 4pt;">${reference.name}</h3>
        <div style="font-size: 10pt; color: #4a5568; margin-bottom: 6pt;">${reference.position} at ${reference.company}</div>
        <div style="font-size: 10pt; color: #4a5568;">
          ${reference.contact1}${reference.contact2 ? ` • ${reference.contact2}` : ''}
        </div>
      </div>
    `)
    .join('');

  return `
    <div class="modern-glass-section">
      <h2 class="modern-glass-section-title">References</h2>
      ${referencesHTML}
    </div>
  `;
};
