
export const getModernGradientHobbiesHTML = (hobbies: Section<HobbieItem>, settings: Settings) => {
  const gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)'
  ];
  
  return `
    <div class="modern-gradient-section">
      <h2 class="modern-gradient-section-title">Interests</h2>
      <div style="display: flex; flex-wrap: wrap; gap: 12pt;">
        ${hobbies.items
          .map(
            (item, index) => `
          <span style="background: ${gradients[index % gradients.length]}; color: white; padding: 12pt 18pt; border-radius: 25pt; font-size: 10pt; font-weight: 600; box-shadow: 0 6pt 12pt rgba(0,0,0,0.25);">
            ${item.name}
          </span>
        `
          )
          .join("")}
      </div>
    </div>
  `;
};
