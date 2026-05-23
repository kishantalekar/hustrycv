
export const getModernNeonEducationHTML = (educationItems: EducationItem[], settings: Settings) => {
  if (!educationItems || educationItems.length === 0) return '';

  const educationHTML = educationItems
    .filter(item => item.status !== 'disabled')
    .map(education => `
      <div style="margin-bottom: 20pt; padding: 16pt; background: #111111; border: 1pt solid #00ffff; border-radius: 6pt; box-shadow: 0 0 10pt #00ffff20;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8pt;">
          <div>
            <h3 style="font-size: 13pt; font-weight: 600; color: #00ffff; margin-bottom: 4pt; text-shadow: 0 0 6pt #00ffff;">${education.degree}</h3>
            <div style="font-size: 11pt; color: #ffffff; font-weight: 500;">${education.institution}</div>
          </div>
          <div style="text-align: right; font-size: 10pt; color: #cccccc;">
            <div>${education.startDate} - ${education.current ? 'Present' : education.endDate}</div>
            ${education.location ? `<div style="margin-top: 2pt;">${education.location}</div>` : ''}
          </div>
        </div>
        ${education.gpa ? `<div style="font-size: 10pt; color: #cccccc;">GPA: ${education.gpa}</div>` : ''}
      </div>
    `)
    .join('');

  return `
    <div style="margin: 32pt;">
      <h2 style="font-size: 16pt; font-weight: 700; color: #00ffff; margin-bottom: 20pt; text-transform: uppercase; letter-spacing: 2pt; text-shadow: 0 0 10pt #00ffff;">
        Education
      </h2>
      ${educationHTML}
    </div>
  `;
};
