
export const getElegantHobbiesHTML = (hobbies: Section<HobbieItem>, settings: Settings) => {
  return `
    <div class="elegant-section">
      <h2 class="elegant-section-title">Hobbies & Interests</h2>
      <hr class="elegant-divider"/>
      <div style="display: flex; flex-wrap: wrap; gap: 8pt;">
        ${hobbies.items
          .map(
            (item) => `
          <div class="elegant-keyword" style="background: #f1f5f9; color: #475569; padding: 6pt 12pt; border-radius: 16px; font-size: 11pt;">
            ${item.name}
          </div>
        `
          )
          .join("")}
      </div>
    </div>
  `;
};
