
export const getModernNeonWorkExperienceHTML = (workItems: WorkItem[], settings: Settings) => {
  if (!workItems || workItems.length === 0) return '';

  const workHTML = workItems
    .filter(item => item.status !== 'disabled')
    .map(work => `
      <div style="margin-bottom: 24pt; padding: 20pt; background: #111111; border: 1pt solid #00ffff; border-radius: 6pt; box-shadow: 0 0 15pt #00ffff20;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12pt;">
          <div>
            <h3 style="font-size: 14pt; font-weight: 700; color: #00ffff; margin-bottom: 4pt; text-shadow: 0 0 8pt #00ffff;">${work.position}</h3>
            <div style="font-size: 12pt; color: #ffffff; font-weight: 500;">${work.company}</div>
          </div>
          <div style="text-align: right; font-size: 10pt; color: #cccccc;">
            <div>${work.startDate} - ${work.current ? 'Present' : work.endDate}</div>
            ${work.location ? `<div style="margin-top: 2pt;">${work.location}</div>` : ''}
          </div>
        </div>
        <div style="font-size: 11pt; color: #ffffff; line-height: 1.7; opacity: 0.9;">
          ${work.description}
        </div>
      </div>
    `)
    .join('');

  return `
    <div style="margin: 32pt;">
      <h2 style="font-size: 16pt; font-weight: 700; color: #00ffff; margin-bottom: 20pt; text-transform: uppercase; letter-spacing: 2pt; text-shadow: 0 0 10pt #00ffff;">
        Work Experience
      </h2>
      ${workHTML}
    </div>
  `;
};
