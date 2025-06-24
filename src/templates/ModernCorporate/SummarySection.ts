
export const getModernCorporateSummaryHTML = (basics: Basics, settings: Settings) => `
  <div class="modern-corporate-section" style="margin-top: 32pt;">
    <h2 class="modern-corporate-section-title">Executive Summary</h2>
    <div style="font-size: 11pt; color: #4a5568; line-height: 1.8; padding: 24pt; background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%); border-radius: 8pt; border-left: 4pt solid #3182ce; border-top: 1pt solid #e2e8f0;">
      ${basics.summary}
    </div>
  </div>
`;
