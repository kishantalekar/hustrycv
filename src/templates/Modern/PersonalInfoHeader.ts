import { Basics } from '@/types';

export const getPersonalInfoHTML = (basics: Basics): string => {
  const { name, location } = basics;

  return `
    <div class="personal-info-header">
      <h1 class="name">${name || ''}</h1>
      ${location ? `<div class="location">${location}</div>` : ''}
    </div>
  `;
};
