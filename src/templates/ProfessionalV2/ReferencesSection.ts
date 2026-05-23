
export const getProfessionalV2ReferencesHTML = (references: Section<ReferenceItem>, settings: Settings) => {
  return `
    <div class="professional-v2-section">
      <h2 class="professional-v2-section-title">References</h2>
      ${references.items
        .map(
          (item) => `
        <div class="professional-v2-item">
          <div class="professional-v2-item-title">${item.name}</div>
          <div class="professional-v2-item-subtitle">${item.position} at ${item.company}</div>
          <div style="font-size: 10pt; color: #718096; margin: 6pt 0;">
            ${item.contact1} • ${item.contact2}
          </div>
          <div style="font-size: 11pt; color: #4a5568; line-height: 1.5;">
            ${item.referenceText}
          </div>
        </div>
      `
        )
        .join("")}
    </div>
  `;
};
