
export const getTechnicalMinimalSummaryHTML = (basics: Basics, settings: Settings) => `
  <div class="technical-minimal-section">
    <h2 class="technical-minimal-section-title"># about</h2>
    <div style="font-size: 11pt; color: #4b5563; line-height: 1.8; font-family: 'Monaco', monospace; padding-left: 16pt; border-left: 2pt solid #e5e7eb;">
      ${basics.summary}
    </div>
  </div>
`;
