
export const getProfessionalModernSummaryHTML = (basics: Basics, settings: Settings) => `
  <div class="professional-modern-section">
    <h2 class="professional-modern-section-title">Professional Overview</h2>
    <div style="font-size: 11pt; color: #4a5568; line-height: 1.8; padding: 20pt; background: white; border-radius: 8pt; border: 1pt solid #e2e8f0; box-shadow: 0 2pt 4pt rgba(0,0,0,0.05);">
      ${basics.summary}
    </div>
  </div>
`;
