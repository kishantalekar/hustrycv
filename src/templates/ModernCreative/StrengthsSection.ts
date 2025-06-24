
export const getModernCreativeStrengthsHTML = (strengths: Section<StrengthItem>, settings: Settings) => {
  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];
  
  return `
    <div class="modern-creative-section">
      <h2 class="modern-creative-section-title">Strengths</h2>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140pt, 1fr)); gap: 16pt;">
        ${strengths.items
          .map(
            (item, index) => `
          <div style="background: linear-gradient(135deg, ${colors[index % colors.length]} 0%, ${colors[(index + 1) % colors.length]} 100%); color: white; padding: 20pt; border-radius: 20pt; text-align: center; font-size: 10pt; font-weight: 700; box-shadow: 0 6pt 12pt rgba(0,0,0,0.2); position: relative; overflow: hidden; transform: rotate(${(index % 3 - 1) * 2}deg);">
            <div style="position: absolute; top: -10pt; right: -10pt; width: 30pt; height: 30pt; background: rgba(255,255,255,0.2); border-radius: 50%; transform: rotate(45deg);"></div>
            <div style="position: relative; z-index: 1; text-transform: uppercase; letter-spacing: 0.5pt;">${item.name}</div>
          </div>
        `
          )
          .join("")}
      </div>
    </div>
  `;
};
