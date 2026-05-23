
export const getProfessionalV2SummaryHTML = (basics: Basics, settings: Settings) => `
  <div class="professional-v2-section">
    <h2 class="professional-v2-section-title">Executive Summary</h2>
    <p style="font-size: 11pt; color: #4a5568; line-height: 1.6; text-align: justify;">
      ${basics.summary}
    </p>
  </div>
`;
