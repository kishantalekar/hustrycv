
export const getProfessionalExecutiveEducationHTML = (educationItems: EducationItem[], settings: Settings) => {
  if (!educationItems || educationItems.length === 0) return '';

  const educationHTML = educationItems
    .map(education => `
      <div style="margin-bottom: 24pt; padding: 18pt; background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%); border-radius: 6pt; border-left: 3pt solid #2d3748;">
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8pt;">
          <div>
            <h3 style="font-size: 13pt; font-weight: 700; color: #1a202c; margin-bottom: 6pt; letter-spacing: 0.5px;">
              ${education.degree}
            </h3>
            <div style="font-size: 11pt; color: #2d3748; font-weight: 500;">
              ${education.institution} ${education.location ? `• ${education.location}` : ''}
            </div>
          </div>
          <div style="font-size: 10pt; color: #4a5568; text-align: right; background: white; padding: 8pt 12pt; border-radius: 12pt; box-shadow: 0 2pt 4pt rgba(0,0,0,0.05);">
            ${education.startDate} - ${education.current ? 'Present' : education.endDate}
            ${education.gpa ? `<br><span style="font-weight: 600; color: #1a202c;">GPA: ${education.gpa}</span>` : ''}
          </div>
        </div>
      </div>
    `)
    .join('');

  return `
    <div class="professional-executive-section">
      <h2 class="professional-executive-section-title">Education</h2>
      ${educationHTML}
    </div>
  `;
};
