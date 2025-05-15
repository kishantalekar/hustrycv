export const getWorkExperienceHTML = (work: Section<WorkItem>): string => {
  if (!work.items.length) {
    return '';
  }

  return `
    <div class="section">
      <h2 class="section-title">Work Experience</h2>
      ${work.items
        .map(
          item => `
        <div class="work-item">
          <div class="item-header">
            <div class="item-title">${item.position || ''}</div>
            <div class="item-subtitle">${item.company || ''} ${
            item.location ? `• ${item.location}` : ''
          }</div>
            <div class="item-date">${formatDate(item.startDate)} - ${
            item.current ? 'Present' : formatDate(item.endDate)
          }</div>
          </div>
          <div class="item-description">${item.description || ''}</div>
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
