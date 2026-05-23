
export const getModernCorporateReferencesHTML = (references: Section<ReferenceItem>, settings: Settings) => {
  return `
    <div class="modern-corporate-section">
      <h2 class="modern-corporate-section-title">Professional References</h2>
      ${references.items
        .map(
          (item) => `
        <div class="modern-corporate-item">
          <div class="modern-corporate-item-title">${item.name}</div>
          <div class="modern-corporate-item-subtitle">${item.position} • ${item.company}</div>
          <div style="font-size: 9pt; color: #718096; margin: 8pt 0; font-weight: 500;">
            ${item.contact1} • ${item.contact2}
          </div>
          <div style="font-size: 10pt; color: #4a5568; line-height: 1.7; font-style: italic; padding: 16pt; background: #f7fafc; border-radius: 6pt; border-left: 4pt solid #3182ce;">
            "${item.referenceText}"
          </div>
        </div>
      `
        )
        .join("")}
    </div>
  `;
};
