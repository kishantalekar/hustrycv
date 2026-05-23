
export const getTechnicalTwoColumnCertificationsHTML = (certificationItems: CertificateItem[], settings: Settings) => {
  if (!certificationItems || certificationItems.length === 0) return '';

  const certificationsHTML = certificationItems
    .map(cert => `
      <div style="margin-bottom: 12pt; background: #333; padding: 12pt; border-radius: 4pt; border: 1pt solid #00ff88;">
        <h3 style="font-size: 10pt; font-weight: 600; color: #00ff88; margin-bottom: 4pt; font-family: 'Courier New', monospace;">
          ${cert.name}
        </h3>
        <div style="font-size: 9pt; color: #ccc; margin-bottom: 2pt; font-family: 'Courier New', monospace;">
          issuer: ${cert.authority}
        </div>
        <div style="font-size: 9pt; color: #888; font-family: 'Courier New', monospace;">
          date: ${cert.date}
        </div>
      </div>
    `)
    .join('');

  return `
    <div style="margin-bottom: 24pt;">
      <h2 style="font-size: 12pt; font-weight: 700; color: #00ff88; margin-bottom: 16pt; font-family: 'Courier New', monospace; border-bottom: 2pt solid #00ff88; padding-bottom: 8pt;">
        # certificates.list
      </h2>
      ${certificationsHTML}
    </div>
  `;
};
