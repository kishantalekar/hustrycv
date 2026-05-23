/**
 * Template Composer — the core of the template engine.
 *
 * Takes a Resume + TemplateDefinition and produces a full HTML document string.
 *
 * Flow:
 *   1. generateThemeCSS(theme, typography)   → <style> block
 *   2. renderHeaderSection(basics, ctx)       → name/contact HTML
 *   3. renderSummarySection(basics, ctx)      → summary HTML
 *   4. Loop sectionOrder → renderX(ctx)       → section HTMLs
 *   5. applyLayout(header + sections, layout) → body HTML
 *   6. wrapInDocument(css, body)              → full HTML document
 */

import {TemplateDefinition, RenderContext, LayoutType, LayoutConfig, TemplateTheme} from './templateTypes';
import {generateThemeCSS} from './cssGenerator';
import {
  renderHeaderSection,
  renderSummarySection,
  renderWorkSection,
  renderEducationSection,
  renderSkillsSection,
  renderProjectsSection,
  renderCertificationsSection,
  renderHobbiesSection,
  renderStrengthsSection,
  renderReferencesSection,
  renderLanguagesSection,
} from './sections';

// ─── Layout Application ───────────────────────────────────────────────────────

const applySingleColumnLayout = (
  header: string,
  summary: string,
  sections: string,
  config: LayoutConfig,
): string => `
  <div class="resume-page" style="padding:${config.pagePadding};">
    ${header}
    ${summary}
    ${sections}
  </div>
`;

const applySidebarLayout = (
  header: string,
  summary: string,
  sidebarSections: string,
  mainSections: string,
  layout: LayoutType,
  config: LayoutConfig,
  theme: TemplateTheme,
): string => {
  const sidebarWidth = config.sidebarWidthPercent ?? 35;
  const sidebarBg = config.sidebarBgColor ?? '#f1f5f9';
  const sidebarOnLeft = layout === 'sidebar-left' || layout === 'two-column';

  const sidebarColumn = `
    <div style="width:${sidebarWidth}%;background:${sidebarBg};padding:${config.sidebarPadding ?? '20pt 16pt'};page-break-inside:avoid;">
      ${sidebarSections}
    </div>
  `;

  const mainColumn = `
    <div style="width:${100 - sidebarWidth}%;background:${config.mainBgColor ?? '#ffffff'};padding:${config.mainPadding ?? '20pt 20pt'};page-break-inside:auto;">
      ${summary}
      ${mainSections}
    </div>
  `;

  return `
    <div class="resume-page">
      ${header}
      <div style="display:flex;min-height:calc(100vh - 120pt);">
        ${sidebarOnLeft ? sidebarColumn + mainColumn : mainColumn + sidebarColumn}
      </div>
    </div>
  `;
};

// ─── Section Routing ──────────────────────────────────────────────────────────

const renderSection = (
  sectionType: SectionType | string,
  resume: Resume,
  ctx: RenderContext,
): string => {
  switch (sectionType) {
    case 'work':
      return resume.sections?.work?.items?.length
        ? renderWorkSection(resume.sections.work, ctx)
        : '';
    case 'education':
      return resume.sections?.education?.items?.length
        ? renderEducationSection(resume.sections.education, ctx)
        : '';
    case 'skills':
      return resume.sections?.skills?.items?.length
        ? renderSkillsSection(resume.sections.skills, ctx)
        : '';
    case 'projects':
      return resume.sections?.projects?.items?.length
        ? renderProjectsSection(resume.sections.projects, ctx)
        : '';
    case 'certifications':
      return resume.sections?.certifications?.items?.length
        ? renderCertificationsSection(resume.sections.certifications, ctx)
        : '';
    case 'hobbies':
      return resume.sections?.hobbies?.items?.length
        ? renderHobbiesSection(resume.sections.hobbies, ctx)
        : '';
    case 'strengths':
      return resume.sections?.strengths?.items?.length
        ? renderStrengthsSection(resume.sections.strengths, ctx)
        : '';
    case 'references':
      return resume.sections?.references?.items?.length
        ? renderReferencesSection(resume.sections.references, ctx)
        : '';
    case 'languages':
      return resume.sections?.languages?.items?.length
        ? renderLanguagesSection(resume.sections.languages, ctx)
        : '';
    default:
      return '';
  }
};

// ─── Two-Column Section Splitting ─────────────────────────────────────────────

/**
 * For two-column / sidebar layouts, split sections into sidebar vs main.
 * Sidebar typically contains: contact info (in header), skills, certifications,
 * strengths, hobbies, languages.
 * Main: work, education, projects, references.
 */
const SIDEBAR_SECTIONS: SectionType[] = [
  'skills',
  'certifications',
  'strengths',
  'hobbies',
  'languages',
];

// ─── Main Composer ────────────────────────────────────────────────────────────

export const composeResumeHTML = (
  resume: Resume,
  template: TemplateDefinition,
): string => {
  if (!resume) {
    return '<html><body><p style="text-align:center;font-family:sans-serif;padding:20pt;">No resume data available</p></body></html>';
  }

  const ctx: RenderContext = {
    theme: template.theme,
    typography: template.typography,
    layout: template.layout,
    settings: resume.settings,
  };

  const css = generateThemeCSS(template.theme, template.typography);
  const header = renderHeaderSection(resume.basics, ctx);
  const summary = renderSummarySection(resume.basics, ctx);

  const sectionOrder: string[] = resume.metadata?.sectionOrder ?? [
    'work',
    'education',
    'skills',
    'projects',
    'certifications',
  ];

  let body: string;

  if (
    template.layout === 'two-column' ||
    template.layout === 'sidebar-left' ||
    template.layout === 'sidebar-right'
  ) {
    // Split sections into sidebar and main columns
    const sidebarHTML = sectionOrder
      .filter(s => SIDEBAR_SECTIONS.includes(s as SectionType))
      .map(s => renderSection(s, resume, ctx))
      .join('');

    const mainHTML = sectionOrder
      .filter(s => !SIDEBAR_SECTIONS.includes(s as SectionType))
      .map(s => renderSection(s, resume, ctx))
      .join('');

    body = applySidebarLayout(
      header,
      summary,
      sidebarHTML,
      mainHTML,
      template.layout,
      template.layoutConfig,
      template.theme,
    );
  } else {
    // Single column
    const sectionsHTML = sectionOrder
      .map(s => renderSection(s, resume, ctx))
      .join('');

    body = applySingleColumnLayout(
      header,
      summary,
      sectionsHTML,
      template.layoutConfig,
    );
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>${resume.basics?.name ?? 'Resume'}</title>
  <style>${css}</style>
</head>
<body>
  ${body}
</body>
</html>`;
};
