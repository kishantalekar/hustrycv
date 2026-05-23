
export const getMinimalistSummaryHTML = (basics: Basics, settings: Settings) => `
  <div class="minimalist-section">
    <h2 class="minimalist-section-title">about</h2>
    <p style="font-size: 11pt; color: #666666; line-height: 1.8; font-weight: 300; text-align: justify;">
      ${basics.summary}
    </p>
  </div>
`;
