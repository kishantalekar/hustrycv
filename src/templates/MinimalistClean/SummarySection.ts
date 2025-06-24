
export const getMinimalistCleanSummaryHTML = (basics: Basics, settings: Settings) => `
  <div class="minimalist-clean-section">
    <h2 class="minimalist-clean-section-title">overview</h2>
    <p style="font-size: 10pt; color: #4b5563; line-height: 2.0; font-weight: 200; text-align: justify; margin: 0;">
      ${basics.summary}
    </p>
  </div>
`;
