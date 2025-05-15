export const getSummaryHTML = (basics: Basics): string => {
  if (!basics.summary) {
    return '';
  }

  return `
    <div class="summary">
      ${basics.summary}
    </div>
  `;
};
