/**
 * Template Engine — Type Definitions
 *
 * Describes the data-driven template system. A TemplateDefinition is a
 * lightweight config object (~20 lines) that drives the TemplateComposer
 * to produce a fully-styled resume HTML document.
 *
 * Benefits over the old 27-folder approach:
 * - Adding a new template = adding one TemplateDefinition object
 * - Adding a new section = adding one renderer in engine/sections/
 *   (all templates automatically gain it)
 * - Visual variants share code; only the theme differs
 */

// ─── Layout ──────────────────────────────────────────────────────────────────

export type LayoutType =
  | 'single-column'
  | 'two-column'
  | 'sidebar-left'
  | 'sidebar-right';

export type SectionDividerStyle =
  | 'line'          // thin <hr>
  | 'thick-line'    // bold border-bottom
  | 'none'          // no divider
  | 'colored-bar';  // solid colored rectangle

export type SectionTitleStyle = 'uppercase' | 'normal' | 'capitalize' | 'lowercase';

export type TemplateCategory =
  | 'professional'
  | 'minimal'
  | 'modern'
  | 'creative'
  | 'technical';

// ─── Theme ───────────────────────────────────────────────────────────────────

export interface TemplateTheme {
  /** Accent / primary brand color (used in headers, dividers, highlights) */
  primaryColor: string;
  /** Secondary accent (used in gradients, badges, tags) */
  accentColor: string;
  /** Main body text color */
  textColor: string;
  /** Muted / secondary text color */
  mutedColor: string;
  /** Page / body background */
  backgroundColor: string;
  /** Card / container background (may differ from page bg) */
  surfaceColor: string;

  /** How section headings are separated from content */
  sectionDividerStyle: SectionDividerStyle;
  /** Text transform applied to section titles */
  sectionTitleStyle: SectionTitleStyle;
  /** Letter spacing on section titles (px) */
  sectionTitleLetterSpacing: string;

  /** Primary font family name (must match the Google Fonts family name) */
  fontFamily: string;
  /** Optional Google Fonts URL. If omitted, fontFamily is assumed to be a web-safe font. */
  googleFontsUrl?: string;

  /** Optional inline CSS injected after the common styles.
   * Use this for uniquely complex visual effects (glassmorphism, neon glow, etc.)
   * that cannot be represented as theme tokens. */
  customCSS?: string;
}

// ─── Typography ──────────────────────────────────────────────────────────────

export interface TemplateTypography {
  /** Candidate's name at the top */
  nameSize: number;      // pt
  /** Section heading (e.g., "Experience", "Skills") */
  sectionTitleSize: number;  // pt
  /** Card title (company name, degree, project name) */
  cardTitleSize: number;     // pt
  /** Standard body text */
  bodySize: number;          // pt
  /** Dates, locations, captions */
  smallSize: number;         // pt
  /** CSS font-weight for the name */
  nameFontWeight: string;
  /** Line height multiplier */
  lineHeight: number;
}

// ─── Layout Config ───────────────────────────────────────────────────────────

export interface LayoutConfig {
  /** Page margin (all sides, pt). Default: 10mm */
  pagePadding: string;
  /** Gap between sections, pt */
  sectionGap: string;

  // Two-column / sidebar specific
  sidebarWidthPercent?: number;   // 0–100, defaults to 35
  sidebarBgColor?: string;
  mainBgColor?: string;
  sidebarPadding?: string;
  mainPadding?: string;
}

// ─── Template Definition ─────────────────────────────────────────────────────

export interface TemplateDefinition {
  /** Stable ID — must match the id in resumeTemplates array */
  id: string;
  /** Human-readable name shown in the template picker */
  name: string;
  /** Category used for filtering in the picker */
  category: TemplateCategory;
  /** Layout variant */
  layout: LayoutType;

  /** Theme tokens */
  theme: TemplateTheme;
  /** Typography scale */
  typography: TemplateTypography;
  /** Layout measurements */
  layoutConfig: LayoutConfig;

  /** Preview thumbnail (require'd image) */
  preview: number; // ImageRequireSource (React Native image require)

  /** Whether this template is considered "new" in the picker */
  isNew?: boolean;
  /** Whether this template is a premium/featured template */
  isFeatured?: boolean;
}

// ─── Renderer Context ────────────────────────────────────────────────────────

/** Passed to every section renderer */
export interface RenderContext {
  theme: TemplateTheme;
  typography: TemplateTypography;
  layout: LayoutType;
  settings?: Settings;
}
