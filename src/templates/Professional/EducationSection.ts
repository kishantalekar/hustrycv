import { getResumeStyles } from "../styles/resumeStyles";
import { formatDateRange } from "./utils/formatDate";

// TODO:change date from 2018-06 - 2021-02 to Sep. 2021 – Aug 2024
// TODO:add location to education schema
export const getEducationHTML = (
  education: Section<EducationItem>,
  settings: Settings
) => {
  const styles = getResumeStyles();

  const renderGpa = (item: EducationItem) => {
    if (!item.gpa) {
      return "";
    }

    return `
       <span class="text-regular">
          ${item.isPercentage ? "percentage: " : "CGPA: "}
          ${item.gpa}${item.isPercentage ? "%" : ""}
          </span>
      `;
  };

  return `
  <div class="section">
  <h2 class="section-title">Education</h2>
  <hr class="mb-4"/>
    ${education.items
      .map(
        (item) => `
      <div style="margin-bottom: 8pt;" class="flex flex-col gap-2">
        <div class="flex align-center space-between">
          <span class="card-title">${item.institution}${
          item.location ? ", " + item.location : ""
        }</span>
      
         ${formatDateRange(item.startDate, item.endDate, item.current)}
        </div>
        <div class="flex flex-row space-between">
         <div class="text-regular" >
        <span class="text-italic">${item.degree}</span>
         
        </div>
       ${renderGpa(item)}
        </div>
       
      </div>
    `
      )
      .join("")}
  </div>
`;
};
