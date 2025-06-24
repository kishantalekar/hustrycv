
export const getTechnicalDarkWorkExperienceHTML = (workItems: WorkItem[], settings: Settings) => {
  if (!workItems || workItems.length === 0) return '';

  const workHTML = workItems
    .map(work => `
      <div style="margin-bottom: 24pt; padding: 20pt; background: #262626; border: 1pt solid #404040; border-radius: 8pt; border-left: 4pt solid #00ff88;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10pt;">
          <div>
            <h3 style="font-size: 14pt; font-weight: 700; color: #00ff88; margin-bottom: 4pt; font-family: 'Courier New', monospace;">
              ${work.position}
            </h3>
            <div style="font-size: 12pt; color: #e5e5e5; font-family: 'Courier New', monospace;">
              ${work.company} ${work.location ? `• ${work.location}` : ''}
            </div>
          </div>
          <div style="font-size: 10pt; color: #00ffff; font-family: 'Courier New', monospace; background: #1a1a1a; padding: 6pt 10pt; border-radius: 4pt; border: 1pt solid #404040;">
            ${work.startDate} - ${work.current ? 'Present' : work.endDate}
          </div>
        </div>
        <div style="font-size: 11pt; color: #cccccc; line-height: 1.6; font-family: 'Courier New', monospace;">
          ${work.description}
        </div>
      </div>
    `)
    .join('');

  return `
    <div class="technical-dark-section">
      <h2 class="technical-dark-section-title"># WORK_EXPERIENCE</h2>
      ${workHTML}
    </div>
  `;
};
