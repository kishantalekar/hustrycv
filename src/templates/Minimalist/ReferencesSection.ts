
export const getMinimalistReferencesHTML = (references: Section<ReferenceItem>, settings: Settings) => {
  return `
    <div class="minimalist-section">
      <h2 class="minimalist-section-title">references</h2>
      ${references.items
        .map(
          (item) => `
        <div class="minimalist-item">
          <div class="minimalist-item-title">${item.name}</div>
          <div class="minimalist-item-subtitle">${item.position}, ${item.company}</div>
          <div style="font-size: 9pt; color: #999999; margin: 6pt 0; font-weight: 300;">
            ${item.contact1} · ${item.contact2}
          </div>
          <div style="font-size: 10pt; color: #666666; line-height: 1.7; font-weight: 300; font-style: italic;">
            ${item.referenceText}
          </div>
        </div>
      `
        )
        .join("")}
    </div>
  `;
};
