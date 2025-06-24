
export const getProfessionalTwoColumnStrengthsHTML = (strengthItems: StrengthItem[], settings: Settings) => {
  if (!strengthItems || strengthItems.length === 0) return '';

  const strengthsHTML = strengthItems
    .map(strength => `
      <div style="margin-bottom: 8pt; padding: 8pt 12pt; background: #374151; border-radius: 4pt;">
        <div style="font-size: 10pt; color: white; font-weight: 500; text-align: center;">
          ${strength.name}
        </div>
      </div>
    `)
    .join('');

  return `
    <div style="margin-bottom: 24pt;">
      <h2 style="font-size: 12pt; font-weight: 700; color: white; margin-bottom: 16pt; text-transform: uppercase; letter-spacing: 2px; border-bottom: 2pt solid #2563eb; padding-bottom: 8pt;">
        Core Strengths
      </h2>
      ${strengthsHTML}
    </div>
  `;
};
