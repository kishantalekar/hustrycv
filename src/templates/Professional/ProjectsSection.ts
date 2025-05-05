import { LinkItem, ProjectItem, Section } from "@/types";
import { getSocialIcon } from "../icons";
import { renderJobDescription } from "./components/description";
import { renderKeywords } from "./components/keywords";
import { getResumeStyles } from "../styles/resumeStyles";
import { formatDateRange } from "./utils/formatDate";

const renderProjectHeader = (
  name: string,
  links: LinkItem[],
  keywords: string[]
) => {
  const styles = getResumeStyles();
  return `
    <div class="flex space-between gap-4">
      <span class="text-bold">${name}</span>
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
  return `
    <div class="flex align-center space-between">
      ${renderProjectHeader(item.name, item.links, item.keywords)}
      ${formatDateRange("June 2024", "Aug 2024")}
    </div>
  `;
};

const renderProjectItem = (item: ProjectItem) => {
  return `
    <div style="margin-bottom: 8pt;">
      ${renderProjectHeading(item)}
      ${renderJobDescription(item.description)}
      ${renderKeywords(item.keywords)}
    </div>
  `;
};

export const getProjectsHTML = (projects: Section<ProjectItem>) => {
  return `
    <div class="section">
      <h2 class="section-title">Projects</h2>
      <hr/>
      <div>
        ${projects.items.map(renderProjectItem).join("")}
      </div>
    </div>
  `;
};
