import {githubIcon} from '../icons/icons';
// TODO: add skills in project section and dates in project section
export const getProjectsHTML = (projects: any) => {
  return `
    <div class="section">
      <h2 class="section-title">Projects</h2>
      <hr/>
    <div >
      ${projects.items
        .map(
          (item: any) => `
        <div style="margin-bottom: 12pt;">
          <div style="display: flex; gap: 8px;align-items: center;justify-content:space-between;">
          <div>
          <span class="text-bold">${item.name}</span>
            <a href="${
              item.url
            }" style="color: #000; text-decoration: none;" class="text-regular">
              ${githubIcon}
            </a>
            |
            <span class="text-italic">Flutter, Appwrite </span>
          </div>
          <span class="body-large ">June 2024 - Aug 2024</span>
          </div>
          <div class="text-regular text-muted" style="margin: 4pt 0;">
            ${item.description}
          </div>
          <ul style="margin: 4pt 0; padding-left: 14pt;">
            ${item.highlights
              .map(
                (highlight: string) => `
              <li class="text-regular" style=";">${highlight}</li>
            `,
              )
              .join('')}
          </ul>
        </div>
      `,
        )
        .join('')}
    </div>
    </div>
  `;
};
