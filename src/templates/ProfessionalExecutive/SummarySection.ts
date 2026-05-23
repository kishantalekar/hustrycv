
export const getProfessionalExecutiveSummaryHTML = (basics: Basics, settings: Settings) => `
  <div class="professional-executive-section">
    <h2 class="professional-executive-section-title">Executive Profile</h2>
    <div style="font-size: 12pt; color: #2d3748; line-height: 1.7; padding: 24pt; background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%); border-radius: 8pt; border-left: 6pt solid #1a202c; position: relative;">
      <div style="position: absolute; top: 16pt; right: 16pt; width: 60pt; height: 60pt; background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%); border-radius: 50%; opacity: 0.1;"></div>
      <div style="position: relative; z-index: 1;">${basics.summary}</div>
    </div>
  </div>
`;
