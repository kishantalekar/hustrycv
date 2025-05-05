export const renderKeywords = (keywords: string[], title = "Skills") => {
  if (!keywords?.length) return "";

  return `
    <div class="technical-stack flex gap-4" style="margin-top: 8px;">
      <span class="text-bold" style="padding-top:4pt;">${title}:</span>
      <span class="text-regular">
        ${keywords
          .map(
            (keyword) =>
              `<span class="keyword" style="display: inline-block; background: #f0f0f0; padding: 2px 8px; margin: 2px 4px; border-radius: 4px;">${keyword}</span>`
          )
          .join("")}
      </span>
    </div>
  `;
};
