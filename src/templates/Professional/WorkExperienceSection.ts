// TODO:convert date here also
// TODO:add technical stack or skills here also

export const getWorkExperienceHTML = (work: any) => {
  return `
  <div class="section" style="break-inside:avoid;">
    <h2 class="section-title">Experience</h2>
    <hr/>
    ${work.items
      .map(
        (item: any) => `
      <div style="margin-bottom: 9pt;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span class="text-bold">${item.position}</span>
          <span class="text-regular text-muted">
            ${item.startDate} - ${item.current ? 'Present' : item.endDate}
          </span>
        </div>
        <div class="text-regular flex flex-row space-between text-regular text-italic" style="margin: 4px 0;">
          <span class="text-italic">${item.company}</span> 
          <span>${item.location}</span> 
        </div>
        <ul style="margin: 4pt 0; padding-left: 20pt;">
          ${item.highlights
            .map(
              (highlight: string) => `
            <li class="bulleted-point">
            <span class="text-regular">${highlight}</span>
            </li>
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
