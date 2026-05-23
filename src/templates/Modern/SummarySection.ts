
export const getModernSummaryHTML = (basics: Basics, settings: Settings) => `
  <div class="modern-section" style="margin-top: 32pt;">
    <h2 class="modern-section-title">Profile</h2>
    <div style="font-size: 11pt; color: #4a5568; line-height: 1.8; padding: 20pt; background: linear-gradient(135deg, #edf2f7 0%, #e2e8f0 100%); border-radius: 12pt; border-left: 4pt solid #764ba2;">
      ${basics.summary}
    </div>
  </div>
`;
