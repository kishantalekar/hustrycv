export const renderJobDescription = (description: string) => {
  if (!description) {return '';}

  return `
    <div class="job-description" style="margin-top: 8px;">
      ${description}
    </div>
  `;
};
