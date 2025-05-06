import {Basics} from '@/types';
import {getSocialIcon} from '../icons';
import {getResumeStyles, SPACING} from '../styles/resumeStyles';

// TODO: need to add icons here for each social
export const getPersonalInfoHTML = (basics: Basics) => {
  const styles = getResumeStyles();
  const links = basics.socials
    .map(
      social =>
        `<span style="display: inline-flex; align-items: center; gap: 4px;">
          <a href="${social.url}" style="${
          styles.link
        }; display: inline-flex; align-items: center; gap: 4px;">
            ${getSocialIcon(social.icon)}
            ${social.label}
          </a>
        </span>`,
    )
    .join(' | ');

  const contactItems = ([] as string[])
    .concat(basics.phone ? [basics.phone] : [])
    .concat(basics.email ? [basics.email] : [])
    .map(
      item =>
        `<span style="display: inline-flex; align-items: center; gap: 4px;">
          <a href="${item}" style="${styles.link}; display: inline-flex; align-items: center; gap: 4px;">
            ${item}
          </a>
        </span>`,
    )
    .join(' | ');
  return `
  <div class="text-center mb-16">
    <h1 class="header">
      ${basics.name}
    </h1>
    <div class="text-regular" style="${styles.small}; margin: ${
    SPACING.sm
  }px 0; display: flex; gap: 4pt; justify-content: center; align-items: center; flex-wrap: wrap;">
      ${contactItems}${contactItems && links ? ' | ' : ''}${links}
    </div>
  </div>
`;
};
