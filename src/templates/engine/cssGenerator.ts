/**
 * CSS generator for the template engine.
 *
 * Converts a TemplateTheme + TemplateTypography into a <style> block string.
 * All visual variation comes from the TemplateDefinition — no hardcoded styles.
 */

import {TemplateTheme, TemplateTypography} from './templateTypes';

export const generateThemeCSS = (
  theme: TemplateTheme,
  typography: TemplateTypography,
): string => {
  const googleFontsImport = theme.googleFontsUrl
    ? `@import url('${theme.googleFontsUrl}');`
    : '';

  return `
    ${googleFontsImport}

    *, *::before, *::after {
      box-sizing: border-box;
    }

    html, body {
      margin: 0;
      padding: 0;
      font-family: "${theme.fontFamily}", "Helvetica Neue", Arial, sans-serif;
      background-color: ${theme.backgroundColor};
      color: ${theme.textColor};
      line-height: ${typography.lineHeight};
      font-size: ${typography.bodySize}pt;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    @page {
      size: A4 portrait;
      margin: 10mm;
    }

    h1, h2, h3, h4, h5, h6 {
      margin: 0;
      padding: 0;
    }

    p {
      margin: 0;
    }

    ol, ul {
      margin-top: 0;
      margin-bottom: 0;
    }

    a {
      color: ${theme.primaryColor};
      text-decoration: none;
    }

    .resume-page {
      background: ${theme.surfaceColor};
      max-width: 800px;
      margin: 0 auto;
    }

    ${theme.customCSS ?? ''}
  `;
};
