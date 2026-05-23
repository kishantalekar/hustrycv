/**
 * Template Definitions — Phase 3.4
 *
 * All 27 templates described as lightweight data objects (~20 lines each).
 * Previously required 27 folders × ~8 files each = ~216 files.
 * Now: one file, one array, zero duplication.
 *
 * To add a new template: append a TemplateDefinition object here.
 * To change a template's look: edit its theme/typography tokens here.
 */

import {TemplateDefinition} from './templateTypes';

// ─── Shared Google Fonts URLs ────────────────────────────────────────────────

const FONTS = {
  FIRA_SANS: 'https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap',
  GEORGIA: undefined, // web-safe
  TIMES_NEW_ROMAN: undefined, // web-safe
  HELVETICA: undefined, // web-safe
  INTER: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
  POPPINS: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap',
  MONTSERRAT: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap',
  RALEWAY: 'https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700&display=swap',
  PLAYFAIR: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&display=swap',
  CORMORANT: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&display=swap',
  FIRA_CODE: 'https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600&display=swap',
  ORBITRON: 'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800&display=swap',
  SOURCE_SERIF: 'https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,wght@0,400;0,600;0,700;1,400&display=swap',
};

// ─── Default Scales ───────────────────────────────────────────────────────────

const defaultTypography = {
  nameSize: 22,
  sectionTitleSize: 11,
  cardTitleSize: 11,
  bodySize: 10,
  smallSize: 9,
  nameFontWeight: '700',
  lineHeight: 1.5,
};

const singleColumnLayout = {
  pagePadding: '20pt 24pt',
  sectionGap: '12pt',
};

const twoColumnLayout = {
  pagePadding: '0',
  sectionGap: '10pt',
  sidebarWidthPercent: 33,
  sidebarPadding: '20pt 14pt',
  mainPadding: '20pt 20pt',
};

// ─── Definitions ─────────────────────────────────────────────────────────────

export const templateDefinitions: TemplateDefinition[] = [

  // ── Professional ─────────────────────────────────────────────────────────

  {
    id: 'professional',
    name: 'Professional',
    category: 'professional',
    layout: 'single-column',
    preview: require('../../assets/templates/Professionalv1.png'),
    theme: {
      primaryColor: '#2D3748',
      accentColor: '#4A5568',
      textColor: '#2D3748',
      mutedColor: '#718096',
      backgroundColor: '#FFFFFF',
      surfaceColor: '#F7FAFC',
      sectionDividerStyle: 'line',
      sectionTitleStyle: 'normal',
      sectionTitleLetterSpacing: '0px',
      fontFamily: 'Fira Sans',
      googleFontsUrl: FONTS.FIRA_SANS,
    },
    typography: defaultTypography,
    layoutConfig: singleColumnLayout,
  },

  {
    id: 'professional-v2',
    name: 'Professional V2',
    category: 'professional',
    layout: 'single-column',
    preview: require('../../assets/templates/ProfessionalV2.png'),
    isFeatured: true,
    theme: {
      primaryColor: '#1A202C',
      accentColor: '#4A5568',
      textColor: '#2D3748',
      mutedColor: '#718096',
      backgroundColor: '#FFFFFF',
      surfaceColor: '#F7FAFC',
      sectionDividerStyle: 'thick-line',
      sectionTitleStyle: 'uppercase',
      sectionTitleLetterSpacing: '1.5px',
      fontFamily: 'Fira Sans',
      googleFontsUrl: FONTS.FIRA_SANS,
    },
    typography: {...defaultTypography, nameSize: 24, nameFontWeight: '800'},
    layoutConfig: singleColumnLayout,
  },

  {
    id: 'professional-classic',
    name: 'Professional Classic',
    category: 'professional',
    layout: 'single-column',
    preview: require('../../assets/templates/ProfessionalClassic.png'),
    theme: {
      primaryColor: '#2D3748',
      accentColor: '#4A5568',
      textColor: '#2D3748',
      mutedColor: '#718096',
      backgroundColor: '#FFFFFF',
      surfaceColor: '#F7FAFC',
      sectionDividerStyle: 'line',
      sectionTitleStyle: 'uppercase',
      sectionTitleLetterSpacing: '1.5px',
      fontFamily: 'Times New Roman',
    },
    typography: {...defaultTypography, nameFontWeight: '700'},
    layoutConfig: singleColumnLayout,
  },

  {
    id: 'professional-executive',
    name: 'Professional Executive',
    category: 'professional',
    layout: 'single-column',
    preview: require('../../assets/templates/ProfessionalExecutive.png'),
    isFeatured: true,
    theme: {
      primaryColor: '#1A202C',
      accentColor: '#2D3748',
      textColor: '#1A202C',
      mutedColor: '#718096',
      backgroundColor: '#FFFFFF',
      surfaceColor: '#EDF2F7',
      sectionDividerStyle: 'colored-bar',
      sectionTitleStyle: 'uppercase',
      sectionTitleLetterSpacing: '2px',
      fontFamily: 'Helvetica Neue',
      customCSS: `
        .resume-page {
          box-shadow: 0 4pt 12pt rgba(0,0,0,0.08);
        }
      `,
    },
    typography: {...defaultTypography, nameSize: 26, nameFontWeight: '700'},
    layoutConfig: singleColumnLayout,
  },

  {
    id: 'professional-modern',
    name: 'Professional Modern',
    category: 'professional',
    layout: 'single-column',
    preview: require('../../assets/templates/ProfessionalModern.png'),
    theme: {
      primaryColor: '#3182CE',
      accentColor: '#63B3ED',
      textColor: '#2D3748',
      mutedColor: '#718096',
      backgroundColor: '#F8FAFC',
      surfaceColor: '#FFFFFF',
      sectionDividerStyle: 'thick-line',
      sectionTitleStyle: 'normal',
      sectionTitleLetterSpacing: '0px',
      fontFamily: 'Helvetica Neue',
    },
    typography: defaultTypography,
    layoutConfig: singleColumnLayout,
  },

  {
    id: 'professional-two-column',
    name: 'Professional Two-Column',
    category: 'professional',
    layout: 'sidebar-left',
    preview: require('../../assets/templates/ProfessionalTwoColumn.png'),
    isFeatured: true,
    theme: {
      primaryColor: '#2C5282',
      accentColor: '#3182CE',
      textColor: '#2D3748',
      mutedColor: '#718096',
      backgroundColor: '#FFFFFF',
      surfaceColor: '#EBF8FF',
      sectionDividerStyle: 'colored-bar',
      sectionTitleStyle: 'uppercase',
      sectionTitleLetterSpacing: '1px',
      fontFamily: 'Helvetica Neue',
    },
    typography: defaultTypography,
    layoutConfig: {
      ...twoColumnLayout,
      sidebarBgColor: '#2C5282',
      mainBgColor: '#FFFFFF',
    },
  },

  // ── Elegant ───────────────────────────────────────────────────────────────

  {
    id: 'elegant',
    name: 'Elegant',
    category: 'professional',
    layout: 'single-column',
    preview: require('../../assets/templates/Elegant.png'),
    theme: {
      primaryColor: '#4A5568',
      accentColor: '#718096',
      textColor: '#4A5568',
      mutedColor: '#A0AEC0',
      backgroundColor: '#FFFFFF',
      surfaceColor: '#F7FAFC',
      sectionDividerStyle: 'line',
      sectionTitleStyle: 'normal',
      sectionTitleLetterSpacing: '2px',
      fontFamily: 'Georgia',
    },
    typography: {...defaultTypography, nameSize: 26},
    layoutConfig: singleColumnLayout,
  },

  {
    id: 'elegant-classic',
    name: 'Elegant Classic',
    category: 'professional',
    layout: 'single-column',
    preview: require('../../assets/templates/ElegantClassic.png'),
    isFeatured: true,
    theme: {
      primaryColor: '#5A67D8',
      accentColor: '#667EEA',
      textColor: '#4A5568',
      mutedColor: '#A0AEC0',
      backgroundColor: '#FFFFFF',
      surfaceColor: '#F7FAFC',
      sectionDividerStyle: 'colored-bar',
      sectionTitleStyle: 'uppercase',
      sectionTitleLetterSpacing: '2px',
      fontFamily: 'Georgia',
    },
    typography: {...defaultTypography, nameSize: 26, nameFontWeight: '700'},
    layoutConfig: singleColumnLayout,
  },

  {
    id: 'elegant-modern',
    name: 'Elegant Modern',
    category: 'modern',
    layout: 'single-column',
    preview: require('../../assets/templates/ElegantModern.png'),
    theme: {
      primaryColor: '#667EEA',
      accentColor: '#764BA2',
      textColor: '#4A5568',
      mutedColor: '#A0AEC0',
      backgroundColor: '#FFFFFF',
      surfaceColor: '#F0F4FF',
      sectionDividerStyle: 'colored-bar',
      sectionTitleStyle: 'lowercase',
      sectionTitleLetterSpacing: '2px',
      fontFamily: 'Helvetica Neue',
      customCSS: `
        h2 { background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
      `,
    },
    typography: {...defaultTypography, nameSize: 24},
    layoutConfig: singleColumnLayout,
  },

  {
    id: 'elegant-minimal',
    name: 'Elegant Minimal',
    category: 'minimal',
    layout: 'single-column',
    preview: require('../../assets/templates/ElegantMinimal.png'),
    theme: {
      primaryColor: '#2D3748',
      accentColor: '#4A5568',
      textColor: '#4A5568',
      mutedColor: '#A0AEC0',
      backgroundColor: '#FFFFFF',
      surfaceColor: '#F7FAFC',
      sectionDividerStyle: 'line',
      sectionTitleStyle: 'lowercase',
      sectionTitleLetterSpacing: '4px',
      fontFamily: 'Helvetica Neue',
    },
    typography: {...defaultTypography, nameSize: 24, lineHeight: 1.8},
    layoutConfig: singleColumnLayout,
  },

  // ── Minimalist ────────────────────────────────────────────────────────────

  {
    id: 'minimalist',
    name: 'Minimalist',
    category: 'minimal',
    layout: 'single-column',
    preview: require('../../assets/templates/Minimalistv1.png'),
    theme: {
      primaryColor: '#111827',
      accentColor: '#374151',
      textColor: '#111827',
      mutedColor: '#6B7280',
      backgroundColor: '#FFFFFF',
      surfaceColor: '#F9FAFB',
      sectionDividerStyle: 'line',
      sectionTitleStyle: 'uppercase',
      sectionTitleLetterSpacing: '2px',
      fontFamily: 'Helvetica Neue',
    },
    typography: {...defaultTypography, nameSize: 22},
    layoutConfig: singleColumnLayout,
  },

  {
    id: 'minimalist-clean',
    name: 'Minimalist Clean',
    category: 'minimal',
    layout: 'single-column',
    preview: require('../../assets/templates/MinimalistClean.png'),
    theme: {
      primaryColor: '#111827',
      accentColor: '#374151',
      textColor: '#111827',
      mutedColor: '#6B7280',
      backgroundColor: '#FFFFFF',
      surfaceColor: '#F9FAFB',
      sectionDividerStyle: 'none',
      sectionTitleStyle: 'lowercase',
      sectionTitleLetterSpacing: '6px',
      fontFamily: 'Helvetica Neue',
    },
    typography: {...defaultTypography, lineHeight: 1.8},
    layoutConfig: singleColumnLayout,
  },

  {
    id: 'minimalist-modern',
    name: 'Minimalist Modern',
    category: 'minimal',
    layout: 'single-column',
    preview: require('../../assets/templates/MinimalistModern.png'),
    isNew: true,
    theme: {
      primaryColor: '#4F46E5',
      accentColor: '#6366F1',
      textColor: '#1F2937',
      mutedColor: '#6B7280',
      backgroundColor: '#FFFFFF',
      surfaceColor: '#F9FAFB',
      sectionDividerStyle: 'colored-bar',
      sectionTitleStyle: 'lowercase',
      sectionTitleLetterSpacing: '2px',
      fontFamily: 'Helvetica Neue',
    },
    typography: {...defaultTypography, lineHeight: 1.7},
    layoutConfig: singleColumnLayout,
  },

  {
    id: 'minimalist-bold',
    name: 'Minimalist Bold',
    category: 'minimal',
    layout: 'single-column',
    preview: require('../../assets/templates/MinimalistBold.png'),
    theme: {
      primaryColor: '#111827',
      accentColor: '#374151',
      textColor: '#1F2937',
      mutedColor: '#6B7280',
      backgroundColor: '#FFFFFF',
      surfaceColor: '#F9FAFB',
      sectionDividerStyle: 'thick-line',
      sectionTitleStyle: 'uppercase',
      sectionTitleLetterSpacing: '3px',
      fontFamily: 'Helvetica Neue',
    },
    typography: {...defaultTypography, nameSize: 28, nameFontWeight: '900', sectionTitleSize: 12},
    layoutConfig: singleColumnLayout,
  },

  // ── Modern ────────────────────────────────────────────────────────────────

  {
    id: 'modern',
    name: 'Modern',
    category: 'modern',
    layout: 'single-column',
    preview: require('../../assets/templates/Modern.png'),
    theme: {
      primaryColor: '#4F46E5',
      accentColor: '#7C3AED',
      textColor: '#1F2937',
      mutedColor: '#6B7280',
      backgroundColor: '#FFFFFF',
      surfaceColor: '#F9FAFB',
      sectionDividerStyle: 'colored-bar',
      sectionTitleStyle: 'uppercase',
      sectionTitleLetterSpacing: '1px',
      fontFamily: 'Inter',
      googleFontsUrl: FONTS.INTER,
    },
    typography: defaultTypography,
    layoutConfig: singleColumnLayout,
  },

  {
    id: 'modern-corporate',
    name: 'Modern Corporate',
    category: 'modern',
    layout: 'single-column',
    preview: require('../../assets/templates/ModernCorporate.png'),
    isFeatured: true,
    theme: {
      primaryColor: '#1A365D',
      accentColor: '#3182CE',
      textColor: '#2D3748',
      mutedColor: '#718096',
      backgroundColor: '#FFFFFF',
      surfaceColor: '#F7FAFC',
      sectionDividerStyle: 'colored-bar',
      sectionTitleStyle: 'uppercase',
      sectionTitleLetterSpacing: '1px',
      fontFamily: 'Inter',
      googleFontsUrl: FONTS.INTER,
      customCSS: `
        .resume-page { background: white; border-radius: 8pt; box-shadow: 0 8pt 24pt rgba(0,0,0,0.08); }
      `,
    },
    typography: defaultTypography,
    layoutConfig: singleColumnLayout,
  },

  {
    id: 'modern-creative',
    name: 'Modern Creative',
    category: 'creative',
    layout: 'single-column',
    preview: require('../../assets/templates/ModernCreative.png'),
    isFeatured: true,
    theme: {
      primaryColor: '#FF6B6B',
      accentColor: '#4ECDC4',
      textColor: '#2D3748',
      mutedColor: '#718096',
      backgroundColor: '#FFFFFF',
      surfaceColor: '#FFF5F5',
      sectionDividerStyle: 'colored-bar',
      sectionTitleStyle: 'uppercase',
      sectionTitleLetterSpacing: '2px',
      fontFamily: 'Poppins',
      googleFontsUrl: FONTS.POPPINS,
      customCSS: `
        body { background: linear-gradient(135deg, #ff6b6b10 0%, #4ecdc410 100%); }
        h2 { background: linear-gradient(135deg, #ff6b6b, #4ecdc4); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
      `,
    },
    typography: {...defaultTypography, nameSize: 24},
    layoutConfig: singleColumnLayout,
  },

  {
    id: 'modern-gradient',
    name: 'Modern Gradient',
    category: 'creative',
    layout: 'single-column',
    preview: require('../../assets/templates/ModernGradient.png'),
    isFeatured: true,
    theme: {
      primaryColor: '#667EEA',
      accentColor: '#764BA2',
      textColor: '#2D3748',
      mutedColor: '#718096',
      backgroundColor: '#FFFFFF',
      surfaceColor: '#F0F4FF',
      sectionDividerStyle: 'colored-bar',
      sectionTitleStyle: 'uppercase',
      sectionTitleLetterSpacing: '2px',
      fontFamily: 'Poppins',
      googleFontsUrl: FONTS.POPPINS,
      customCSS: `
        h2 { background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .resume-page { background: white; border-radius: 20pt; box-shadow: 0 16pt 48pt rgba(0,0,0,0.15); }
      `,
    },
    typography: {...defaultTypography, nameSize: 24, nameFontWeight: '700'},
    layoutConfig: singleColumnLayout,
  },

  {
    id: 'modern-glass',
    name: 'Modern Glass',
    category: 'creative',
    layout: 'single-column',
    preview: require('../../assets/templates/ModernGlass.png'),
    isFeatured: true,
    theme: {
      primaryColor: '#1A365D',
      accentColor: '#667EEA',
      textColor: '#2D3748',
      mutedColor: '#718096',
      backgroundColor: '#667EEA',
      surfaceColor: 'rgba(255,255,255,0.25)',
      sectionDividerStyle: 'line',
      sectionTitleStyle: 'uppercase',
      sectionTitleLetterSpacing: '1pt',
      fontFamily: 'Inter',
      googleFontsUrl: FONTS.INTER,
      customCSS: `
        body { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; padding: 20pt; }
        .resume-page { background: rgba(255,255,255,0.25); backdrop-filter: blur(20pt); -webkit-backdrop-filter: blur(20pt); border-radius: 20pt; border: 1pt solid rgba(255,255,255,0.3); box-shadow: 0 16pt 40pt rgba(0,0,0,0.2); }
      `,
    },
    typography: {...defaultTypography, nameSize: 24},
    layoutConfig: singleColumnLayout,
  },

  {
    id: 'modern-neon',
    name: 'Modern Neon',
    category: 'creative',
    layout: 'single-column',
    preview: require('../../assets/templates/ModernNeon.png'),
    theme: {
      primaryColor: '#00FFFF',
      accentColor: '#00FF88',
      textColor: '#CCCCCC',
      mutedColor: '#888888',
      backgroundColor: '#0A0A0A',
      surfaceColor: '#111111',
      sectionDividerStyle: 'colored-bar',
      sectionTitleStyle: 'uppercase',
      sectionTitleLetterSpacing: '2px',
      fontFamily: 'Orbitron',
      googleFontsUrl: FONTS.ORBITRON,
      customCSS: `
        body { background: #0a0a0a; color: #cccccc; }
        .resume-page { background: #111111; border-radius: 16pt; box-shadow: 0 0 40pt #00ffff40, inset 0 0 40pt #00ffff10; border: 2pt solid #00ffff; }
        h1 { color: #00ffff; text-shadow: 0 0 10pt #00ffff; }
        h2 { color: #00ffff; text-shadow: 0 0 8pt #00ffff80; }
      `,
    },
    typography: {...defaultTypography, nameSize: 22, lineHeight: 1.6},
    layoutConfig: singleColumnLayout,
  },

  {
    id: 'modern-artistic',
    name: 'Modern Artistic',
    category: 'creative',
    layout: 'single-column',
    preview: require('../../assets/templates/ModernArtistic.png'),
    theme: {
      primaryColor: '#D4A017',
      accentColor: '#8B5E3C',
      textColor: '#2D2D2D',
      mutedColor: '#707070',
      backgroundColor: '#FAFAF5',
      surfaceColor: '#F5ECD7',
      sectionDividerStyle: 'thick-line',
      sectionTitleStyle: 'capitalize',
      sectionTitleLetterSpacing: '1px',
      fontFamily: 'Cormorant Garamond',
      googleFontsUrl: FONTS.CORMORANT,
    },
    typography: {...defaultTypography, nameSize: 28, nameFontWeight: '600', lineHeight: 1.7},
    layoutConfig: singleColumnLayout,
  },

  // ── Technical ─────────────────────────────────────────────────────────────

  {
    id: 'technical',
    name: 'Technical',
    category: 'technical',
    layout: 'single-column',
    preview: require('../../assets/templates/Technicalv1.png'),
    theme: {
      primaryColor: '#374151',
      accentColor: '#4B5563',
      textColor: '#374151',
      mutedColor: '#6B7280',
      backgroundColor: '#FFFFFF',
      surfaceColor: '#F9FAFB',
      sectionDividerStyle: 'line',
      sectionTitleStyle: 'uppercase',
      sectionTitleLetterSpacing: '1px',
      fontFamily: 'Fira Code',
      googleFontsUrl: FONTS.FIRA_CODE,
    },
    typography: defaultTypography,
    layoutConfig: singleColumnLayout,
  },

  {
    id: 'technical-blue',
    name: 'Technical Blue',
    category: 'technical',
    layout: 'single-column',
    preview: require('../../assets/templates/TechnicalBlue.png'),
    isFeatured: true,
    theme: {
      primaryColor: '#2563EB',
      accentColor: '#1E40AF',
      textColor: '#1E40AF',
      mutedColor: '#3B82F6',
      backgroundColor: '#F8FAFC',
      surfaceColor: '#EFF6FF',
      sectionDividerStyle: 'colored-bar',
      sectionTitleStyle: 'normal',
      sectionTitleLetterSpacing: '0px',
      fontFamily: 'Fira Code',
      googleFontsUrl: FONTS.FIRA_CODE,
    },
    typography: defaultTypography,
    layoutConfig: singleColumnLayout,
  },

  {
    id: 'technical-dark',
    name: 'Technical Dark',
    category: 'technical',
    layout: 'single-column',
    preview: require('../../assets/templates/TechnicalDark.png'),
    isFeatured: true,
    theme: {
      primaryColor: '#00FF88',
      accentColor: '#00CC66',
      textColor: '#CCCCCC',
      mutedColor: '#888888',
      backgroundColor: '#1A1A1A',
      surfaceColor: '#222222',
      sectionDividerStyle: 'colored-bar',
      sectionTitleStyle: 'normal',
      sectionTitleLetterSpacing: '0px',
      fontFamily: 'Courier New',
      customCSS: `
        body { background: #1a1a1a; color: #cccccc; }
        .resume-page { background: #1a1a1a; }
        a { color: #00ff88; }
      `,
    },
    typography: {...defaultTypography, lineHeight: 1.6},
    layoutConfig: singleColumnLayout,
  },

  {
    id: 'technical-minimal',
    name: 'Technical Minimal',
    category: 'technical',
    layout: 'single-column',
    preview: require('../../assets/templates/TechnicalMinimal.png'),
    theme: {
      primaryColor: '#374151',
      accentColor: '#4B5563',
      textColor: '#374151',
      mutedColor: '#6B7280',
      backgroundColor: '#FFFFFF',
      surfaceColor: '#F9FAFB',
      sectionDividerStyle: 'line',
      sectionTitleStyle: 'normal',
      sectionTitleLetterSpacing: '0px',
      fontFamily: 'Monaco',
    },
    typography: {...defaultTypography, lineHeight: 1.7},
    layoutConfig: singleColumnLayout,
  },

  {
    id: 'technical-two-column',
    name: 'Technical Two-Column',
    category: 'technical',
    layout: 'sidebar-left',
    preview: require('../../assets/templates/TechnicalTwoColumn.png'),
    isFeatured: true,
    theme: {
      primaryColor: '#374151',
      accentColor: '#4B5563',
      textColor: '#374151',
      mutedColor: '#6B7280',
      backgroundColor: '#FFFFFF',
      surfaceColor: '#111827',
      sectionDividerStyle: 'colored-bar',
      sectionTitleStyle: 'uppercase',
      sectionTitleLetterSpacing: '1px',
      fontFamily: 'Courier New',
    },
    typography: defaultTypography,
    layoutConfig: {
      ...twoColumnLayout,
      sidebarBgColor: '#111827',
      mainBgColor: '#FFFFFF',
    },
  },

  // ── Creative Two-Column ───────────────────────────────────────────────────

  {
    id: 'creative-two-column',
    name: 'Creative Two-Column',
    category: 'creative',
    layout: 'sidebar-left',
    preview: require('../../assets/templates/CreativeTwoColumn.png'),
    isFeatured: true,
    isNew: true,
    theme: {
      primaryColor: '#8B5CF6',
      accentColor: '#F59E0B',
      textColor: '#1F2937',
      mutedColor: '#6B7280',
      backgroundColor: '#FFFFFF',
      surfaceColor: '#FEF3C7',
      sectionDividerStyle: 'colored-bar',
      sectionTitleStyle: 'uppercase',
      sectionTitleLetterSpacing: '2px',
      fontFamily: 'Poppins',
      googleFontsUrl: FONTS.POPPINS,
      customCSS: `
        h2 { background: linear-gradient(135deg, #8b5cf6, #f59e0b); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
      `,
    },
    typography: {...defaultTypography, nameSize: 22},
    layoutConfig: {
      ...twoColumnLayout,
      sidebarBgColor: 'linear-gradient(180deg, #fef3c7 0%, #e0e7ff 100%)',
      mainBgColor: '#FFFFFF',
    },
  },
];

// ─── Lookup helpers ───────────────────────────────────────────────────────────

export const getTemplateDefinitionById = (
  id: string,
): TemplateDefinition | undefined =>
  templateDefinitions.find(t => t.id === id);
