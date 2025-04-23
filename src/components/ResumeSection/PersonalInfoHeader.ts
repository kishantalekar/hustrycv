import {getResumeStyles, SPACING} from '../../utils/resumeStyles';
import {Basics} from '../ResumePreview/ResumePreview.types';

export const getPersonalInfoHTML = (basics: Basics, scale: number) => {
  const styles = getResumeStyles(scale);

  return `
  <div style="${styles.container} ${styles.centered}">
    <h1 style="${styles.header}">
      ${basics.name}
    </h1>
    <div style="${styles.small}; margin: ${SPACING.sm}px 0;">
      ${basics.email} • ${basics.phone} • ${basics.location}
    </div>
    <div style="${styles.small}">
      <a href="${basics.linkedin}" style="${styles.link}">${basics.linkedin}</a> • 
      <a href="${basics.github}" style="${styles.link}">${basics.github}</a> • 
      <a href="${basics.website}" style="${styles.link}">${basics.website}</a>
    </div>
  </div>
`;
};
