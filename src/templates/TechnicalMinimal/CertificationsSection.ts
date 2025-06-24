
export const getTechnicalMinimalCertificationsHTML = (certificationItems: CertificateItem[], settings: Settings) => {
  if (!certificationItems || certificationItems.length === 0) return '';

  const certificationsHTML = certificationItems
    .map(cert => `
      <div style="margin-bottom: 16pt; padding: 12pt; border: 1pt solid #e5e7eb; border-radius: 4pt;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1pt solid #f3f4f6; padding-bottom: 4pt;">
          <div>
            <h3 style="font-size: 11pt; font-weight: 400; color: #374151; margin-bottom: 2pt; font-family: 'Monaco', monospace;">
              ${cert.name}
            </h3>
            <div style="font-size: 10pt; color: #6b7280; font-family: 'Monaco', monospace;">
              ${cert.authority}
            </div>
          </div>
          <div style="font-size: 9pt; color: #9ca3af; font-family: 'Monaco', monospace; text-align: right;">
            ${cert.date}
            ${cert.certificationUrlOrCode ? `<br>ID: ${cert.certificationUrlOrCode}` : ''}
          </div>
        </div>
      </div>
    `)
    .join('');

  return `
    <div class="technical-minimal-section">
      <h2 class="technical-minimal-section-title">certifications</h2>
      ${certificationsHTML}
    </div>
  `;
};
