
export const getElegantMinimalSummaryHTML = (basics: Basics, settings: Settings) => `
  <div class="elegant-minimal-section">
    <h2 class="elegant-minimal-section-title">Profile</h2>
    <div style="font-size: 11pt; color: #4a5568; line-height: 1.9; text-align: justify; font-weight: 300; padding-left: 20pt; border-left: 1pt solid #e2e8f0;">
      ${basics.summary}
    </div>
  </div>
`;
