
export const getProfessionalClassicSummaryHTML = (basics: Basics, settings: Settings) => `
  <div class="professional-classic-section">
    <h2 class="professional-classic-section-title">Professional Summary</h2>
    <p style="font-size: 12pt; color: #2d3748; line-height: 1.7; text-align: justify; font-family: 'Times New Roman', serif; font-style: italic; padding: 16pt; background: #f8f9fa; border-left: 4pt solid #2d3748;">
      ${basics.summary}
    </p>
  </div>
`;
