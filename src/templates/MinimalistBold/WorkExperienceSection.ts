
export const getMinimalistBoldWorkExperienceHTML = (workItems: WorkItem[], settings: Settings) => {
  if (!workItems || workItems.length === 0) return '';

  const workHTML = workItems
    .map(work => `
      <div style="margin-bottom: 32pt; page-break-inside: avoid;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 12pt;">
          <h3 style="font-size: 14pt; font-weight: 700; color: #000000; text-transform: uppercase; letter-spacing: 2px;">${work.position}</h3>
          <span style="font-size: 10pt; color: #374151; font-weight: 600;">${work.startDate} - ${work.endDate}</span>
        </div>
        <div style="font-size: 12pt; color: #000000; margin-bottom: 16pt; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
          ${work.company}
        </div>
        <div style="font-size: 11pt; color: #374151; line-height: 1.7; font-weight: 500; text-align: justify; padding: 20pt; border: 2pt solid #000000;">
          ${work.description}
        </div>
      </div>
    `)
    .join('');

  return `
    <div class="minimalist-bold-section">
      <h2 class="minimalist-bold-section-title">EXPERIENCE</h2>
      ${workHTML}
    </div>
  `;
};
