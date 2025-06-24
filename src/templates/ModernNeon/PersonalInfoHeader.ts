
export const getModernNeonPersonalInfoHTML = (basics: Basics, settings: Settings) => {
  const contactItems = ([] as string[])
    .concat(basics.phone ? [basics.phone] : [])
    .concat(basics.email ? [basics.email] : [])
    .concat(basics.location ? [basics.location] : [])
    .join(" • ");

  return `
    <div style="background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%); color: #00ffff; padding: 40pt 32pt; text-shadow: 0 0 10pt #00ffff; border-bottom: 2pt solid #00ffff;">
      <h1 style="font-size: 28pt; font-weight: 800; margin-bottom: 12pt; text-shadow: 0 0 20pt #00ffff; letter-spacing: 1pt;">
        ${basics.name}
      </h1>
      <div style="font-size: 11pt; opacity: 0.8; margin-bottom: 8pt;">
        ${contactItems}
      </div>
      ${basics.socials?.length > 0 ? `
        <div style="font-size: 10pt; opacity: 0.7;">
          ${basics.socials.map(social => `<span style="margin-right: 15pt;">${social.label}</span>`).join('')}
        </div>
      ` : ''}
    </div>
  `;
};
