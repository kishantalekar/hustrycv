
export const getTechnicalBlueEducationHTML = (educationItems: EducationItem[], settings: Settings) => {
  if (!educationItems || educationItems.length === 0) return '';

  const educationHTML = educationItems
    .map(education => `
      <div style="margin-bottom: 20pt; padding: 16pt; background: #eff6ff; border: 1pt solid #3b82f6; border-radius: 6pt; border-left: 4pt solid #1d4ed8;">
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8pt;">
          <div>
            <h3 style="font-size: 13pt; font-weight: 600; color: #1e40af; margin-bottom: 4pt; font-family: 'Fira Code', monospace;">
              ${education.degree}
            </h3>
            <div style="font-size: 11pt; color: #2563eb; font-family: 'Fira Code', monospace;">
              ${education.institution} ${education.location ? `• ${education.location}` : ''}
            </div>
          </div>
          <div style="font-size: 10pt; color: white; background: #2563eb; text-align: right; font-family: 'Fira Code', monospace; padding: 6pt 10pt; border-radius: 6pt;">
            ${education.startDate} - ${education.current ? 'Present' : education.endDate}
            ${education.gpa ? `<br><span style="color: white;">GPA: ${education.gpa}</span>` : ''}
          </div>
        </div>
      </div>
    `)
    .join('');

  return `
    <div class="technical-blue-section">
      <h2 class="technical-blue-section-title">// EDUCATION</h2>
      ${educationHTML}
    </div>
  `;
};
