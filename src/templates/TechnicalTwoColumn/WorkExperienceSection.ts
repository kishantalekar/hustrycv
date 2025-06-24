
export const getTechnicalTwoColumnWorkExperienceHTML = (workItems: WorkItem[], settings: Settings) => {
  if (!workItems || workItems.length === 0) return '';

  const workHTML = workItems
    .map(work => `
      <div style="margin-bottom: 24pt; page-break-inside: avoid; background: #1a1a1a; padding: 16pt; border-radius: 4pt; border-left: 4pt solid #00ff88;">
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8pt;">
          <div>
            <h3 style="font-size: 13pt; font-weight: 600; color: #00ff88; margin-bottom: 4pt; font-family: 'Courier New', monospace;">
              ${work.position}
            </h3>
            <div style="font-size: 11pt; color: #ccc; font-family: 'Courier New', monospace;">
              ${work.company} ${work.location ? `// ${work.location}` : ''}
            </div>
          </div>
          <div style="font-size: 10pt; color: #888; text-align: right; min-width: 100pt; font-family: 'Courier New', monospace;">
            ${work.startDate} - ${work.current ? 'current' : work.endDate}
          </div>
        </div>
        <div style="font-size: 10pt; color: #e5e7eb; line-height: 1.6; font-family: 'Courier New', monospace;">
          ${work.description}
        </div>
      </div>
    `)
    .join('');

  return `
    <div class="technical-two-column-section">
      <h2 class="technical-two-column-section-title">// work.experience[]</h2>
      ${workHTML}
    </div>
  `;
};
