
export const getMinimalistModernWorkExperienceHTML = (workItems: WorkItem[], settings: Settings) => {
  if (!workItems || workItems.length === 0) return '';

  const workHTML = workItems
    .map(work => `
      <div style="margin-bottom: 24pt; page-break-inside: avoid;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8pt;">
          <h3 style="font-size: 12pt; font-weight: 400; color: #1f2937; letter-spacing: 1px;">${work.position}</h3>
          <span style="font-size: 9pt; color: #6b7280; font-weight: 300;">${work.startDate} - ${work.endDate}</span>
        </div>
        <div style="font-size: 10pt; color: #4f46e5; margin-bottom: 12pt; font-weight: 400;">
          ${work.company}
        </div>
        <div style="font-size: 10pt; color: #374151; line-height: 1.8; font-weight: 300; text-align: justify; padding: 12pt; background: #f9fafb; border-radius: 4pt;">
          ${work.description}
        </div>
      </div>
    `)
    .join('');

  return `
    <div class="minimalist-modern-section">
      <h2 class="minimalist-modern-section-title">experience</h2>
      ${workHTML}
    </div>
  `;
};
