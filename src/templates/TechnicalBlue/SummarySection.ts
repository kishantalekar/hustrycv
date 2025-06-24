
export const getTechnicalBlueSummaryHTML = (basics: Basics, settings: Settings) => `
  <div class="technical-blue-section">
    <h2 class="technical-blue-section-title">def get_profile():</h2>
    <div style="font-size: 11pt; color: #1e40af; line-height: 1.7; padding: 20pt; background: #eff6ff; border-radius: 8pt; border-left: 4pt solid #2563eb; font-family: 'Fira Code', monospace;">
      <span style="color: #7c3aed;">"""</span><br/>
      ${basics.summary.split(' ').map((word, index) => 
        index % 8 === 0 ? `<br/>&nbsp;&nbsp;&nbsp;&nbsp;${word}` : word
      ).join(' ')}<br/>
      <span style="color: #7c3aed;">"""</span>
    </div>
  </div>
`;
