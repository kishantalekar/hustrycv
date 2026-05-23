
export const getElegantModernSummaryHTML = (basics: Basics, settings: Settings) => `
  <div class="elegant-modern-section">
    <h2 class="elegant-modern-section-title">About Me</h2>
    <div style="font-size: 11pt; color: #4a5568; line-height: 1.8; padding: 24pt; background: linear-gradient(135deg, #f8fafc 0%, #edf2f7 100%); border-radius: 16pt; position: relative; overflow: hidden;">
      <div style="position: absolute; top: -20pt; right: -20pt; width: 80pt; height: 80pt; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; opacity: 0.1;"></div>
      <div style="position: relative; z-index: 1;">${basics.summary}</div>
    </div>
  </div>
`;
