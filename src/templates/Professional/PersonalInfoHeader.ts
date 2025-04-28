import { getResumeStyles, SPACING } from "../styles/resumeStyles";
import { Basics } from "../../components/ResumePreview/ResumePreview.types";

export const getPersonalInfoHTML = (basics: Basics) => {
  const styles = getResumeStyles();
  const links = [basics.email, basics.linkedin, basics.github]
    .map((link) => `<a href="${link}" style="${styles.link}">${link}</a>`)
    .join(" | ");
  return `
  <div class="text-center mb-16">
    <h1 class="header">
      ${basics.name}
    </h1>
    <div class="text-regular" style="${styles.small}; margin: ${SPACING.sm}px 0;">
      ${basics.phone} |
      ${links}
    </div>

  </div>
`;
};
