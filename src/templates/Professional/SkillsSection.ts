import {getResumeStyles} from '../../utils/resumeStyles';

export const getSkillsHTML = (skills: any) => {
  const styles = getResumeStyles();
  return `
  <div class="section">
    <h2 class="section-title">Technical Skills</h2>
    <hr/>
    <div style="${styles.skillsCard}">
      ${skills.items
        .map(
          (item: any) => `
        <div style="margin-bottom: 2px;">
          <div class="text-regular" >
          <span class="text-bold">${
            item.name
          }</span>:&nbsp;&nbsp;${item.keywords.join(', ')}</div>
        </div>
      `,
        )
        .join('')}
    </div>
  </div>
`;
};
