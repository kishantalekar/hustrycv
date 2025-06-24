
export const getTechnicalSummaryHTML = (basics: Basics, settings: Settings) => `
  <div class="technical-section">
    <h2 class="technical-section-title">Summary</h2>
    <div style="font-size: 11pt; color: #374151; line-height: 1.7; padding: 16pt; background: #f0fdf4; border-radius: 6pt; border-left: 4pt solid #059669;">
      ${basics.summary}
    </div>
  </div>
`;
