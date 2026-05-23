
export const getTechnicalBlueWorkExperienceHTML = (workItems: WorkItem[], settings: Settings) => {
  if (!workItems || workItems.length === 0) return '';

  const workHTML = workItems
    .map(work => `
      <div style="margin-bottom: 24pt; padding: 20pt; background: white; border: 2pt solid #3b82f6; border-radius: 8pt; box-shadow: 0 4pt 8pt rgba(59, 130, 246, 0.1);">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10pt;">
          <div>
            <h3 style="font-size: 14pt; font-weight: 600; color: #1e40af; margin-bottom: 4pt; font-family: 'Fira Code', monospace;">
              ${work.position}
            </h3>
            <div style="font-size: 12pt; color: #2563eb; font-family: 'Fira Code', monospace;">
              ${work.company} ${work.location ? `• ${work.location}` : ''}
            </div>
          </div>
          <div style="font-size: 10pt; color: white; background: #2563eb; padding: 6pt 10pt; border-radius: 6pt; font-family: 'Fira Code', monospace; font-weight: 500;">
            ${work.startDate} - ${work.current ? 'Present' : work.endDate}
          </div>
        </div>
        <div style="font-size: 11pt; color: #1e40af; line-height: 1.6; font-family: 'Fira Code', monospace;">
          ${work.description}
        </div>
      </div>
    `)
    .join('');

  return `
    <div class="technical-blue-section">
      <h2 class="technical-blue-section-title">// WORK EXPERIENCE</h2>
      ${workHTML}
    </div>
  `;
};
