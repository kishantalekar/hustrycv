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
          <div class="item-header">
            <div class="item-title">${item.degree || ''}</div>
            <div class="item-subtitle">${item.institution || ''} ${
            item.location ? `• ${item.location}` : ''
          }</div>
            <div class="item-date">${formatDate(item.startDate)} - ${
            item.current ? 'Present' : formatDate(item.endDate)
          }</div>
          </div>
          ${item.gpa ? `<div class="item-gpa">GPA: ${item.gpa}</div>` : ''}
          ${
            item.keywords && item.keywords.length
              ? `
            <div class="skill-keywords">
              ${item.keywords
                .map(keyword => `<span class="skill-keyword">${keyword}</span>`)
                .join('')}
            </div>
          `
              : ''
          }
        </div>
      `,
        )
        .join('')}
    </div>
  `;
};

// Helper function to format dates
function formatDate(dateString?: string): string {
  if (!dateString) {
    return '';
  }

  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    // If it's not a full date, it might be a year-month format
    const parts = dateString.split('-');
    if (parts.length === 2) {
      const year = parts[0];
      const month = new Date(
        parseInt(parts[0]),
        parseInt(parts[1]) - 1,
        1,
      ).toLocaleString('default', {month: 'short'});
      return `${month} ${year}`;
    }
    return dateString; // Return as is if we can't parse it
  }

  return date.toLocaleDateString('en-US', {year: 'numeric', month: 'short'});
}
