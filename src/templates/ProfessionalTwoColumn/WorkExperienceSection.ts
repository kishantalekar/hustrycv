
export const getProfessionalTwoColumnWorkExperienceHTML = (workItems: WorkItem[], settings: Settings) => {
  if (!workItems || workItems.length === 0) return '';

  const workHTML = workItems
    .map(work => `
      <div style="margin-bottom: 24pt; page-break-inside: avoid;">
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8pt;">
          <div>
            <h3 style="font-size: 13pt; font-weight: 600; color: #1f2937; margin-bottom: 4pt;">
              ${work.position}
            </h3>
            <div style="font-size: 11pt; color: #2563eb; font-weight: 500;">
              ${work.company} ${work.location ? `• ${work.location}` : ''}
            </div>
          </div>
          <div style="font-size: 10pt; color: #6b7280; text-align: right; min-width: 100pt;">
            ${work.startDate} - ${work.current ? 'Present' : work.endDate}
          </div>
        </div>
        <div style="font-size: 10pt; color: #4b5563; line-height: 1.6;">
          ${work.description}
        </div>
      </div>
    `)
    .join('');

  return `
    <div class="professional-two-column-section">
      <h2 class="professional-two-column-section-title">Work Experience</h2>
      ${workHTML}
    </div>
  `;
};
