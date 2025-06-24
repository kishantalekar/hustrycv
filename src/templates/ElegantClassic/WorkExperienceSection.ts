
export const getElegantClassicWorkExperienceHTML = (workItems: WorkItem[], settings: Settings) => {
  if (!workItems || workItems.length === 0) return '';

  const workHTML = workItems
    .map(work => `
      <div style="margin-bottom: 24pt; padding: 20pt; background: #faf5ff; border-left: 4pt solid #5a67d8; border-radius: 0 8pt 8pt 0;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10pt;">
          <div>
            <h3 style="font-size: 14pt; font-weight: 500; color: #5a67d8; margin-bottom: 4pt; font-family: 'Georgia', serif;">
              ${work.position}
            </h3>
            <div style="font-size: 12pt; color: #4a5568; font-family: 'Georgia', serif; font-style: italic;">
              ${work.company} ${work.location ? `• ${work.location}` : ''}
            </div>
          </div>
          <div style="font-size: 10pt; color: #6b7280; text-align: right; background: white; padding: 6pt 12pt; border-radius: 12pt; border: 1pt solid #e5e7eb;">
            ${work.startDate} - ${work.current ? 'Present' : work.endDate}
          </div>
        </div>
        <div style="font-size: 12pt; color: #4a5568; line-height: 1.8; font-family: 'Georgia', serif;">
          ${work.description}
        </div>
      </div>
    `)
    .join('');

  return `
    <div class="elegant-classic-section">
      <h2 class="elegant-classic-section-title">Professional Experience</h2>
      ${workHTML}
    </div>
  `;
};
