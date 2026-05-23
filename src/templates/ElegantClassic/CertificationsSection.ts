
export const getElegantClassicCertificationsHTML = (certificationItems: CertificateItem[], settings: Settings) => {
  if (!certificationItems || certificationItems.length === 0) return '';

  const certificationsHTML = certificationItems
    .map(cert => `
      <div style="margin-bottom: 16pt; padding: 16pt; background: #fefce8; border: 1pt solid #fbbf24; border-radius: 8pt;">
        <div style="display: flex; justify-content: space-between; align-items: start;">
          <div>
            <h3 style="font-size: 12pt; font-weight: 500; color: #92400e; margin-bottom: 4pt; font-family: 'Georgia', serif;">
              ${cert.name}
            </h3>
            <div style="font-size: 11pt; color: #78716c; font-family: 'Georgia', serif; font-style: italic;">
              ${cert.authority}
            </div>
          </div>
          <div style="font-size: 10pt; color: #6b7280; text-align: right; background: white; padding: 6pt 10pt; border-radius: 8pt;">
            ${cert.date}
            ${cert.certificationUrlOrCode ? `<br><span style="font-weight: 500; color: #92400e;">ID: ${cert.certificationUrlOrCode}</span>` : ''}
          </div>
        </div>
      </div>
    `)
    .join('');

  return `
    <div class="elegant-classic-section">
      <h2 class="elegant-classic-section-title">Certifications</h2>
      ${certificationsHTML}
    </div>
  `;
};
