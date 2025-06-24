export const getStrengthsHTML = (strengths: Section<StrengthItem>, settings: Settings) => {
  return `
  <div style="margin-bottom: 1.5rem;">
    <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.5rem;">Strengths</h2>
    <hr style="margin-bottom: 1rem; border: none; border-top: 1px solid #e5e7eb;"/>
    <div style="display: flex; flex-direction: row; flex-wrap: wrap; gap: 0.75rem;">
      ${strengths.items
        .map(
          item => `
        <div style="padding: 0.75rem 1.25rem; border-radius: 0.5rem; background-color: #f9fafb; transition: background-color 0.2s ease-in-out;" onmouseover="this.style.backgroundColor='#f3f4f6'" onmouseout="this.style.backgroundColor='#f9fafb'">
          <span style="font-size: 1rem; color: #1f2937;">${item.name}</span>
        </div>
      `
        )
        .join('')}
    </div>
  </div>
`;
};