
export const getProfessionalTwoColumnCertificationsHTML = (certificationItems: CertificateItem[], settings: Settings) => {
  if (!certificationItems || certificationItems.length === 0) return '';

  const certificationsHTML = certificationItems
    .map(cert => `
      <div style="margin-bottom: 12pt;">
        <h3 style="font-size: 10pt; font-weight: 600; color: white; margin-bottom: 4pt;">
          ${cert.name}
        </h3>
        <div style="font-size: 9pt; color: #e5e7eb; margin-bottom: 2pt;">
          ${cert.authority}
        </div>
        <div style="font-size: 9pt; color: #9ca3af;">
          ${cert.date}
        </div>
      </div>
    `)
    .join('');

  return `
    <div style="margin-bottom: 24pt;">
      <h2 style="font-size: 12pt; font-weight: 700; color: white; margin-bottom: 16pt; text-transform: uppercase; letter-spacing: 2px; border-bottom: 2pt solid #2563eb; padding-bottom: 8pt;">
        Certifications
      </h2>
      ${certificationsHTML}
    </div>
  `;
};
