// FONT SIZE CONSTANTS
export const FONT_SIZES = {
  h1: 24, // Used for your name at the top of the resume
  h2: 20, // Used for main section headers like "Experience", "Education"
  h3: 16, // Used for subsection titles like company names or degree names
  h4: 14, // Used for even smaller titles or subtitles
  body: 12, // Used for normal body text like job descriptions and bullet points
  small: 8, // Used for supporting information like dates or footnotes
} as const;

// SPACING CONSTANTS
export const SPACING = {
  xs: 4, // Minimal spacing between closely related elements
  sm: 8, // Small spacing for tight grouping
  md: 16, // Standard spacing between sections
  lg: 24, // Large spacing for major sections
  xl: 32, // Extra large spacing for page-level elements
} as const;

// COLOR CONSTANTS
export const COLORS = {
  primary: '#2D3748', // Main text color
  secondary: '#4A5568', // Secondary text color for less emphasis
  accent: '#3182CE', // Accent color for highlights or important elements
  link: '#2B6CB0', // Color for links or interactive elements
  divider: '#CBD5E0', // Color for dividers or separators
  background: '#FFFFFF', // Page background color
} as const;

// COMMON STYLES APPLIED ACROSS THE RESUME
export const getCommonStyles = () => `
  .header{
    font-size: ${FONT_SIZES.h1}pt;
  }
  .section {
    margin: 10pt 0;
    break-inside: avoid;  // Prevents section from breaking across pages when printing
  }

  
  .section-title {
    font-size: ${FONT_SIZES.h3}pt;  // Using h3 size (16pt) for section titles
    font-weight: 400;
  }
  
  .text-regular {
    font-size: ${FONT_SIZES.body}pt;  // Using body size (12pt) for regular text
  }
  .body-large{
    font-size: ${FONT_SIZES.body}pt;
    font-weight: 400;
}
  
  .text-bold {
    font-weight: 500;
  }
  .text-italic {
    font-style: italic;
  }
  
  .text-muted {
    color: #666;  // Muted text for less important information
  }
  .bulleted-point{
    font-size: 10pt;  // Smallest size (8px)
  }
  
  hr {
  margin:0;
  margin-top: 1pt;
  margin-bottom: 4pt;
  padding: 0;

  }
  .mb-2{
  margin-bottom:2pt;
  }
  .mb-4{
  margin-bottom:4pt;
  }
  .mb-8{
  margin-bottom:8pt;
  .mb-16{
    margin-bottom:16pt;
  }
  }
  .test1{
  background-color:red;
  border:1pt solid red;
  }
  .test2{
  background-color:yellow;
  }
  .flex{
    display:flex;
  }
  .flex-row{
    flex-direction:row;
  }
  .flex-col{
  flex-direction:column;
  }
  .center{
  display:flex;
  align-items:center;
  justify-content:center;
  }
  .space-between{
    justify-content:space-between;
  }
  .align-center{
  align-items:center;
  }
  .gap-1{
  gap:1pt;
  }
  .gap-2{
  gap:2pt;
  }
  .gap-4{
    gap:4pt;
  }
  .text-center{
    text-align: center;
  }
`;

// RESUME-SPECIFIC STYLES WITH DETAILED TYPOGRAPHY
export const getResumeStyles = () => ({
  container: `
    margin-bottom: ${SPACING.md}pt;
  `,

  // Your name at the top of the resume
  header: `
    font-size: ${FONT_SIZES.h1}pt;  // Largest size (24px) for your name
    margin: 0;
  `,

  // Used for professional title or summary heading
  subheader: `
    font-family: 'FiraSans-Medium';
    font-size: ${FONT_SIZES.h2}px;  // Second largest size (20px)
    color: ${COLORS.secondary};
  `,

  // Main content text style
  body: `
    font-family: 'FiraSans-Regular';
    font-size: ${FONT_SIZES.body}px;  // Standard text size (12px)
    color: ${COLORS.primary};
    line-height: 1.5;
  `,

  // Used for dates, locations, or supplementary information
  small: `
  font-size:10pt;
  `,

  link: `
    color: #000;
    text-decoration: underline;
    
  `,

  divider: `
    border-bottom: 1px solid ${COLORS.divider};
    margin: ${SPACING.md}px 0;
  `,

  centered: `
    text-align: center;
  `,

  certificationCard: `
    display: flex;
    flex-direction: column;
    gap: 8px;
    justify-content: center;
  `,

  certificationItem: `
    display: flex;
    flex-direction: row;
    gap: 4px;
  `,

  skillsCard: `
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  `,
});
