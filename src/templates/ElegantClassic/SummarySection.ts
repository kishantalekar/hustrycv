
export const getElegantClassicSummaryHTML = (basics: Basics, settings: Settings) => `
  <div class="elegant-classic-section">
    <h2 class="elegant-classic-section-title">Summary</h2>
    <div style="font-size: 12pt; color: #4a5568; line-height: 1.8; text-align: justify; font-family: 'Georgia', serif; font-style: italic; padding: 20pt; border-left: 4pt solid #5a67d8; background: #faf5ff;">
      ${basics.summary}
    </div>
  </div>
`;
