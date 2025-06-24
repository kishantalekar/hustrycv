export const getReferencesHTML = (
  references: Section<ReferenceItem>,
  settings: Settings
) => {
  return `
  <div  class="section" style="margin-bottom: 1.5rem;">
    <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.5rem;">References</h2>
    <hr style="margin-bottom: 1rem; border: none; border-top: 1px solid #e5e7eb;"/>
    <div style="display: flex; flex-direction: column; gap: 8pt;">
      ${references.items
        .map(
          (item) => `
        <div style=" border-radius: 0.5rem; transition: all 0.2s ease-in-out;">
          <div style="margin-bottom: 0.5rem;">
            <h3 style="font-size: 1.1rem; font-weight: 500;">${item.name}</h3>
            <p style="color: #4b5563; font-size: 0.9rem;">${item.position} at ${item.company}</p>
          </div>
          <div style="margin-bottom: 0.5rem;">
            <p style="color: #4b5563; font-size: 0.9rem;">${item.contact1} | ${item.contact2}</p>
          </div>
          <div style="color: #1f2937; font-size: 0.95rem;">${item.referenceText}</div>
        </div>
      `
        )
        .join("")}
    </div>
  </div>
`;
};
