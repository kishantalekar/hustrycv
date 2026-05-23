
export const getModernReferencesHTML = (references: Section<ReferenceItem>, settings: Settings) => {
  return `
    <div class="modern-section">
      <h2 class="modern-section-title">References</h2>
      ${references.items
        .map(
          (item) => `
        <div class="modern-item">
          <div class="modern-item-title">${item.name}</div>
          <div class="modern-item-subtitle">${item.position} • ${item.company}</div>
          <div style="font-size: 9pt; color: #718096; margin: 8pt 0; font-weight: 500;">
            ${item.contact1} • ${item.contact2}
          </div>
          <div style="font-size: 10pt; color: #4a5568; line-height: 1.7; font-style: italic; padding: 12pt; background: rgba(102, 126, 234, 0.05); border-radius: 8pt; border-left: 3pt solid #667eea;">
            "${item.referenceText}"
          </div>
        </div>
      `
        )
        .join("")}
    </div>
  `;
};
