
export const getModernCorporateSkillsHTML = (skills: Section<SkillItem>, settings: Settings) => {
  return `
    <div class="modern-corporate-section">
      <h2 class="modern-corporate-section-title">Core Competencies</h2>
      ${skills.items
        .map(
          (item) => `
        <div style="margin-bottom: 20pt;">
          <div style="font-weight: 600; color: #2d3748; font-size: 11pt; margin-bottom: 10pt; text-transform: uppercase; letter-spacing: 0.5pt;">
            ${item.name}
          </div>
          <div style="display: flex; flex-wrap: wrap; gap: 6pt;">
            ${item.keywords.map(keyword => `
              <span style="background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e0 100%); color: #2d3748; padding: 6pt 12pt; border-radius: 4pt; font-size: 9pt; font-weight: 500; border: 1pt solid #a0aec0;">
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
