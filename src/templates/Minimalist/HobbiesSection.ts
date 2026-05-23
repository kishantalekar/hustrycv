
export const getMinimalistHobbiesHTML = (hobbies: Section<HobbieItem>, settings: Settings) => {
  return `
    <div class="minimalist-section">
      <h2 class="minimalist-section-title">interests</h2>
      <div style="font-size: 10pt; color: #666666; font-weight: 300; line-height: 1.8;">
        ${hobbies.items.map(item => item.name).join(" · ")}
      </div>
    </div>
  `;
};
