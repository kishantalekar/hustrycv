
export const getTechnicalDarkSummaryHTML = (basics: Basics, settings: Settings) => `
  <div class="technical-dark-section">
    <h2 class="technical-dark-section-title">// About</h2>
    <div style="font-size: 11pt; color: #cccccc; line-height: 1.7; padding: 20pt; background: #2a2a2a; border-radius: 8pt; border-left: 4pt solid #00ff88; font-family: 'Courier New', monospace;">
      <span style="color: #00ff88;">/*</span><br/>
      ${basics.summary.split('\n').map(line => `&nbsp;&nbsp;${line}`).join('<br/>')}<br/>
      <span style="color: #00ff88;">*/</span>
    </div>
  </div>
`;
