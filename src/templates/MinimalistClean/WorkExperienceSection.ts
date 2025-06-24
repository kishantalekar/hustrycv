
export const getMinimalistCleanWorkExperienceHTML = (workItems: WorkItem[], settings: Settings) => {
  if (!workItems || workItems.length === 0) return '';

  const workHTML = workItems
    .map(work => `
      <div style="margin-bottom: 32pt; page-break-inside: avoid;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8pt;">
          <h3 style="font-size: 11pt; font-weight: 200; color: #111827; letter-spacing: 2px;">${work.position}</h3>
          <span style="font-size: 8pt; color: #6b7280; font-weight: 100; letter-spacing: 2px;">${work.startDate} - ${work.endDate}</span>
        </div>
        <div style="font-size: 9pt; color: #6b7280; margin-bottom: 12pt; font-weight: 100; letter-spacing: 2px; text-transform: uppercase;">
          ${work.company}
        </div>
        <div style="font-size: 9pt; color: #4b5563; line-height: 2.0; font-weight: 200; text-align: justify;">
          ${work.description}
        </div>
      </div>
    `)
    .join('');

  return `
    <div class="minimalist-clean-section">
      <h2 class="minimalist-clean-section-title">experience</h2>
      ${workHTML}
    </div>
  `;
};
