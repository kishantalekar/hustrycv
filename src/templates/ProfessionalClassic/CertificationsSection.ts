
export const getProfessionalClassicCertificationsHTML = (certificationItems: CertificateItem[], settings: Settings) => {
  if (!certificationItems || certificationItems.length === 0) return '';

  const certificationsHTML = certificationItems
    .map(cert => `
      <div style="margin-bottom: 20pt; padding: 16pt; background: #f8f9fa; border-left: 3pt solid #2d3748; border-radius: 4pt;">
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8pt;">
          <div>
            <h3 style="font-size: 12pt; font-weight: 700; color: #2d3748; margin-bottom: 4pt; font-family: 'Times New Roman', serif;">
              ${cert.name}
            </h3>
            <div style="font-size: 11pt; color: #4a5568; font-style: italic; font-family: 'Times New Roman', serif;">
              ${cert.authority}
            </div>
          </div>
          <div style="font-size: 10pt; color: #718096; text-align: right; font-family: 'Times New Roman', serif;">
            ${cert.date}
            ${cert.certificationUrlOrCode ? `<br><span style="font-weight: 600;">ID: ${cert.certificationUrlOrCode}</span>` : ''}
          </div>
        </div>
        ${cert.description ? `
          <div style="font-size: 10pt; color: #4a5568; line-height: 1.6; font-family: 'Times New Roman', serif;">
            ${cert.description}
          </div>
        ` : ''}
      </div>
    `)
    .join('');

  return `
    <div class="professional-classic-section">
      <h2 class="professional-classic-section-title">Certifications</h2>
      ${certificationsHTML}
    </div>
  `;
};
