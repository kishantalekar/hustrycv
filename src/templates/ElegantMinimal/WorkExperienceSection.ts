
export const getElegantMinimalWorkExperienceHTML = (workItems: WorkItem[], settings: Settings) => {
  if (!workItems || workItems.length === 0) return '';

  const workHTML = workItems
    .map(work => `
      <div style="margin-bottom: 32pt;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8pt; border-bottom: 1pt solid #f1f5f9; padding-bottom: 8pt;">
          <div>
            <h3 style="font-size: 12pt; font-weight: 300; color: #2d3748; margin-bottom: 2pt; letter-spacing: 2px;">
              ${work.position}
            </h3>
            <div style="font-size: 10pt; color: #718096; font-weight: 300; letter-spacing: 1px;">
              ${work.company} ${work.location ? `• ${work.location}` : ''}
            </div>
          </div>
          <div style="font-size: 9pt; color: #a0aec0; font-weight: 300; letter-spacing: 1px;">
            ${work.startDate} - ${work.current ? 'Present' : work.endDate}
          </div>
        </div>
        <div style="font-size: 10pt; color: #4a5568; line-height: 1.9; text-align: justify; font-weight: 300; padding-left: 16pt;">
          ${work.description}
        </div>
      </div>
    `)
    .join('');

  return `
    <div class="elegant-minimal-section">
      <h2 class="elegant-minimal-section-title">experience</h2>
      ${workHTML}
    </div>
  `;
};
