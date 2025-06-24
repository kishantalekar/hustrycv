
export const getModernNeonCertificationsHTML = (certificationItems: CertificateItem[], settings: Settings) => {
  if (!certificationItems || certificationItems.length === 0) return '';

  const certificationsHTML = certificationItems
    .map(cert => `
      <div style="margin-bottom: 16pt; padding: 14pt; background: #111111; border: 1pt solid #00ffff; border-radius: 4pt; box-shadow: 0 0 8pt #00ffff20;">
        <h3 style="font-size: 12pt; font-weight: 600; color: #00ffff; margin-bottom: 4pt; text-shadow: 0 0 5pt #00ffff;">${cert.name}</h3>
        <div style="font-size: 10pt; color: #cccccc; margin-bottom: 4pt;">${cert.authority} • ${cert.date}</div>
        ${cert.description ? `<div style="font-size: 10pt; color: #ffffff; line-height: 1.5; opacity: 0.8;">${cert.description}</div>` : ''}
      </div>
    `)
    .join('');

  return `
    <div style="margin: 32pt;">
      <h2 style="font-size: 16pt; font-weight: 700; color: #00ffff; margin-bottom: 20pt; text-transform: uppercase; letter-spacing: 2pt; text-shadow: 0 0 10pt #00ffff;">
        Certifications
      </h2>
      ${certificationsHTML}
    </div>
  `;
};
