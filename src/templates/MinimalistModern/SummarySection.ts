
export const getMinimalistModernSummaryHTML = (basics: Basics, settings: Settings) => `
  <div class="minimalist-modern-section">
    <h2 class="minimalist-modern-section-title">summary</h2>
    <div style="font-size: 11pt; color: #374151; line-height: 1.8; font-weight: 300; padding: 16pt; background: #f9fafb; border-radius: 4pt;">
      ${basics.summary}
    </div>
  </div>
`;
