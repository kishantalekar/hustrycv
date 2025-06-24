
export const getCreativeTwoColumnCertificationsHTML = (certificationItems: CertificateItem[], settings: Settings) => {
  if (!certificationItems || certificationItems.length === 0) return '';

  const certificationsHTML = certificationItems
    .map(cert => `
      <div style="margin-bottom: 16pt; background: white; padding: 16pt; border-radius: 12pt; border: 2pt solid transparent; background: linear-gradient(white, white) padding-box, linear-gradient(135deg, #8b5cf6, #f59e0b) border-box; box-shadow: 0 2pt 8pt rgba(139, 92, 246, 0.1);">
        <h3 style="font-size: 12pt; font-weight: 700; color: #8b5cf6; margin-bottom: 6pt;">
          ${cert.name}
        </h3>
        <div style="font-size: 10pt; color: #f59e0b; margin-bottom: 4pt; font-weight: 600;">
          ${cert.authority}
        </div>
        <div style="font-size: 10pt; color: #6b7280; font-weight: 500;">
          ${cert.date}
        </div>
      </div>
    `)
    .join('');

  return `
    <div style="margin-bottom: 28pt;">
      <h2 style="font-size: 16pt; font-weight: 800; background: linear-gradient(135deg, #8b5cf6, #f59e0b); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 20pt; text-transform: uppercase; letter-spacing: 2px;">
        Certifications
      </h2>
      ${certificationsHTML}
    </div>
  `;
};
