export const getWorkExperienceHTML = (work: any) => {
  console.log('work', work);
  return `
  <div class="section" style="break-inside:avoid;">
    <h2 class="section-title">Work Experience</h2>
    ${work.items
      .map(
        (item: any) => `
      <div style="margin-bottom: 12px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span class="text-bold">${item.company}</span>
          <span class="text-regular text-muted">
            ${item.startDate} - ${item.current ? 'Present' : item.endDate}
          </span>
        </div>
        <div class="text-regular" style="margin: 4px 0;">
          <strong>${item.position}</strong> • ${item.location}
        </div>
        <ul style="margin: 4px 0; padding-left: 20px;">
          ${item.highlights
            .map(
              (highlight: string) => `
            <li class="text-regular">${highlight}</li>
          `,
            )
            .join('')}
        </ul>
      </div>
    `,
      )
      .join('')}
  </div>
`;
};
