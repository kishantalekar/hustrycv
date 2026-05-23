
export const getModernCreativeSummaryHTML = (basics: Basics, settings: Settings) => `
  <div class="modern-creative-section" style="margin-top: 32pt;">
    <h2 class="modern-creative-section-title">Profile</h2>
    <div style="font-size: 11pt; color: #4a5568; line-height: 1.8; padding: 24pt; background: linear-gradient(135deg, #fff5f5 0%, #fed7e2 50%, #fbb6ce 100%); border-radius: 20pt; border-left: 6pt solid #ff6b6b; position: relative; overflow: hidden;">
      <div style="position: absolute; top: -10pt; right: -10pt; width: 40pt; height: 40pt; background: rgba(255, 107, 107, 0.1); border-radius: 50%; transform: rotate(45deg);"></div>
      <div style="position: relative; z-index: 1;">${basics.summary}</div>
    </div>
  </div>
`;
