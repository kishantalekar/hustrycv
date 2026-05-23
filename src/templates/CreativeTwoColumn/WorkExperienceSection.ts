
export const getCreativeTwoColumnWorkExperienceHTML = (workItems: WorkItem[], settings: Settings) => {
  if (!workItems || workItems.length === 0) return '';

  const workHTML = workItems
    .map((work, index) => `
      <div style="margin-bottom: 28pt; page-break-inside: avoid; position: relative;">
        <div style="position: absolute; left: -20pt; top: 10pt; width: 12pt; height: 12pt; background: linear-gradient(135deg, #8b5cf6, #f59e0b); border-radius: 50%; box-shadow: 0 0 0 4pt white, 0 0 0 6pt #e5e7eb;"></div>
        <div style="padding-left: 24pt; border-left: 3pt solid #e5e7eb; padding-bottom: 16pt;">
          <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 10pt;">
            <div>
              <h3 style="font-size: 15pt; font-weight: 700; color: #8b5cf6; margin-bottom: 6pt;">
                ${work.position}
              </h3>
              <div style="font-size: 12pt; color: #f59e0b; font-weight: 600;">
                ${work.company} ${work.location ? `• ${work.location}` : ''}
              </div>
            </div>
            <div style="font-size: 11pt; color: #6b7280; text-align: right; min-width: 120pt; background: #f3f4f6; padding: 8pt 12pt; border-radius: 8pt;">
              ${work.startDate} - ${work.current ? 'Present' : work.endDate}
            </div>
          </div>
          <div style="font-size: 11pt; color: #4b5563; line-height: 1.7;">
            ${work.description}
          </div>
        </div>
      </div>
    `)
    .join('');

  return `
    <div class="creative-two-column-section">
      <h2 class="creative-two-column-section-title">Professional Journey</h2>
      <div style="position: relative; padding-left: 20pt;">
        ${workHTML}
      </div>
    </div>
  `;
};
