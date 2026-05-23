
export const getTechnicalHobbiesHTML = (hobbies: Section<HobbieItem>, settings: Settings) => {
  return `
    <div class="technical-section">
      <h2 class="technical-section-title">Interests</h2>
      <div style="display: flex; flex-wrap: wrap; gap: 8pt;">
        ${hobbies.items
          .map(
            (item) => `
          <span style="background: #f3f4f6; color: #374151; padding: 8pt 12pt; border-radius: 6pt; font-size: 10pt; border: 1px solid #d1d5db;">
            ${item.name}
          </span>
        `
          )
          .join("")}
      </div>
    </div>
  `;
};
