import { Section, CertificateItem } from "@/types";

export const getCertificationsHTML = (
  certifications: Section<CertificateItem>
): string => {
  if (!certifications.items.length) return "";

  return `
    <div class="section">
      <h2 class="section-title">Certifications</h2>
      ${certifications.items
        .map(
          (item) => `
        <div class="certification-item">
          <div class="certification-name">${item.name || ""}</div>
          <div class="certification-authority">${item.authority || ""}</div>
          <div class="certification-date">${formatDate(item.date)}</div>
        </div>
      `
        )
        .join("")}
    </div>
  `;
};

// Helper function to format dates
function formatDate(dateString?: string): string {
  if (!dateString) return "";

  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return dateString; // Return as is if we can't parse it
  }

  return date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
}
