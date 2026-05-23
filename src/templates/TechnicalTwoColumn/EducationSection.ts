
export const getTechnicalTwoColumnEducationHTML = (educationItems: EducationItem[], settings: Settings) => {
  if (!educationItems || educationItems.length === 0) return '';

  const educationHTML = educationItems
    .map(education => `
      <div style="margin-bottom: 20pt; page-break-inside: avoid; background: #1a1a1a; padding: 16pt; border-radius: 4pt; border-left: 4pt solid #00ff88;">
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 6pt;">
          <div>
            <h3 style="font-size: 12pt; font-weight: 600; color: #00ff88; margin-bottom: 4pt; font-family: 'Courier New', monospace;">
              ${education.degree}
            </h3>
            <div style="font-size: 10pt; color: #ccc; font-family: 'Courier New', monospace;">
              ${education.institution} ${education.location ? `// ${education.location}` : ''}
            </div>
          </div>
          <div style="font-size: 9pt; color: #888; text-align: right; font-family: 'Courier New', monospace;">
            ${education.startDate} - ${education.current ? 'current' : education.endDate}
            ${education.gpa ? `<br>gpa: ${education.gpa}` : ''}
          </div>
        </div>
      </div>
    `)
    .join('');

  return `
    <div class="technical-two-column-section">
      <h2 class="technical-two-column-section-title">// education.background</h2>
      ${educationHTML}
    </div>
  `;
};
