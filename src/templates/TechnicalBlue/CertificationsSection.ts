
export const getTechnicalBlueCertificationsHTML = (certificationItems: CertificateItem[], settings: Settings) => {
  if (!certificationItems || certificationItems.length === 0) return '';

  const certificationsHTML = certificationItems
    .map(cert => `
      <div style="margin-bottom: 16pt; padding: 16pt; background: #eff6ff; border: 1pt solid #3b82f6; border-radius: 6pt;">
        <div style="display: flex; justify-content: space-between; align-items: start;">
          <div>
            <h3 style="font-size: 12pt; font-weight: 600; color: #1e40af; margin-bottom: 4pt; font-family: 'Fira Code', monospace;">
              ${cert.name}
            </h3>
            <div style="font-size: 11pt; color: #2563eb; font-family: 'Fira Code', monospace;">
              ${cert.authority}
            </div>
          </div>
          <div style="font-size: 10pt; color: white; background: #2563eb; text-align: right; font-family: 'Fira Code', monospace; padding: 6pt 10pt; border-radius: 6pt;">
            ${cert.date}
            ${cert.certificationUrlOrCode ? `<br><span style="color: white;">ID: ${cert.certificationUrlOrCode}</span>` : ''}
          </div>
        </div>
      </div>
    `)
    .join('');

  return `
    <div class="technical-blue-section">
      <h2 class="technical-blue-section-title">// CERTIFICATIONS</h2>
      ${certificationsHTML}
    </div>
  `;
};
