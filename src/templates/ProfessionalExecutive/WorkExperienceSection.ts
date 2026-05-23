
export const getProfessionalExecutiveWorkExperienceHTML = (workItems: WorkItem[], settings: Settings) => {
  if (!workItems || workItems.length === 0) return '';

  const workHTML = workItems
    .map(work => `
      <div style="margin-bottom: 28pt; padding: 20pt; background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%); border-radius: 8pt; border-left: 4pt solid #1a202c; position: relative;">
        <div style="position: absolute; top: 16pt; right: 16pt; width: 40pt; height: 40pt; background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%); border-radius: 50%; opacity: 0.1;"></div>
        <div style="position: relative; z-index: 1;">
          <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 12pt;">
            <div>
              <h3 style="font-size: 14pt; font-weight: 700; color: #1a202c; margin-bottom: 6pt; letter-spacing: 1px;">
                ${work.position}
              </h3>
              <div style="font-size: 12pt; color: #2d3748; font-weight: 600;">
                ${work.company} ${work.location ? `• ${work.location}` : ''}
              </div>
            </div>
            <div style="font-size: 11pt; color: #4a5568; font-weight: 300; text-align: right; background: white; padding: 6pt 12pt; border-radius: 16pt; border: 1pt solid #e2e8f0;">
              ${work.startDate} - ${work.current ? 'Present' : work.endDate}
            </div>
          </div>
          <div style="font-size: 11pt; color: #2d3748; line-height: 1.8; text-align: justify;">
            ${work.description}
          </div>
        </div>
      </div>
    `)
    .join('');

  return `
    <div class="professional-executive-section">
      <h2 class="professional-executive-section-title">Executive Experience</h2>
      ${workHTML}
    </div>
  `;
};
