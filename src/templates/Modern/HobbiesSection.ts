
export const getModernHobbiesHTML = (hobbies: Section<HobbieItem>, settings: Settings) => {
  return `
    <div class="modern-section">
      <h2 class="modern-section-title">Interests</h2>
      <div style="display: flex; flex-wrap: wrap; gap: 10pt;">
        ${hobbies.items
          .map(
            (item, index) => `
          <span style="background: linear-gradient(135deg, ${index % 3 === 0 ? '#667eea' : index % 3 === 1 ? '#764ba2' : '#f093fb'} 0%, ${index % 3 === 0 ? '#764ba2' : index % 3 === 1 ? '#f093fb' : '#667eea'} 100%); color: white; padding: 8pt 16pt; border-radius: 25pt; font-size: 10pt; font-weight: 500; box-shadow: 0 2pt 6pt rgba(102, 126, 234, 0.2);">
            ${item.name}
          </span>
        `
          )
          .join("")}
      </div>
    </div>
  `;
};
