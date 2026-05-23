
export const getModernCreativeReferencesHTML = (references: Section<ReferenceItem>, settings: Settings) => {
  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4'];
  
  return `
    <div class="modern-creative-section">
      <h2 class="modern-creative-section-title">References</h2>
      ${references.items
        .map(
          (item, index) => `
        <div class="modern-creative-item" style="background: linear-gradient(135deg, ${colors[index % colors.length]}10 0%, ${colors[index % colors.length]}05 100%); border: 2pt solid ${colors[index % colors.length]}30; border-radius: 20pt; position: relative; overflow: hidden;">
          <div style="position: absolute; top: -5pt; right: -5pt; width: 40pt; height: 40pt; background: ${colors[index % colors.length]}15; border-radius: 50%; transform: rotate(45deg);"></div>
          <div class="modern-creative-item-title" style="color: ${colors[index % colors.length]};">${item.name}</div>
          <div class="modern-creative-item-subtitle">${item.position} • ${item.company}</div>
          <div style="font-size: 9pt; color: #718096; margin: 8pt 0; font-weight: 500;">
            ${item.contact1} • ${item.contact2}
          </div>
          <div style="font-size: 10pt; color: #4a5568; line-height: 1.7; font-style: italic; padding: 16pt; background: rgba(255,255,255,0.8); border-radius: 12pt; border-left: 4pt solid ${colors[index % colors.length]}; position: relative; z-index: 1;">
            "${item.referenceText}"
          </div>
        </div>
      `
        )
        .join("")}
    </div>
  `;
};
