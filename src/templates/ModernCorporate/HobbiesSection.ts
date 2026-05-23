
export const getModernCorporateHobbiesHTML = (hobbies: Section<HobbieItem>, settings: Settings) => {
  return `
    <div class="modern-corporate-section">
      <h2 class="modern-corporate-section-title">Professional Interests</h2>
      <div style="display: flex; flex-wrap: wrap; gap: 8pt;">
        ${hobbies.items
          .map(
            (item) => `
          <span style="background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e0 100%); color: #2d3748; padding: 8pt 16pt; border-radius: 4pt; font-size: 10pt; font-weight: 500; border: 1pt solid #a0aec0;">
            ${item.name}
          </span>
        `
          )
          .join("")}
      </div>
    </div>
  `;
};
