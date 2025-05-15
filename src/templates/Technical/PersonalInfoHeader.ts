export const getPersonalInfoHTML = (basics: Basics): string => {
  const {name, email, phone, location, socials} = basics;

  // Create social media links
  const socialLinks =
    socials && socials.length > 0
      ? socials
          .map(
            (social: LinkItem) => `
          <a href="${
            social.url || '#'
          }" class="social-link" target="_blank" rel="noopener noreferrer">
            ${social.label}
          </a>
        `,
          )
          .join('')
      : '';

  return `
    <div class="personal-info">
      <div class="name">${name || ''}</div>
      <div class="contact-info">
        ${email ? `<div class="contact-item">${email}</div>` : ''}
        ${phone ? `<div class="contact-item">${phone}</div>` : ''}
        ${location ? `<div class="contact-item">${location}</div>` : ''}
      </div>
      ${socialLinks ? `<div class="social-links">${socialLinks}</div>` : ''}
    </div>
  `;
};
