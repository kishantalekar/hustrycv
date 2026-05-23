
export const getElegantSummaryHTML = (basics: Basics, settings: Settings) => `
  <div class="elegant-section">
    <h2 class="elegant-section-title">Professional Summary</h2>
    <hr class="elegant-divider"/>
    <p style="font-size: 12pt; color: #475569; line-height: 1.7; font-style: italic;">
      ${basics.summary}
    </p>
  </div>
`;
