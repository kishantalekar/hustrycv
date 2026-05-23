
export const getMinimalistCleanCertificationsHTML = (certificationItems: CertificateItem[], settings: Settings) => {
  if (!certificationItems || certificationItems.length === 0) return '';

  const certificationsHTML = certificationItems
    .map(cert => `
      <div style="margin-bottom: 24pt; page-break-inside: avoid;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6pt;">
          <h3 style="font-size: 10pt; font-weight: 200; color: #111827; letter-spacing: 2px;">${cert.name}</h3>
          <span style="font-size: 8pt; color: #6b7280; font-weight: 100; letter-spacing: 2px;">${cert.date}</span>
        </div>
        <div style="font-size: 9pt; color: #6b7280; font-weight: 100; letter-spacing: 2px; text-transform: uppercase;">
          ${cert.authority}
        </div>
      </div>
    `)
    .join('');

  return `
    <div class="minimalist-clean-section">
      <h2 class="minimalist-clean-section-title">certifications</h2>
      ${certificationsHTML}
    </div>
  `;
};
