
export const getProfessionalTwoColumnEducationHTML = (educationItems: EducationItem[], settings: Settings) => {
  if (!educationItems || educationItems.length === 0) return '';

  const educationHTML = educationItems
    .map(education => `
      <div style="margin-bottom: 20pt; page-break-inside: avoid;">
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 6pt;">
          <div>
            <h3 style="font-size: 12pt; font-weight: 600; color: #1f2937; margin-bottom: 4pt;">
              ${education.degree}
            </h3>
            <div style="font-size: 10pt; color: #2563eb; font-weight: 500;">
              ${education.institution} ${education.location ? `• ${education.location}` : ''}
            </div>
          </div>
          <div style="font-size: 9pt; color: #6b7280; text-align: right;">
            ${education.startDate} - ${education.current ? 'Present' : education.endDate}
            ${education.gpa ? `<br>GPA: ${education.gpa}` : ''}
          </div>
        </div>
      </div>
    `)
    .join('');

  return `
    <div class="professional-two-column-section">
      <h2 class="professional-two-column-section-title">Education</h2>
      ${educationHTML}
    </div>
  `;
};
