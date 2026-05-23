
export const getModernGlassSummaryHTML = (basics: Basics, settings: Settings) => `
  <div class="modern-glass-section" style="margin-top: 32pt;">
    <h2 class="modern-glass-section-title">Profile</h2>
    <div style="font-size: 11pt; color: #4a5568; line-height: 1.8; padding: 24pt; background: rgba(255,255,255,0.4); backdrop-filter: blur(20pt); -webkit-backdrop-filter: blur(20pt); border-radius: 16pt; border: 1pt solid rgba(255,255,255,0.3); box-shadow: 0 8pt 32pt rgba(0,0,0,0.1);">
      ${basics.summary}
    </div>
  </div>
`;
