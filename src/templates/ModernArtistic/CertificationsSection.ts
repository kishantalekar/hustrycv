
export const getModernArtisticCertificationsHTML = (certificationItems: CertificateItem[], settings: Settings) => {
  if (!certificationItems || certificationItems.length === 0) return '';

  const certificationsHTML = certificationItems
    .map((cert, index) => {
      const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1'];
      const color = colors[index % colors.length];
      
      return `
        <div style="margin-bottom: 20pt; padding: 16pt; background: rgba(255,255,255,0.8); border-radius: 10pt; border-left: 3pt solid ${color}; box-shadow: 0 4pt 16pt rgba(0,0,0,0.08); position: relative;">
          <div style="position: absolute; top: 8pt; right: 8pt; width: 12pt; height: 12pt; background: ${color}; border-radius: 50%; opacity: 0.4;"></div>
          <h3 style="font-size: 12pt; font-weight: 600; color: #2d3748; margin-bottom: 4pt; position: relative; z-index: 1;">${cert.name}</h3>
          <div style="font-size: 10pt; color: #4a5568; margin-bottom: 4pt; position: relative; z-index: 1;">${cert.authority} • ${cert.date}</div>
          ${cert.description ? `<div style="font-size: 10pt; color: #4a5568; line-height: 1.6; position: relative; z-index: 1;">${cert.description}</div>` : ''}
        </div>
      `;
    })
    .join('');

  return `
    <div style="margin: 32pt;">
      <h2 style="font-size: 16pt; font-weight: 700; color: #2d3748; margin-bottom: 20pt; text-transform: uppercase; letter-spacing: 1.5pt;">
        Certifications
      </h2>
      ${certificationsHTML}
    </div>
  `;
};
