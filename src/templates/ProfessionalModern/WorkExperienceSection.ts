
export const getProfessionalModernWorkExperienceHTML = (workItems: WorkItem[], settings: Settings) => {
  if (!workItems || workItems.length === 0) return '';

  const workHTML = workItems
    .map(work => `
      <div style="margin-bottom: 24pt; padding: 20pt; background: white; border-radius: 8pt; border: 1pt solid #e2e8f0; box-shadow: 0 2pt 4pt rgba(0,0,0,0.05);">
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 10pt;">
          <div>
            <h3 style="font-size: 13pt; font-weight: 600; color: #2d3748; margin-bottom: 6pt; letter-spacing: 0.5px;">
              ${work.position}
            </h3>
            <div style="font-size: 12pt; color: #3182ce; font-weight: 500;">
              ${work.company} ${work.location ? `• ${work.location}` : ''}
            </div>
          </div>
          <div style="font-size: 10pt; color: #718096; font-weight: 500; text-align: right; background: #f7fafc; padding: 6pt 10pt; border-radius: 12pt;">
            ${work.startDate} - ${work.current ? 'Present' : work.endDate}
          </div>
        </div>
        <div style="font-size: 11pt; color: #4a5568; line-height: 1.7;">
          ${work.description}
        </div>
      </div>
    `)
    .join('');

  return `
    <div class="professional-modern-section">
      <h2 class="professional-modern-section-title">Work Experience</h2>
      ${workHTML}
    </div>
  `;
};
