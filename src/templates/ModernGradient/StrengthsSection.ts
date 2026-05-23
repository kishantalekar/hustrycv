
export const getModernGradientStrengthsHTML = (strengths: Section<StrengthItem>, settings: Settings) => {
  const gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
  ];
  
  return `
    <div class="modern-gradient-section">
      <h2 class="modern-gradient-section-title">Strengths</h2>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150pt, 1fr)); gap: 16pt;">
        ${strengths.items
          .map(
            (item, index) => `
          <div style="background: ${gradients[index % gradients.length]}; color: white; padding: 20pt; border-radius: 16pt; text-align: center; font-size: 10pt; font-weight: 700; box-shadow: 0 8pt 16pt rgba(0,0,0,0.25); position: relative; overflow: hidden;">
            <div style="position: absolute; top: -10pt; right: -10pt; width: 40pt; height: 40pt; background: rgba(255,255,255,0.1); border-radius: 50%;"></div>
            <div style="position: relative; z-index: 1; text-transform: uppercase; letter-spacing: 0.5pt;">${item.name}</div>
          </div>
        `
          )
          .join("")}
      </div>
    </div>
  `;
};
