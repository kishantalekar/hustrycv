export const getSummaryHTML = (basics: any) => `
  <div class="section">
    <h2 class="section-title">Summary</h2>
    <p class="text-regular" style="line-height: 1.5;">
      ${basics.summary}
    </p>
  </div>
`;
