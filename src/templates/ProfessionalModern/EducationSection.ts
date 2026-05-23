
export const getProfessionalModernEducationHTML = (educationItems: EducationItem[], settings: Settings) => {
  if (!educationItems || educationItems.length === 0) return '';

  const educationHTML = educationItems
    .map(education => `
      <div style="margin-bottom: 20pt; padding: 16pt; background: white; border-radius: 6pt; border: 1pt solid #e2e8f0; box-shadow: 0 1pt 3pt rgba(0,0,0,0.1);">
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8pt;">
          <div>
            <h3 style="font-size: 12pt; font-weight: 600; color: #2d3748; margin-bottom: 4pt;">
              ${education.degree}
            </h3>
            <div style="font-size: 11pt; color: #3182ce; font-weight: 500;">
              ${education.institution} ${education.location ? `• ${education.location}` : ''}
            </div>
          </div>
          <div style="font-size: 10pt; color: #718096; text-align: right; background: #f7fafc; padding: 6pt 10pt; border-radius: 8pt;">
            ${education.startDate} - ${education.current ? 'Present' : education.endDate}
            ${education.gpa ? `<br><span style="font-weight: 500; color: #2d3748;">GPA: ${education.gpa}</span>` : ''}
          </div>
        </div>
      </div>
    `)
    .join('');

  return `
    <div class="professional-modern-section">
      <h2 class="professional-modern-section-title">Education</h2>
      ${educationHTML}
    </div>
  `;
};
