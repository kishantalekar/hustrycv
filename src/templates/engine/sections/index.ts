/**
 * Shared section renderers for the template engine.
 *
 * Each renderer accepts the section data + a RenderContext (theme, typography)
 * and returns an HTML fragment string (not a full document).
 * The TemplateComposer assembles these into the final document.
 */

import {RenderContext} from '../templateTypes';
import {formatDateRange, renderDateRangeSpan} from '../utils/formatDate';

// ─── Divider ─────────────────────────────────────────────────────────────────

const renderDivider = (ctx: RenderContext): string => {
  const {theme} = ctx;
  switch (theme.sectionDividerStyle) {
    case 'none':
      return '';
    case 'thick-line':
      return `<div style="border-bottom:2pt solid ${theme.primaryColor};margin:4pt 0 8pt;"></div>`;
    case 'colored-bar':
      return `<div style="height:3pt;background:${theme.primaryColor};border-radius:2pt;margin:4pt 0 8pt;"></div>`;
    case 'line':
    default:
      return `<hr style="border:none;border-top:1pt solid #e2e8f0;margin:4pt 0 8pt;"/>`;
  }
};

// ─── Section Title ────────────────────────────────────────────────────────────

const renderSectionTitle = (title: string, ctx: RenderContext): string => {
  const {theme, typography} = ctx;
  const transform =
    theme.sectionTitleStyle === 'uppercase'
      ? 'text-transform:uppercase;'
      : theme.sectionTitleStyle === 'capitalize'
      ? 'text-transform:capitalize;'
      : theme.sectionTitleStyle === 'lowercase'
      ? 'text-transform:lowercase;'
      : '';
  return `<h2 style="font-size:${typography.sectionTitleSize}pt;font-weight:600;color:${theme.primaryColor};margin:0 0 2pt;letter-spacing:${theme.sectionTitleLetterSpacing};${transform}">${title}</h2>`;
};

// ─── Row (header row with date) ───────────────────────────────────────────────

const renderSpaceBetweenRow = (
  left: string,
  right: string,
  ctx: RenderContext,
): string => `
  <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8pt;">
    <div style="flex:1;">${left}</div>
    <div>${right}</div>
  </div>
`;

// ─── Job Description ──────────────────────────────────────────────────────────

const renderDescription = (description: string, ctx: RenderContext): string => {
  if (!description) {
    return '';
  }
  return `<div style="margin-top:6pt;font-size:${ctx.typography.bodySize}pt;color:${ctx.theme.textColor};line-height:${ctx.typography.lineHeight};">${description}</div>`;
};

// ─── Work Experience ──────────────────────────────────────────────────────────

export const renderWorkSection = (
  work: Section<WorkItem>,
  ctx: RenderContext,
): string => {
  if (!work?.items?.length) {
    return '';
  }

  const items = work.items
    .map(
      (item, i) => `
    <div style="margin-bottom:10pt;page-break-inside:avoid;">
      ${renderSpaceBetweenRow(
        `<span style="font-size:${ctx.typography.cardTitleSize}pt;font-weight:600;color:${ctx.theme.textColor};">${item.position}</span>`,
        renderDateRangeSpan(item.startDate, item.endDate, item.current, ctx.theme.mutedColor),
        ctx,
      )}
      <div style="font-size:${ctx.typography.bodySize}pt;color:${ctx.theme.mutedColor};font-style:italic;margin-top:2pt;">
        ${item.company}${item.location ? ` · ${item.location}` : ''}
      </div>
      ${renderDescription(item.description, ctx)}
    </div>
  `,
    )
    .join('');

  return `
    <div style="margin-bottom:${ctx.layout === 'single-column' ? '16pt' : '12pt'};page-break-inside:auto;">
      ${renderSectionTitle('Experience', ctx)}
      ${renderDivider(ctx)}
      ${items}
    </div>
  `;
};

// ─── Education ────────────────────────────────────────────────────────────────

export const renderEducationSection = (
  education: Section<EducationItem>,
  ctx: RenderContext,
): string => {
  if (!education?.items?.length) {
    return '';
  }

  const items = education.items
    .map(item => {
      const gpaText = item.gpa
        ? `<span style="font-size:${ctx.typography.smallSize}pt;color:${ctx.theme.mutedColor};">${item.isPercentage ? 'Score' : 'CGPA'}: ${item.gpa}${item.isPercentage ? '%' : ''}</span>`
        : '';

      return `
      <div style="margin-bottom:8pt;page-break-inside:avoid;">
        ${renderSpaceBetweenRow(
          `<span style="font-size:${ctx.typography.cardTitleSize}pt;font-weight:600;color:${ctx.theme.textColor};">${item.institution}${item.location ? `, ${item.location}` : ''}</span>`,
          renderDateRangeSpan(item.startDate, item.endDate, item.current, ctx.theme.mutedColor),
          ctx,
        )}
        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:2pt;">
          <span style="font-size:${ctx.typography.bodySize}pt;color:${ctx.theme.mutedColor};font-style:italic;">${item.degree}</span>
          ${gpaText}
        </div>
      </div>
    `;
    })
    .join('');

  return `
    <div style="margin-bottom:16pt;page-break-inside:auto;">
      ${renderSectionTitle('Education', ctx)}
      ${renderDivider(ctx)}
      ${items}
    </div>
  `;
};

// ─── Skills ───────────────────────────────────────────────────────────────────

export const renderSkillsSection = (
  skills: Section<SkillItem>,
  ctx: RenderContext,
): string => {
  if (!skills?.items?.length) {
    return '';
  }

  const items = skills.items
    .map(
      item => `
    <div style="margin-bottom:4pt;">
      <span style="font-size:${ctx.typography.bodySize}pt;font-weight:600;color:${ctx.theme.textColor};">${item.name}:</span>
      <span style="font-size:${ctx.typography.bodySize}pt;color:${ctx.theme.mutedColor};"> ${item.keywords.join(', ')}</span>
    </div>
  `,
    )
    .join('');

  return `
    <div style="margin-bottom:16pt;">
      ${renderSectionTitle('Skills', ctx)}
      ${renderDivider(ctx)}
      ${items}
    </div>
  `;
};

// ─── Projects ─────────────────────────────────────────────────────────────────

export const renderProjectsSection = (
  projects: Section<ProjectItem>,
  ctx: RenderContext,
): string => {
  if (!projects?.items?.length) {
    return '';
  }

  const items = projects.items
    .map(
      item => `
    <div style="margin-bottom:10pt;page-break-inside:avoid;">
      ${renderSpaceBetweenRow(
        `<span style="font-size:${ctx.typography.cardTitleSize}pt;font-weight:600;color:${ctx.theme.textColor};">${item.name}</span>`,
        renderDateRangeSpan(item.startDate, item.endDate, item.current, ctx.theme.mutedColor),
        ctx,
      )}
      ${renderDescription(item.description, ctx)}
    </div>
  `,
    )
    .join('');

  return `
    <div style="margin-bottom:16pt;page-break-inside:auto;">
      ${renderSectionTitle('Projects', ctx)}
      ${renderDivider(ctx)}
      ${items}
    </div>
  `;
};

// ─── Certifications ───────────────────────────────────────────────────────────

export const renderCertificationsSection = (
  certifications: Section<CertificateItem>,
  ctx: RenderContext,
): string => {
  if (!certifications?.items?.length) {
    return '';
  }

  const items = certifications.items
    .map(
      item => `
    <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:6pt;">
      <div>
        <span style="font-size:${ctx.typography.cardTitleSize}pt;font-weight:600;color:${ctx.theme.textColor};">${item.name}</span>
        ${item.authority ? `<span style="font-size:${ctx.typography.bodySize}pt;color:${ctx.theme.mutedColor};"> · ${item.authority}</span>` : ''}
      </div>
      ${renderDateRangeSpan(item.date, undefined, false, ctx.theme.mutedColor)}
    </div>
  `,
    )
    .join('');

  return `
    <div style="margin-bottom:16pt;">
      ${renderSectionTitle('Certifications', ctx)}
      ${renderDivider(ctx)}
      ${items}
    </div>
  `;
};

// ─── Summary ──────────────────────────────────────────────────────────────────

export const renderSummarySection = (
  basics: Basics,
  ctx: RenderContext,
): string => {
  if (!basics?.summary) {
    return '';
  }

  return `
    <div style="margin-bottom:16pt;">
      ${renderSectionTitle('Summary', ctx)}
      ${renderDivider(ctx)}
      <p style="font-size:${ctx.typography.bodySize}pt;color:${ctx.theme.textColor};line-height:${ctx.typography.lineHeight};margin:0;">${basics.summary}</p>
    </div>
  `;
};

// ─── Hobbies ──────────────────────────────────────────────────────────────────

export const renderHobbiesSection = (
  hobbies: Section<HobbieItem>,
  ctx: RenderContext,
): string => {
  if (!hobbies?.items?.length) {
    return '';
  }

  const chips = hobbies.items
    .map(
      item =>
        `<span style="display:inline-block;padding:3pt 8pt;border-radius:12pt;background:${ctx.theme.surfaceColor};border:1pt solid #e2e8f0;font-size:${ctx.typography.smallSize}pt;color:${ctx.theme.textColor};margin:2pt;">${item.name}</span>`,
    )
    .join('');

  return `
    <div style="margin-bottom:16pt;">
      ${renderSectionTitle('Hobbies & Interests', ctx)}
      ${renderDivider(ctx)}
      <div style="display:flex;flex-wrap:wrap;gap:4pt;margin-top:4pt;">${chips}</div>
    </div>
  `;
};

// ─── Strengths ────────────────────────────────────────────────────────────────

export const renderStrengthsSection = (
  strengths: Section<StrengthItem>,
  ctx: RenderContext,
): string => {
  if (!strengths?.items?.length) {
    return '';
  }

  const chips = strengths.items
    .map(
      item =>
        `<span style="display:inline-block;padding:3pt 8pt;border-radius:12pt;background:${ctx.theme.surfaceColor};border:1pt solid ${ctx.theme.primaryColor}40;font-size:${ctx.typography.smallSize}pt;color:${ctx.theme.textColor};margin:2pt;">${item.name}</span>`,
    )
    .join('');

  return `
    <div style="margin-bottom:16pt;">
      ${renderSectionTitle('Strengths', ctx)}
      ${renderDivider(ctx)}
      <div style="display:flex;flex-wrap:wrap;gap:4pt;margin-top:4pt;">${chips}</div>
    </div>
  `;
};

// ─── References ───────────────────────────────────────────────────────────────

export const renderReferencesSection = (
  references: Section<ReferenceItem>,
  ctx: RenderContext,
): string => {
  if (!references?.items?.length) {
    return '';
  }

  const items = references.items
    .map(
      item => `
    <div style="margin-bottom:10pt;padding:8pt;background:${ctx.theme.surfaceColor};border-radius:6pt;">
      <div style="font-size:${ctx.typography.cardTitleSize}pt;font-weight:600;color:${ctx.theme.textColor};">${item.name}</div>
      <div style="font-size:${ctx.typography.bodySize}pt;color:${ctx.theme.mutedColor};">${item.position} at ${item.company}</div>
      <div style="font-size:${ctx.typography.smallSize}pt;color:${ctx.theme.mutedColor};margin-top:2pt;">${item.contact1}${item.contact2 ? ` | ${item.contact2}` : ''}</div>
      ${item.referenceText ? `<div style="font-size:${ctx.typography.bodySize}pt;color:${ctx.theme.textColor};margin-top:4pt;font-style:italic;">${item.referenceText}</div>` : ''}
    </div>
  `,
    )
    .join('');

  return `
    <div style="margin-bottom:16pt;">
      ${renderSectionTitle('References', ctx)}
      ${renderDivider(ctx)}
      ${items}
    </div>
  `;
};

// ─── Languages ────────────────────────────────────────────────────────────────

export const renderLanguagesSection = (
  languages: Section<LanguageItem>,
  ctx: RenderContext,
): string => {
  if (!languages?.items?.length) {
    return '';
  }

  const items = languages.items
    .map(
      item => `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4pt;">
      <span style="font-size:${ctx.typography.bodySize}pt;color:${ctx.theme.textColor};">${item.name}</span>
      <span style="font-size:${ctx.typography.smallSize}pt;color:${ctx.theme.mutedColor};">${item.level ?? ''}</span>
    </div>
  `,
    )
    .join('');

  return `
    <div style="margin-bottom:16pt;">
      ${renderSectionTitle('Languages', ctx)}
      ${renderDivider(ctx)}
      ${items}
    </div>
  `;
};

// ─── Header / Personal Info ───────────────────────────────────────────────────

export const renderHeaderSection = (
  basics: Basics,
  ctx: RenderContext,
): string => {
  const {theme, typography} = ctx;

  // Contact info row
  const contacts = [basics.phone, basics.email]
    .filter(Boolean)
    .map(c => `<span>${c}</span>`)
    .join('<span style="margin:0 4pt;color:#9ca3af;">|</span>');

  // Social links row
  const socials = (basics.socials ?? [])
    .filter(s => s.label)
    .map(s => {
      const href = s.url || '#';
      return `<a href="${href}" style="color:${theme.primaryColor};text-decoration:none;">${s.label}</a>`;
    })
    .join('<span style="margin:0 4pt;color:#9ca3af;">|</span>');

  const contactRow = [contacts, socials].filter(Boolean).join('<span style="margin:0 4pt;color:#9ca3af;">|</span>');

  return `
    <div style="text-align:center;margin-bottom:16pt;">
      <h1 style="font-size:${typography.nameSize}pt;font-weight:${typography.nameFontWeight};color:${theme.textColor};margin:0 0 6pt;letter-spacing:1px;">${basics.name ?? ''}</h1>
      <div style="font-size:${typography.smallSize}pt;color:${theme.mutedColor};display:flex;flex-wrap:wrap;justify-content:center;gap:4pt;align-items:center;">
        ${contactRow}
      </div>
    </div>
  `;
};
