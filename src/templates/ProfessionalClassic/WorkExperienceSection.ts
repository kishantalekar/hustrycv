
export const getProfessionalClassicWorkExperienceHTML = (workItems: WorkItem[], settings: Settings) => {
  if (!workItems || workItems.length === 0) return '';

  const workHTML = workItems
    .map(work => `
      <div style="margin-bottom: 24pt; padding-bottom: 20pt; border-bottom: 1pt solid #e2e8f0;">
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8pt;">
          <div>
            <h3 style="font-size: 13pt; font-weight: 700; color: #2d3748; margin-bottom: 4pt; font-family: 'Times New Roman', serif;">
              ${work.position}
            </h3>
            <div style="font-size: 12pt; color: #4a5568; font-weight: 600; font-family: 'Times New Roman', serif;">
              ${work.company} ${work.location ? `• ${work.location}` : ''}
            </div>
          </div>
          <div style="font-size: 11pt; color: #718096; font-style: italic; text-align: right; font-family: 'Times New Roman', serif;">
            ${work.startDate} - ${work.current ? 'Present' : work.endDate}
          </div>
        </div>
        <div style="font-size: 11pt; color: #4a5568; line-height: 1.7; text-align: justify; font-family: 'Times New Roman', serif;">
          ${work.description}
        </div>
      </div>
    `)
    .join('');

  return `
    <div class="professional-classic-section">
      <h2 class="professional-classic-section-title">Professional Experience</h2>
      ${workHTML}
    </div>
  `;
};
