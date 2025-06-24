
export const getCreativeTwoColumnStrengthsHTML = (strengthItems: StrengthItem[], settings: Settings) => {
  if (!strengthItems || strengthItems.length === 0) return '';

  const strengthsHTML = strengthItems
    .map(strength => `
      <div style="margin-bottom: 12pt; padding: 12pt 16pt; background: linear-gradient(135deg, #8b5cf6, #f59e0b); border-radius: 20pt; box-shadow: 0 4pt 8pt rgba(139, 92, 246, 0.3);">
        <div style="font-size: 11pt; color: white; font-weight: 700; text-align: center; text-transform: uppercase; letter-spacing: 1px;">
          ${strength.name}
        </div>
      </div>
    `)
    .join('');

  return `
    <div style="margin-bottom: 28pt;">
      <h2 style="font-size: 16pt; font-weight: 800; background: linear-gradient(135deg, #8b5cf6, #f59e0b); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 20pt; text-transform: uppercase; letter-spacing: 2px;">
        Core Strengths
      </h2>
      ${strengthsHTML}
    </div>
  `;
};
