
export const getTechnicalMinimalWorkExperienceHTML = (workItems: WorkItem[], settings: Settings) => {
  if (!workItems || workItems.length === 0) return '';

  const workHTML = workItems
    .map(work => `
      <div style="margin-bottom: 24pt; padding: 16pt; border: 1pt solid #e5e7eb; border-radius: 4pt;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8pt; border-bottom: 1pt solid #f3f4f6; padding-bottom: 6pt;">
          <div>
            <h3 style="font-size: 12pt; font-weight: 400; color: #374151; margin-bottom: 2pt; font-family: 'Monaco', monospace;">
              ${work.position}
            </h3>
            <div style="font-size: 10pt; color: #6b7280; font-family: 'Monaco', monospace;">
              ${work.company} ${work.location ? `| ${work.location}` : ''}
            </div>
          </div>
          <div style="font-size: 9pt; color: #9ca3af; font-family: 'Monaco', monospace;">
            ${work.startDate} - ${work.current ? 'Present' : work.endDate}
          </div>
        </div>
        <div style="font-size: 10pt; color: #4b5563; line-height: 1.7; font-family: 'Monaco', monospace;">
          ${work.description}
        </div>
      </div>
    `)
    .join('');

  return `
    <div class="technical-minimal-section">
      <h2 class="technical-minimal-section-title">work_experience</h2>
      ${workHTML}
    </div>
  `;
};
