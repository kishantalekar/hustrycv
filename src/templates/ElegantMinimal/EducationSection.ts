
export const getElegantMinimalEducationHTML = (educationItems: EducationItem[], settings: Settings) => {
  if (!educationItems || educationItems.length === 0) return '';

  const educationHTML = educationItems
    .map(education => `
      <div style="margin-bottom: 24pt;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6pt; border-bottom: 1pt solid #f1f5f9; padding-bottom: 6pt;">
          <div>
            <h3 style="font-size: 11pt; font-weight: 300; color: #2d3748; margin-bottom: 2pt; letter-spacing: 2px;">
              ${education.degree}
            </h3>
            <div style="font-size: 10pt; color: #718096; font-weight: 300; letter-spacing: 1px;">
              ${education.institution} ${education.location ? `• ${education.location}` : ''}
            </div>
          </div>
          <div style="font-size: 9pt; color: #a0aec0; font-weight: 300; letter-spacing: 1px; text-align: right;">
            ${education.startDate} - ${education.current ? 'Present' : education.endDate}
            ${education.gpa ? `<br><span style="color: #2d3748;">GPA: ${education.gpa}</span>` : ''}
          </div>
        </div>
      </div>
    `)
    .join('');

  return `
    <div class="elegant-minimal-section">
      <h2 class="elegant-minimal-section-title">education</h2>
      ${educationHTML}
    </div>
  `;
};
