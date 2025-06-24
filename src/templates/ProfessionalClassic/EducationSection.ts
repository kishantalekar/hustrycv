
export const getProfessionalClassicEducationHTML = (educationItems: EducationItem[], settings: Settings) => {
  if (!educationItems || educationItems.length === 0) return '';

  const educationHTML = educationItems
    .map(education => `
      <div style="margin-bottom: 20pt; padding-bottom: 16pt; border-bottom: 1pt dotted #cbd5e0;">
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 6pt;">
          <div>
            <h3 style="font-size: 12pt; font-weight: 700; color: #2d3748; margin-bottom: 4pt; font-family: 'Times New Roman', serif;">
              ${education.degree}
            </h3>
            <div style="font-size: 11pt; color: #4a5568; font-style: italic; font-family: 'Times New Roman', serif;">
              ${education.institution} ${education.location ? `• ${education.location}` : ''}
            </div>
          </div>
          <div style="font-size: 10pt; color: #718096; text-align: right; font-family: 'Times New Roman', serif;">
            ${education.startDate} - ${education.current ? 'Present' : education.endDate}
            ${education.gpa ? `<br><strong>GPA: ${education.gpa}</strong>` : ''}
          </div>
        </div>
      </div>
    `)
    .join('');

  return `
    <div class="professional-classic-section">
      <h2 class="professional-classic-section-title">Education</h2>
      ${educationHTML}
    </div>
  `;
};
