
export const getModernArtisticEducationHTML = (educationItems: EducationItem[], settings: Settings) => {
  if (!educationItems || educationItems.length === 0) return '';

  const educationHTML = educationItems
    .filter(item => item.status !== 'disabled')
    .map((education, index) => {
      const colors = ['#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
      const color = colors[index % colors.length];
      
      return `
        <div style="margin-bottom: 24pt; padding: 20pt; background: rgba(255,255,255,0.9); border-radius: 12pt; border-top: 3pt solid ${color}; box-shadow: 0 6pt 24pt rgba(0,0,0,0.08); position: relative;">
          <div style="position: absolute; bottom: 5pt; left: 5pt; width: 25pt; height: 25pt; background: ${color}; border-radius: 50%; opacity: 0.15;"></div>
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8pt; position: relative; z-index: 1;">
            <div>
              <h3 style="font-size: 13pt; font-weight: 600; color: #2d3748; margin-bottom: 4pt;">${education.degree}</h3>
              <div style="font-size: 11pt; color: ${color}; font-weight: 500;">${education.institution}</div>
            </div>
            <div style="text-align: right; font-size: 10pt; color: #4a5568;">
              <div>${education.startDate} - ${education.current ? 'Present' : education.endDate}</div>
              ${education.location ? `<div style="margin-top: 2pt;">${education.location}</div>` : ''}
            </div>
          </div>
          ${education.gpa ? `<div style="font-size: 10pt; color: #4a5568; position: relative; z-index: 1;">GPA: ${education.gpa}</div>` : ''}
        </div>
      `;
    })
    .join('');

  return `
    <div style="margin: 32pt;">
      <h2 style="font-size: 16pt; font-weight: 700; color: #2d3748; margin-bottom: 20pt; text-transform: uppercase; letter-spacing: 1.5pt;">
        Education
      </h2>
      ${educationHTML}
    </div>
  `;
};
