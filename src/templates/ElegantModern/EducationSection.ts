
export const getElegantModernEducationHTML = (educationItems: EducationItem[], settings: Settings) => {
  if (!educationItems || educationItems.length === 0) return '';

  const educationHTML = educationItems
    .map(education => `
      <div style="margin-bottom: 24pt; padding: 20pt; background: linear-gradient(135deg, #fefefe 0%, #f7fafc 100%); border-radius: 12pt; border: 1pt solid #e2e8f0; position: relative; overflow: hidden;">
        <div style="position: absolute; top: -15pt; left: -15pt; width: 60pt; height: 60pt; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; opacity: 0.08;"></div>
        <div style="position: relative; z-index: 1;">
          <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8pt;">
            <div>
              <h3 style="font-size: 13pt; font-weight: 400; color: #667eea; margin-bottom: 4pt; letter-spacing: 1px;">
                ${education.degree}
              </h3>
              <div style="font-size: 11pt; color: #4a5568; font-weight: 300;">
                ${education.institution} ${education.location ? `• ${education.location}` : ''}
              </div>
            </div>
            <div style="font-size: 10pt; color: #667eea; text-align: right; background: white; padding: 6pt 10pt; border-radius: 12pt; border: 1pt solid #e2e8f0;">
              ${education.startDate} - ${education.current ? 'Present' : education.endDate}
              ${education.gpa ? `<br><span style="font-weight: 400; color: #764ba2;">GPA: ${education.gpa}</span>` : ''}
            </div>
          </div>
        </div>
      </div>
    `)
    .join('');

  return `
    <div class="elegant-modern-section">
      <h2 class="elegant-modern-section-title">Education</h2>
      ${educationHTML}
    </div>
  `;
};
