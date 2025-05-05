import { Basics } from "@/types";

export const getSummaryHTML = (basics: Basics) => `
  <div class="section">
    <h2 class="section-title">Summary</h2>
    <hr/>
    <p class="text-regular">
      ${basics.summary}
    </p>
  </div>
`;
