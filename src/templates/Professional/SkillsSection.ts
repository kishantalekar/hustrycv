export const getSkillsHTML = (skills: any) => `
  <div class="section">
    <h2 class="section-title">Skills</h2>
    <div style="display: flex; flex-wrap: wrap; gap: 12px;">
      ${skills.items
        .map(
          (item: any) => `
        <div style="margin-bottom: 8px;">
          <div class="text-bold">${item.name}</div>
          <div class="text-regular text-muted" style="text-transform: capitalize;">
            ${item.level}
          </div>
          <div style="display: flex; flex-wrap: wrap; gap: 4px; margin-top: 4px;">
            ${item.keywords
              .map(
                (keyword: string) => `
              <span class="text-regular" style="background: #f0f0f0; padding: 2px 8px; border-radius: 4px;">
                ${keyword}
              </span>
            `,
              )
              .join('')}
          </div>
        </div>
      `,
        )
        .join('')}
    </div>
  </div>
`;
