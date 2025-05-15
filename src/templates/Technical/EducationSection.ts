export const getEducationHTML = (education: Section<EducationItem>): string => {
  if (!education.items.length) {
    return '';
  }

  return `
    <div class="section">
      <h2 class="section-title">Education</h2>
      ${education.items
        .map(
          item => `
        <div class="education-item">
          <div class="education-header">
            <div class="education-title">${item.degree || ''}</div>
            <div class="education-date">${item.startDate || ''} - ${
            item.current ? 'Present' : item.endDate || ''
          }</div>
          </div>
          <div class="education-details">
            <div class="education-institution">
              <span class="institution-name">${item.institution || ''}</span>
              ${
                item.location
                  ? `<span class="education-location">• ${item.location}</span>`
                  : ''
              }
            </div>
            ${
              item.gpa
                ? `<div class="education-gpa">GPA: ${item.gpa}</div>`
                : ''
            }
           
          </div>
        </div>
      `,
        )
        .join('')}
    </div>
  `;
};
