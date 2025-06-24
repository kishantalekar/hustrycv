
export const getTechnicalSkillsHTML = (skills: Section<SkillItem>, settings: Settings) => {
  return `
    <div class="technical-section">
      <h2 class="technical-section-title">Technical Skills</h2>
      ${skills.items
        .map(
          (item) => `
        <div style="margin-bottom: 16pt;">
          <div style="font-weight: 600; color: #1f2937; font-size: 11pt; margin-bottom: 8pt; font-family: 'JetBrains Mono', monospace;">
            ${item.name}
          </div>
          <div style="display: flex; flex-wrap: wrap; gap: 6pt;">
            ${item.keywords.map(keyword => `
              <span style="background: #059669; color: white; padding: 4pt 8pt; border-radius: 4pt; font-size: 9pt; font-family: 'JetBrains Mono', monospace; font-weight: 500;">
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
