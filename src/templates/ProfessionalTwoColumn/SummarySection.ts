
export const getProfessionalTwoColumnSummaryHTML = (basics: Basics, settings: Settings) => `
  <div class="professional-two-column-section">
    <h2 class="professional-two-column-section-title">Professional Summary</h2>
    <div style="font-size: 11pt; color: #374151; line-height: 1.7; text-align: justify;">
      ${basics.summary}
    </div>
  </div>
`;
