
export const getTechnicalDarkEducationHTML = (educationItems: EducationItem[], settings: Settings) => {
  if (!educationItems || educationItems.length === 0) return '';

  const educationHTML = educationItems
    .map(education => `
      <div style="margin-bottom: 20pt; padding: 16pt; background: #262626; border: 1pt solid #404040; border-radius: 6pt; border-left: 4pt solid #ff6b6b;">
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8pt;">
          <div>
            <h3 style="font-size: 13pt; font-weight: 700; color: #ff6b6b; margin-bottom: 4pt; font-family: 'Courier New', monospace;">
              ${education.degree}
            </h3>
            <div style="font-size: 11pt; color: #e5e5e5; font-family: 'Courier New', monospace;">
              ${education.institution} ${education.location ? `• ${education.location}` : ''}
            </div>
          </div>
          <div style="font-size: 10pt; color: #00ffff; text-align: right; font-family: 'Courier New', monospace; background: #1a1a1a; padding: 6pt 10pt; border-radius: 4pt;">
            ${education.startDate} - ${education.current ? 'Present' : education.endDate}
            ${education.gpa ? `<br><span style="color: #ff6b6b;">GPA: ${education.gpa}</span>` : ''}
          </div>
        </div>
      </div>
    `)
    .join('');

  return `
    <div class="technical-dark-section">
      <h2 class="technical-dark-section-title"># EDUCATION</h2>
      ${educationHTML}
    </div>
  `;
};
