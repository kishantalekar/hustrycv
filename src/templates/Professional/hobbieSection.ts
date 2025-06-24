export const getHobbieHTML = (hobbie: Section<HobbieItem>) => {
  return `
  <div style="margin-bottom: 1.5rem;">
    <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.5rem;">Hobbies</h2>
    <hr style="margin-bottom: 1rem; border: none; border-top: 1px solid #e5e7eb;"/>
    <div style="display: flex; flex-direction: row; flex-wrap: wrap; gap: 0.75rem;">
      ${hobbie.items
        .map(
          item => `
        <div style="padding: 0.5rem 1rem; border-radius: 0.5rem; background-color: #f9fafb; transition: background-color 0.2s ease-in-out;" onmouseover="this.style.backgroundColor='#f3f4f6'" onmouseout="this.style.backgroundColor='#f9fafb'">
          <span style="font-size: 1rem;">${item.name}</span>
        </div>
      `,
        )
        .join('')}
    </div>
  </div>
`;
};
