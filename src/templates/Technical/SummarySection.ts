export const getSummaryHTML = (basics: Basics): string => {
  if (!basics.summary) {
    return '';
  }

  return `
    <div class="section">
      <h2 class="section-title">Professional Summary</h2>
      <div class="summary">
        ${basics.summary}
      </div>
    </div>
  `;
};
