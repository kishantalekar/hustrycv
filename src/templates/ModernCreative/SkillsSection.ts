
export const getModernCreativeSkillsHTML = (skills: Section<SkillItem>, settings: Settings) => {
  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#a8e6cf', '#ff8b94'];
  
  return `
    <div class="modern-creative-section">
      <h2 class="modern-creative-section-title">Skills</h2>
      ${skills.items
        .map(
          (item, categoryIndex) => `
        <div style="margin-bottom: 20pt;">
          <div style="font-weight: 600; color: ${colors[categoryIndex % colors.length]}; font-size: 11pt; margin-bottom: 10pt; text-transform: uppercase; letter-spacing: 0.5pt;">
            ${item.name}
          </div>
          <div style="display: flex; flex-wrap: wrap; gap: 8pt;">
            ${item.keywords.map((keyword, index) => `
              <span style="background: linear-gradient(135deg, ${colors[(categoryIndex + index) % colors.length]} 0%, ${colors[(categoryIndex + index + 1) % colors.length]} 100%); color: white; padding: 8pt 14pt; border-radius: 25pt; font-size: 9pt; font-weight: 500; box-shadow: 0 3pt 6pt rgba(0,0,0,0.15); transform: rotate(${(index % 3 - 1) * 2}deg);">
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
