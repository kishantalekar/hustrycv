
export const getModernArtisticWorkExperienceHTML = (workItems: WorkItem[], settings: Settings) => {
  if (!workItems || workItems.length === 0) return '';

  const workHTML = workItems
    .filter(item => item.status !== 'disabled')
    .map((work, index) => {
      const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];
      const color = colors[index % colors.length];
      
      return `
        <div style="margin-bottom: 28pt; padding: 24pt; background: rgba(255,255,255,0.8); border-radius: 16pt; border-left: 5pt solid ${color}; box-shadow: 0 8pt 32pt rgba(0,0,0,0.1); position: relative; overflow: hidden;">
          <div style="position: absolute; top: -10pt; right: -10pt; width: 60pt; height: 60pt; background: ${color}; border-radius: 50%; opacity: 0.1; transform: rotate(${index * 30}deg);"></div>
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12pt; position: relative; z-index: 1;">
            <div>
              <h3 style="font-size: 14pt; font-weight: 700; color: #2d3748; margin-bottom: 4pt;">${work.position}</h3>
              <div style="font-size: 12pt; color: ${color}; font-weight: 600;">${work.company}</div>
            </div>
            <div style="text-align: right; font-size: 10pt; color: #4a5568;">
              <div>${work.startDate} - ${work.current ? 'Present' : work.endDate}</div>
              ${work.location ? `<div style="margin-top: 2pt;">${work.location}</div>` : ''}
            </div>
          </div>
          <div style="font-size: 11pt; color: #4a5568; line-height: 1.7; position: relative; z-index: 1;">
            ${work.description}
          </div>
        </div>
      `;
    })
    .join('');

  return `
    <div style="margin: 32pt; position: relative;">
      <div style="position: absolute; top: -15pt; right: -25pt; width: 50pt; height: 50pt; background: linear-gradient(45deg, #ff9ff3, #54a0ff); clip-path: polygon(50% 0%, 0% 100%, 100% 100%); opacity: 0.2;"></div>
      <h2 style="font-size: 16pt; font-weight: 700; color: #2d3748; margin-bottom: 20pt; text-transform: uppercase; letter-spacing: 1.5pt; position: relative; z-index: 1;">
        Work Experience
      </h2>
      ${workHTML}
    </div>
  `;
};
