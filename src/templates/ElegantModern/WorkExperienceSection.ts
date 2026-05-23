
export const getElegantModernWorkExperienceHTML = (workItems: WorkItem[], settings: Settings) => {
  if (!workItems || workItems.length === 0) return '';

  const workHTML = workItems
    .map(work => `
      <div style="margin-bottom: 28pt; padding: 24pt; background: linear-gradient(135deg, #f8fafc 0%, #edf2f7 100%); border-radius: 16pt; position: relative; overflow: hidden; border: 1pt solid #e2e8f0;">
        <div style="position: absolute; top: -20pt; right: -20pt; width: 80pt; height: 80pt; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; opacity: 0.1;"></div>
        <div style="position: relative; z-index: 1;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12pt;">
            <div>
              <h3 style="font-size: 14pt; font-weight: 400; color: #667eea; margin-bottom: 4pt; letter-spacing: 1px;">
                ${work.position}
              </h3>
              <div style="font-size: 12pt; color: #4a5568; font-weight: 300;">
                ${work.company} ${work.location ? `• ${work.location}` : ''}
              </div>
            </div>
            <div style="font-size: 10pt; color: white; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 8pt 12pt; border-radius: 20pt; font-weight: 300;">
              ${work.startDate} - ${work.current ? 'Present' : work.endDate}
            </div>
          </div>
          <div style="font-size: 11pt; color: #4a5568; line-height: 1.8; font-weight: 300;">
            ${work.description}
          </div>
        </div>
      </div>
    `)
    .join('');

  return `
    <div class="elegant-modern-section">
      <h2 class="elegant-modern-section-title">Experience</h2>
      ${workHTML}
    </div>
  `;
};
