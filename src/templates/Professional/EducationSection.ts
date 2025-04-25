export const getEducationHTML = (education: any) => `
  <div class="section" style="page-break-inside:avoid;">
    <h2 class="section-title" style="font-family:Helvetica;">Education</h2>
    ${education.items
      .map(
        (item: any) => `
      <div style="margin-bottom: 12px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span class="text-bold">${item.institution}</span>
          <span class="text-regular text-muted">
            ${item.startDate} - ${item.endDate}
          </span>
        </div>
        <div class="text-regular" >
          ${item.degree}
          ${
            item.gpa
              ? `<span class="text-muted"> • GPA: ${item.gpa}</span>`
              : ''
          }
        </div>
      </div>
    `,
      )
      .join('')}
  </div>
`;
