
export const getModernGlassEducationHTML = (educationItems: EducationItem[], settings: Settings) => {
  if (!educationItems || educationItems.length === 0) return '';

  const educationHTML = educationItems
    .filter(item => item.status !== 'disabled')
    .map(education => `
      <div style="margin-bottom: 24pt; padding: 20pt; background: rgba(255,255,255,0.25); backdrop-filter: blur(12pt); -webkit-backdrop-filter: blur(12pt); border-radius: 10pt; border: 1pt solid rgba(255,255,255,0.2);">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8pt;">
          <div>
            <h3 style="font-size: 13pt; font-weight: 600; color: #1a365d; margin-bottom: 4pt;">${education.degree}</h3>
            <div style="font-size: 11pt; color: #2d3748; font-weight: 500;">${education.institution}</div>
          </div>
          <div style="text-align: right; font-size: 10pt; color: #4a5568;">
            <div>${education.startDate} - ${education.current ? 'Present' : education.endDate}</div>
            ${education.location ? `<div style="margin-top: 2pt;">${education.location}</div>` : ''}
          </div>
        </div>
        ${education.gpa ? `<div style="font-size: 10pt; color: #4a5568;">GPA: ${education.gpa}</div>` : ''}
      </div>
    `)
    .join('');

  return `
    <div class="modern-glass-section">
      <h2 class="modern-glass-section-title">Education</h2>
      ${educationHTML}
    </div>
  `;
};
