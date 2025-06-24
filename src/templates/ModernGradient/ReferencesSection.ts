
export const getModernGradientReferencesHTML = (references: Section<ReferenceItem>, settings: Settings) => {
  const gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
  ];
  
  return `
    <div class="modern-gradient-section">
      <h2 class="modern-gradient-section-title">References</h2>
      ${references.items
        .map(
          (item, index) => `
        <div class="modern-gradient-item" style="background: ${gradients[index % gradients.length]}10; border-radius: 16pt; border: 2pt solid ${gradients[index % gradients.length]}30;">
          <div class="modern-gradient-item-title" style="background: ${gradients[index % gradients.length]}; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">${item.name}</div>
          <div class="modern-gradient-item-subtitle">${item.position} • ${item.company}</div>
          <div style="font-size: 9pt; color: #718096; margin: 8pt 0; font-weight: 500;">
            ${item.contact1} • ${item.contact2}
          </div>
          <div style="font-size: 10pt; color: #4a5568; line-height: 1.7; font-style: italic; padding: 16pt; background: ${gradients[index % gradients.length]}05; border-radius: 12pt; border-left: 4pt solid ${gradients[index % gradients.length]};">
            "${item.referenceText}"
          </div>
        </div>
      `
        )
        .join("")}
    </div>
  `;
};
