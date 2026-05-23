
export const getModernGlassWorkExperienceHTML = (workItems: WorkItem[], settings: Settings) => {
  if (!workItems || workItems.length === 0) return '';

  const workHTML = workItems
    .filter(item => item.status !== 'disabled')
    .map(work => `
      <div style="margin-bottom: 28pt; padding: 24pt; background: rgba(255,255,255,0.3); backdrop-filter: blur(15pt); -webkit-backdrop-filter: blur(15pt); border-radius: 12pt; border: 1pt solid rgba(255,255,255,0.2); box-shadow: 0 4pt 20pt rgba(0,0,0,0.05);">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12pt;">
          <div>
            <h3 style="font-size: 14pt; font-weight: 600; color: #1a365d; margin-bottom: 4pt;">${work.position}</h3>
            <div style="font-size: 12pt; color: #2d3748; font-weight: 500;">${work.company}</div>
          </div>
          <div style="text-align: right; font-size: 10pt; color: #4a5568;">
            <div>${work.startDate} - ${work.current ? 'Present' : work.endDate}</div>
            ${work.location ? `<div style="margin-top: 2pt;">${work.location}</div>` : ''}
          </div>
        </div>
        <div style="font-size: 11pt; color: #4a5568; line-height: 1.7;">
          ${work.description}
        </div>
      </div>
    `)
    .join('');

  return `
    <div class="modern-glass-section">
      <h2 class="modern-glass-section-title">Work Experience</h2>
      ${workHTML}
    </div>
  `;
};
