
export const getModernCreativeHobbiesHTML = (hobbies: Section<HobbieItem>, settings: Settings) => {
  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#a8e6cf', '#ff8b94'];
  
  return `
    <div class="modern-creative-section">
      <h2 class="modern-creative-section-title">Interests</h2>
      <div style="display: flex; flex-wrap: wrap; gap: 12pt;">
        ${hobbies.items
          .map(
            (item, index) => `
          <span style="background: linear-gradient(135deg, ${colors[index % colors.length]} 0%, ${colors[(index + 1) % colors.length]} 100%); color: white; padding: 12pt 18pt; border-radius: 30pt; font-size: 10pt; font-weight: 600; box-shadow: 0 4pt 8pt rgba(0,0,0,0.2); transform: rotate(${(index % 5 - 2) * 3}deg); transition: transform 0.3s ease;">
            ${item.name}
          </span>
        `
          )
          .join("")}
      </div>
    </div>
  `;
};
