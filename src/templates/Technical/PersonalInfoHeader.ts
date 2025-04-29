import { Basics } from '../../components/ResumePreview/ResumePreview.types';

export const getPersonalInfoHTML = (basics: Basics): string => {
  const { name, label, email, phone, url, location, profiles } = basics;

  // Create social media links
  const socialLinks = profiles
    ? profiles
        .filter((profile) => profile.network && profile.username)
        .map(
          (profile) => `
          <a href="${profile.url || '#'}" class="social-link">${
            profile.network
          }</a>
        `,
        )
        .join('')
    : '';

  return `
    <div class="personal-info">
      <div class="name">${name || ''}</div>
      ${label ? `<div class="title">${label}</div>` : ''}
      <div class="contact-info">
        ${email ? `<div class="contact-item">${email}</div>` : ''}
        ${phone ? `<div class="contact-item">${phone}</div>` : ''}
        ${url ? `<div class="contact-item">${url}</div>` : ''}
        ${
          location?.city
            ? `<div class="contact-item">${location.city}${
                location.region ? `, ${location.region}` : ''
              }</div>`
            : ''
        }
      </div>
      ${socialLinks ? `<div class="social-links">${socialLinks}</div>` : ''}
    </div>
  `;
};
