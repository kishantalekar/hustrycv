
export const getTechnicalTwoColumnSummaryHTML = (basics: Basics, settings: Settings) => `
  <div class="technical-two-column-section">
    <h2 class="technical-two-column-section-title">// profile.summary()</h2>
    <div style="font-size: 11pt; color: #e5e7eb; line-height: 1.7; background: #1a1a1a; padding: 16pt; border-radius: 4pt; border-left: 4pt solid #00ff88; font-family: 'Courier New', monospace;">
      ${basics.summary}
    </div>
  </div>
`;
