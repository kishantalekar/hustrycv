
export const getElegantReferencesHTML = (references: Section<ReferenceItem>, settings: Settings) => {
  return `
    <div class="elegant-section">
      <h2 class="elegant-section-title">References</h2>
      <hr class="elegant-divider"/>
      ${references.items
        .map(
          (item) => `
        <div class="elegant-item" style="margin-bottom: 16pt;">
          <div class="elegant-item-title">${item.name}</div>
          <div class="elegant-item-subtitle">${item.position} at ${item.company}</div>
          <div style="font-size: 10pt; color: #64748b; margin: 8pt 0;">
            ${item.contact1} | ${item.contact2}
          </div>
          <div style="font-size: 11pt; color: #374151; line-height: 1.6;">
            ${item.referenceText}
          </div>
        </div>
      `
        )
        .join("")}
    </div>
  `;
};
