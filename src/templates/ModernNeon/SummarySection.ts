
export const getModernNeonSummaryHTML = (basics: Basics, settings: Settings) => `
  <div style="margin: 32pt; padding: 24pt; background: #111111; border: 1pt solid #00ffff; border-radius: 8pt; box-shadow: 0 0 20pt #00ffff40;">
    <h2 style="font-size: 16pt; font-weight: 700; color: #00ffff; margin-bottom: 16pt; text-transform: uppercase; letter-spacing: 2pt; text-shadow: 0 0 10pt #00ffff;">
      Profile
    </h2>
    <div style="font-size: 11pt; color: #ffffff; line-height: 1.8; text-shadow: 0 0 5pt #ffffff40;">
      ${basics.summary}
    </div>
  </div>
`;
