
export const getCreativeTwoColumnSummaryHTML = (basics: Basics, settings: Settings) => `
  <div class="creative-two-column-section">
    <h2 class="creative-two-column-section-title">Creative Vision</h2>
    <div style="font-size: 12pt; color: #374151; line-height: 1.8; text-align: justify; position: relative; padding: 20pt; background: linear-gradient(135deg, #fef3c7 0%, #fed7d7 100%); border-radius: 12pt; border-left: 6pt solid #f59e0b;">
      ${basics.summary}
    </div>
  </div>
`;
