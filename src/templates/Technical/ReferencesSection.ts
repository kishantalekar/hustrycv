
export const getTechnicalReferencesHTML = (references: Section<ReferenceItem>, settings: Settings) => {
  return `
    <div class="technical-section">
      <h2 class="technical-section-title">References</h2>
      ${references.items
        .map(
          (item) => `
        <div class="technical-item">
          <div class="technical-item-title">${item.name}</div>
          <div class="technical-item-subtitle">${item.position} • ${item.company}</div>
          <div style="font-size: 9pt; color: #6b7280; margin: 8pt 0; font-family: 'JetBrains Mono', monospace;">
            ${item.contact1} | ${item.contact2}
          </div>
          <div style="font-size: 10pt; color: #4b5563; line-height: 1.6; font-style: italic;">
            "${item.referenceText}"
          </div>
        </div>
      `
        )
        .join("")}
    </div>
  `;
};
