
export const getMinimalistModernCertificationsHTML = (certificationItems: CertificateItem[], settings: Settings) => {
  if (!certificationItems || certificationItems.length === 0) return '';

  const certificationsHTML = certificationItems
    .map(cert => `
      <div style="margin-bottom: 16pt; page-break-inside: avoid; padding: 16pt; background: #f9fafb; border-radius: 4pt;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6pt;">
          <h3 style="font-size: 11pt; font-weight: 400; color: #1f2937; letter-spacing: 1px;">${cert.name}</h3>
          <span style="font-size: 9pt; color: #6b7280; font-weight: 300;">${cert.date}</span>
        </div>
        <div style="font-size: 10pt; color: #4f46e5; font-weight: 300;">
          ${cert.authority}
        </div>
      </div>
    `)
    .join('');

  return `
    <div class="minimalist-modern-section">
      <h2 class="minimalist-modern-section-title">certifications</h2>
      ${certificationsHTML}
    </div>
  `;
};
