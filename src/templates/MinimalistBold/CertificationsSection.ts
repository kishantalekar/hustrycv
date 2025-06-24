
export const getMinimalistBoldCertificationsHTML = (certificationItems: CertificateItem[], settings: Settings) => {
  if (!certificationItems || certificationItems.length === 0) return '';

  const certificationsHTML = certificationItems
    .map(cert => `
      <div style="margin-bottom: 24pt; page-break-inside: avoid; padding: 20pt; border: 2pt solid #000000;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8pt;">
          <h3 style="font-size: 12pt; font-weight: 700; color: #000000; text-transform: uppercase; letter-spacing: 2px;">${cert.name}</h3>
          <span style="font-size: 10pt; color: #374151; font-weight: 600;">${cert.date}</span>
        </div>
        <div style="font-size: 11pt; color: #374151; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
          ${cert.authority}
        </div>
      </div>
    `)
    .join('');

  return `
    <div class="minimalist-bold-section">
      <h2 class="minimalist-bold-section-title">CERTIFICATIONS</h2>
      ${certificationsHTML}
    </div>
  `;
};
