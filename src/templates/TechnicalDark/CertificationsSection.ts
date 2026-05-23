
export const getTechnicalDarkCertificationsHTML = (certificationItems: CertificateItem[], settings: Settings) => {
  if (!certificationItems || certificationItems.length === 0) return '';

  const certificationsHTML = certificationItems
    .map(cert => `
      <div style="margin-bottom: 16pt; padding: 16pt; background: #262626; border: 1pt solid #404040; border-radius: 6pt; border-left: 4pt solid #ff69b4;">
        <div style="display: flex; justify-content: space-between; align-items: start;">
          <div>
            <h3 style="font-size: 12pt; font-weight: 700; color: #ff69b4; margin-bottom: 4pt; font-family: 'Courier New', monospace;">
              ${cert.name}
            </h3>
            <div style="font-size: 11pt; color: #e5e5e5; font-family: 'Courier New', monospace;">
              ${cert.authority}
            </div>
          </div>
          <div style="font-size: 10pt; color: #00ffff; text-align: right; font-family: 'Courier New', monospace; background: #1a1a1a; padding: 6pt 10pt; border-radius: 4pt;">
            ${cert.date}
            ${cert.certificationUrlOrCode ? `<br><span style="color: #ff69b4;">ID: ${cert.certificationUrlOrCode}</span>` : ''}
          </div>
        </div>
      </div>
    `)
    .join('');

  return `
    <div class="technical-dark-section">
      <h2 class="technical-dark-section-title"># CERTIFICATIONS</h2>
      ${certificationsHTML}
    </div>
  `;
};
