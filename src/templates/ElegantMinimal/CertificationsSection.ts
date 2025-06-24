
export const getElegantMinimalCertificationsHTML = (certificationItems: CertificateItem[], settings: Settings) => {
  if (!certificationItems || certificationItems.length === 0) return '';

  const certificationsHTML = certificationItems
    .map(cert => `
      <div style="margin-bottom: 20pt;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1pt solid #f1f5f9; padding-bottom: 6pt;">
          <div>
            <h3 style="font-size: 11pt; font-weight: 300; color: #2d3748; margin-bottom: 2pt; letter-spacing: 2px;">
              ${cert.name}
            </h3>
            <div style="font-size: 10pt; color: #718096; font-weight: 300; letter-spacing: 1px;">
              ${cert.authority}
            </div>
          </div>
          <div style="font-size: 9pt; color: #a0aec0; font-weight: 300; letter-spacing: 1px; text-align: right;">
            ${cert.date}
            ${cert.certificationUrlOrCode ? `<br><span style="color: #2d3748;">ID: ${cert.certificationUrlOrCode}</span>` : ''}
          </div>
        </div>
      </div>
    `)
    .join('');

  return `
    <div class="elegant-minimal-section">
      <h2 class="elegant-minimal-section-title">certifications</h2>
      ${certificationsHTML}
    </div>
  `;
};
