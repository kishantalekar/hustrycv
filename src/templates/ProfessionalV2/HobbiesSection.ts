
export const getProfessionalV2HobbiesHTML = (hobbies: Section<HobbieItem>, settings: Settings) => {
  return `
    <div class="professional-v2-section">
      <h2 class="professional-v2-section-title">Interests</h2>
      <div style="display: flex; flex-wrap: wrap; gap: 8pt;">
        ${hobbies.items
          .map(
            (item) => `
          <span style="background: #edf2f7; color: #4a5568; padding: 4pt 12pt; border-radius: 12pt; font-size: 10pt; border: 1px solid #cbd5e0;">
            ${item.name}
          </span>
        `
          )
          .join("")}
      </div>
    </div>
  `;
};
