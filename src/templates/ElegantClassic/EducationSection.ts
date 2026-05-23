
export const getElegantClassicEducationHTML = (educationItems: EducationItem[], settings: Settings) => {
  if (!educationItems || educationItems.length === 0) return '';

  const educationHTML = educationItems
    .map(education => `
      <div style="margin-bottom: 20pt; padding: 16pt; background: #f0f4ff; border: 2pt solid #ddd6fe; border-radius: 8pt;">
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8pt;">
          <div>
            <h3 style="font-size: 13pt; font-weight: 500; color: #5a67d8; margin-bottom: 4pt; font-family: 'Georgia', serif;">
              ${education.degree}
            </h3>
            <div style="font-size: 11pt; color: #4a5568; font-family: 'Georgia', serif; font-style: italic;">
              ${education.institution} ${education.location ? `• ${education.location}` : ''}
            </div>
          </div>
          <div style="font-size: 10pt; color: #6b7280; text-align: right; background: white; padding: 6pt 10pt; border-radius: 8pt;">
            ${education.startDate} - ${education.current ? 'Present' : education.endDate}
            ${education.gpa ? `<br><span style="font-weight: 500; color: #5a67d8;">GPA: ${education.gpa}</span>` : ''}
          </div>
        </div>
      </div>
    `)
    .join('');

  return `
    <div class="elegant-classic-section">
      <h2 class="elegant-classic-section-title">Education</h2>
      ${educationHTML}
    </div>
  `;
};
