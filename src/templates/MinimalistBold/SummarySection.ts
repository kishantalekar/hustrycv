
export const getMinimalistBoldSummaryHTML = (basics: Basics, settings: Settings) => `
  <div class="minimalist-bold-section">
    <h2 class="minimalist-bold-section-title">PROFILE</h2>
    <div style="font-size: 12pt; color: #374151; line-height: 1.7; font-weight: 500; text-align: justify; padding: 20pt; border: 2pt solid #000000;">
      ${basics.summary}
    </div>
  </div>
`;
