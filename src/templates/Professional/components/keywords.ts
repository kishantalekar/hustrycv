export const renderKeywords = (keywords: string[], title = 'Skills') => {
  if (!keywords?.length) {
    return '';
  }

  return `
    <div class="technical-stack flex gap-4" style="margin-top: 4px;">
      <span class="text-bold" style="padding-top:4pt;">${title}:</span>
      <span class="text-regular">
        ${keywords
          .map(
            keyword =>
              `<span class="keyword" style="display: inline-block; padding: 2pt 2pt; margin: 2px 2pt; border-radius: 4px;">${keyword}</span>`,
          )
          .join(',')}
      </span>
    </div>
  `;
};
