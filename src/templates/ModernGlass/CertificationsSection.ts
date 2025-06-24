
export const getModernGlassCertificationsHTML = (certificationItems: CertificateItem[], settings: Settings) => {
  if (!certificationItems || certificationItems.length === 0) return '';

  const certificationsHTML = certificationItems
    .map(cert => `
      <div style="margin-bottom: 20pt; padding: 16pt; background: rgba(255,255,255,0.25); backdrop-filter: blur(10pt); -webkit-backdrop-filter: blur(10pt); border-radius: 8pt; border: 1pt solid rgba(255,255,255,0.2);">
        <h3 style="font-size: 12pt; font-weight: 600; color: #1a365d; margin-bottom: 4pt;">${cert.name}</h3>
        <div style="font-size: 10pt; color: #4a5568; margin-bottom: 4pt;">${cert.authority} • ${cert.date}</div>
        ${cert.description ? `<div style="font-size: 10pt; color: #4a5568; line-height: 1.6;">${cert.description}</div>` : ''}
      </div>
    `)
    .join('');

  return `
    <div class="modern-glass-section">
      <h2 class="modern-glass-section-title">Certifications</h2>
      ${certificationsHTML}
    </div>
  `;
};
