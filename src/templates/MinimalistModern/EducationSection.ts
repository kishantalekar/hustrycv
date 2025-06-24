
export const getMinimalistModernEducationHTML = (educationItems: EducationItem[], settings: Settings) => {
  if (!educationItems || educationItems.length === 0) return '';

  const educationHTML = educationItems
    .map(education => `
      <div style="margin-bottom: 20pt; page-break-inside: avoid; padding: 16pt; background: #f9fafb; border-radius: 4pt;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6pt;">
          <h3 style="font-size: 11pt; font-weight: 400; color: #1f2937; letter-spacing: 1px;">${education.degree}</h3>
          <span style="font-size: 9pt; color: #6b7280; font-weight: 300;">${education.startDate} - ${education.endDate}</span>
        </div>
        <div style="font-size: 10pt; color: #4f46e5; font-weight: 300;">
          ${education.institution}
        </div>
      </div>
    `)
    .join('');

  return `
    <div class="minimalist-modern-section">
      <h2 class="minimalist-modern-section-title">education</h2>
      ${educationHTML}
    </div>
  `;
};
