
export const getModernArtisticPersonalInfoHTML = (basics: Basics, settings: Settings) => {
  const contactItems = ([] as string[])
    .concat(basics.phone ? [basics.phone] : [])
    .concat(basics.email ? [basics.email] : [])
    .concat(basics.location ? [basics.location] : [])
    .join(" • ");

  return `
    <div style="background: linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%); color: white; padding: 40pt 32pt; clip-path: polygon(0 0, 100% 0, 80% 100%, 0% 100%); position: relative;">
      <div style="position: absolute; top: 20pt; right: 20pt; width: 60pt; height: 60pt; background: rgba(255,255,255,0.2); border-radius: 50%; transform: rotate(45deg);"></div>
      <div style="position: absolute; bottom: 30pt; right: 50pt; width: 30pt; height: 30pt; background: rgba(255,255,255,0.15); clip-path: polygon(50% 0%, 0% 100%, 100% 100%);"></div>
      <h1 style="font-size: 28pt; font-weight: 700; margin-bottom: 12pt; text-shadow: 0 3pt 6pt rgba(0,0,0,0.3); letter-spacing: -0.5pt; position: relative; z-index: 1;">
        ${basics.name}
      </h1>
      <div style="font-size: 11pt; opacity: 0.9; margin-bottom: 8pt; position: relative; z-index: 1;">
        ${contactItems}
      </div>
      ${basics.socials?.length > 0 ? `
        <div style="font-size: 10pt; opacity: 0.8; position: relative; z-index: 1;">
          ${basics.socials.map(social => `<span style="margin-right: 15pt;">${social.label}</span>`).join('')}
        </div>
      ` : ''}
    </div>
  `;
};
