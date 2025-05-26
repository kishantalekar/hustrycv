export const getSummaryHTML = (basics: Basics, settings: Settings) => `
  <div class="section">
    <h2 class="section-title">Summary</h2>
    <hr/>
    <p class="text-regular">
      ${basics.summary}
    </p>
  </div>
`;
