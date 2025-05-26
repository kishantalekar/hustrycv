import { getSocialIcon } from "../icons";
import { getResumeStyles } from "../styles/resumeStyles";
import { renderJobDescription } from "./components/description";
import { renderKeywords } from "./components/keywords";
import { formatDateRange } from "./utils/formatDate";

const renderProjectHeader = (name: string, links: LinkItem[]) => {
  const styles = getResumeStyles();
  return `
    <div class="flex space-between gap-4">
      <span class="card-title">${name}</span>
      ${links.length > 0 ? " | " : ""}
      ${links
        .map(
          (social) =>
            `<span style="display: inline-flex; align-items: center; gap: 4px;">
          <a href="${social.url}" style="${
              styles.link
            }; display: inline-flex; align-items: center; gap: 4px;">
            ${getSocialIcon(social.icon)}
            ${social.label}
          </a>
        </span>`
        )
        .join(" | ")}
    
    </div>
  `;
};

// const renderProjectDate = (startDate: string, endDate: string) => {
//   return `
//     <span class="text-regular text-muted">${startDate} - ${endDate}</span>
//   `;
// };

const renderProjectHeading = (item: ProjectItem) => {
  console.log("current", item.current);
  return `
    <div class="flex align-center space-between">
      ${renderProjectHeader(item.name, item.links)}
      ${formatDateRange(item.startDate, item.endDate, item.current)}
    </div>
  `;
};

const renderProjectItem = (item: ProjectItem, index: number) => {
  console.log("item", item.links);
  return `
  <div style="margin-bottom: 8pt;page-break-inside:avoid;">
  ${index === 0 ? '<h3 class="section-title">Projects</h3>   <hr/>' : ""} 
      ${renderProjectHeading(item)}
      ${renderJobDescription(item.description)}
    </div>
  `;
};

export const getProjectsHTML = (
  projects: Section<ProjectItem>,
  settings: Settings
) => {
  return `
    <div class="section" style="page-break-inside:auto;">
      <div style="page-break-inside:auto;">
        ${projects.items.map(renderProjectItem).join("")}
      </div>
    </div>
  `;
};
