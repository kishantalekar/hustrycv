
export const getProfessionalModernCertificationsHTML = (certificationItems: CertificateItem[], settings: Settings) => {
  if (!certificationItems || certificationItems.length === 0) return '';

  const certificationsHTML = certificationItems
    .map(cert => `
      <div style="margin-bottom: 20pt; padding: 16pt; background: white; border-radius: 6pt; border: 1pt solid #e2e8f0; box-shadow: 0 1pt 3pt rgba(0,0,0,0.1);">
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8pt;">
          <div>
            <h3 style="font-size: 12pt; font-weight: 600; color: #2d3748; margin-bottom: 4pt;">
              ${cert.name}
            </h3>
            <div style="font-size: 11pt; color: #3182ce; font-weight: 500;">
              ${cert.authority}
            </div>
          </div>
          <div style="font-size: 10pt; color: #718096; text-align: right; background: #f7fafc; padding: 6pt 10pt; border-radius: 8pt;">
            ${cert.date}
            ${cert.certificationUrlOrCode ? `<br><span style="font-weight: 500; color: #2d3748;">ID: ${cert.certificationUrlOrCode}</span>` : ''}
          </div>
        </div>
        ${cert.description ? `
          <div style="font-size: 10pt; color: #4a5568; line-height: 1.6;">
            ${cert.description}
          </div>
        ` : ''}
      </div>
    `)
    .join('');

  return `
    <div class="professional-modern-section">
      <h2 class="professional-modern-section-title">Certifications</h2>
      ${certificationsHTML}
    </div>
  `;
};
