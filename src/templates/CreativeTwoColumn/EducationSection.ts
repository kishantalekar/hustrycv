
export const getCreativeTwoColumnEducationHTML = (educationItems: EducationItem[], settings: Settings) => {
  if (!educationItems || educationItems.length === 0) return '';

  const educationHTML = educationItems
    .map(education => `
      <div style="margin-bottom: 24pt; page-break-inside: avoid; background: linear-gradient(135deg, #e0e7ff 0%, #fef3c7 100%); padding: 20pt; border-radius: 12pt; box-shadow: 0 4pt 8pt rgba(139, 92, 246, 0.1);">
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8pt;">
          <div>
            <h3 style="font-size: 14pt; font-weight: 700; color: #8b5cf6; margin-bottom: 6pt;">
              ${education.degree}
            </h3>
            <div style="font-size: 12pt; color: #f59e0b; font-weight: 600;">
              ${education.institution} ${education.location ? `• ${education.location}` : ''}
            </div>
          </div>
          <div style="font-size: 10pt; color: #6b7280; text-align: right; background: white; padding: 8pt 12pt; border-radius: 8pt; box-shadow: 0 2pt 4pt rgba(0,0,0,0.1);">
            ${education.startDate} - ${education.current ? 'Present' : education.endDate}
            ${education.gpa ? `<br><strong>GPA: ${education.gpa}</strong>` : ''}
          </div>
        </div>
      </div>
    `)
    .join('');

  return `
    <div class="creative-two-column-section">
      <h2 class="creative-two-column-section-title">Academic Foundation</h2>
      ${educationHTML}
    </div>
  `;
};
