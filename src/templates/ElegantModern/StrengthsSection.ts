
export const getElegantModernStrengthsHTML = (strengthItems: StrengthItem[], settings: Settings) => {
  if (!strengthItems || strengthItems.length === 0) return '';

  const strengthsHTML = strengthItems
    .map(strength => `
      <div style="display: inline-block; margin: 0 10pt 10pt 0; padding: 14pt 20pt; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 30pt; font-size: 11pt; font-weight: 400; letter-spacing: 0.5px; box-shadow: 0 6pt 12pt rgba(102, 126, 234, 0.3);">
        ${strength.name}
      </div>
    `)
    .join('');

  return `
    <div class="elegant-modern-section">
      <h2 class="elegant-modern-section-title">Strengths</h2>
      <div style="padding: 24pt; background: linear-gradient(135deg, #f8fafc 0%, #edf2f7 100%); border-radius: 16pt; position: relative; overflow: hidden;">
        <div style="position: absolute; top: -20pt; right: -20pt; width: 80pt; height: 80pt; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; opacity: 0.1;"></div>
        <div style="position: relative; z-index: 1;">
          ${strengthsHTML}
        </div>
      </div>
    </div>
  `;
};
