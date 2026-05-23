
export const getModernArtisticSummaryHTML = (basics: Basics, settings: Settings) => `
  <div style="margin: 32pt; position: relative;">
    <div style="position: absolute; top: -10pt; left: -20pt; width: 40pt; height: 40pt; background: linear-gradient(45deg, #ff9ff3, #54a0ff); border-radius: 50%; opacity: 0.3;"></div>
    <h2 style="font-size: 16pt; font-weight: 700; color: #2d3748; margin-bottom: 20pt; text-transform: uppercase; letter-spacing: 1.5pt; position: relative; z-index: 1;">
      Profile
    </h2>
    <div style="padding: 24pt; background: linear-gradient(135deg, rgba(255,107,107,0.1) 0%, rgba(78,205,196,0.1) 100%); border-radius: 20pt; border-left: 4pt solid #ff6b6b; position: relative; overflow: hidden;">
      <div style="position: absolute; top: 10pt; right: 10pt; width: 20pt; height: 20pt; background: #4ecdc4; border-radius: 50%; opacity: 0.3;"></div>
      <div style="font-size: 11pt; color: #2d3748; line-height: 1.8; position: relative; z-index: 1;">
        ${basics.summary}
      </div>
    </div>
  </div>
`;
