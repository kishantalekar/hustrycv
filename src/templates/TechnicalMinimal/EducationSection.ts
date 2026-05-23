
export const getTechnicalMinimalEducationHTML = (educationItems: EducationItem[], settings: Settings) => {
  if (!educationItems || educationItems.length === 0) return '';

  const educationHTML = educationItems
    .map(education => `
      <div style="margin-bottom: 20pt; padding: 12pt; border: 1pt solid #e5e7eb; border-radius: 4pt;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6pt; border-bottom: 1pt solid #f3f4f6; padding-bottom: 4pt;">
          <div>
            <h3 style="font-size: 11pt; font-weight: 400; color: #374151; margin-bottom: 2pt; font-family: 'Monaco', monospace;">
              ${education.degree}
            </h3>
            <div style="font-size: 10pt; color: #6b7280; font-family: 'Monaco', monospace;">
              ${education.institution} ${education.location ? `| ${education.location}` : ''}
            </div>
          </div>
          <div style="font-size: 9pt; color: #9ca3af; font-family: 'Monaco', monospace; text-align: right;">
            ${education.startDate} - ${education.current ? 'Present' : education.endDate}
            ${education.gpa ? `<br>GPA: ${education.gpa}` : ''}
          </div>
        </div>
      </div>
    `)
    .join('');

  return `
    <div class="technical-minimal-section">
      <h2 class="technical-minimal-section-title">education</h2>
      ${educationHTML}
    </div>
  `;
};
