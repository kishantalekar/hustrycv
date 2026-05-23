
export const getModernGradientSummaryHTML = (basics: Basics, settings: Settings) => `
  <div class="modern-gradient-section" style="margin-top: 32pt;">
    <h2 class="modern-gradient-section-title">Profile</h2>
    <div style="font-size: 11pt; color: #4a5568; line-height: 1.8; padding: 24pt; background: linear-gradient(135deg, #f093fb20 0%, #f5576c20 25%, #4facfe20 50%, #00f2fe20 100%); border-radius: 16pt; border: 2pt solid transparent; background-clip: padding-box; position: relative;">
      <div style="position: absolute; inset: 0; padding: 2pt; background: linear-gradient(135deg, #f093fb, #f5576c, #4facfe, #00f2fe); border-radius: 16pt; z-index: -1;"></div>
      <div style="background: white; border-radius: 14pt; padding: 22pt; position: relative; z-index: 1;">
        ${basics.summary}
      </div>
    </div>
  </div>
`;
