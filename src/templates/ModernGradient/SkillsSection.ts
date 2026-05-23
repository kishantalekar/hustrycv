
export const getModernGradientSkillsHTML = (skills: Section<SkillItem>, settings: Settings) => {
  const gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)'
  ];
  
  return `
    <div class="modern-gradient-section">
      <h2 class="modern-gradient-section-title">Skills</h2>
      ${skills.items
        .map(
          (item, categoryIndex) => `
        <div style="margin-bottom: 20pt;">
          <div style="font-weight: 600; background: ${gradients[categoryIndex % gradients.length]}; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-size: 11pt; margin-bottom: 10pt; text-transform: uppercase; letter-spacing: 0.5pt;">
            ${item.name}
          </div>
          <div style="display: flex; flex-wrap: wrap; gap: 8pt;">
            ${item.keywords.map((keyword, index) => `
              <span style="background: ${gradients[(categoryIndex + index) % gradients.length]}; color: white; padding: 8pt 14pt; border-radius: 20pt; font-size: 9pt; font-weight: 500; box-shadow: 0 4pt 8pt rgba(0,0,0,0.2);">
                ${keyword}
              </span>
            `).join('')}
          </div>
        </div>
      `
        )
        .join("")}
    </div>
  `;
};
