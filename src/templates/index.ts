import {getProfessionalResumeHTML} from './Professional';
import {getElegantResumeHTML} from './Elegant';
import {getProfessionalV2ResumeHTML} from './ProfessionalV2';
import {getTechnicalResumeHTML} from './Technical';
import {getMinimalistResumeHTML} from './Minimalist';
import {getModernResumeHTML} from './Modern';
import {getModernCreativeResumeHTML} from './ModernCreative';
import {getModernCorporateResumeHTML} from './ModernCorporate';
import {getModernGradientResumeHTML} from './ModernGradient';
import {getModernGlassResumeHTML} from './ModernGlass';
import {getModernNeonResumeHTML} from './ModernNeon';
import {getModernArtisticResumeHTML} from './ModernArtistic';
import {getProfessionalClassicResumeHTML} from './ProfessionalClassic';
import {getProfessionalExecutiveResumeHTML} from './ProfessionalExecutive';
import {getProfessionalModernResumeHTML} from './ProfessionalModern';
import {getElegantClassicResumeHTML} from './ElegantClassic';
import {getElegantModernResumeHTML} from './ElegantModern';
import {getElegantMinimalResumeHTML} from './ElegantMinimal';
import {getTechnicalDarkResumeHTML} from './TechnicalDark';
import {getTechnicalBlueResumeHTML} from './TechnicalBlue';
import {getTechnicalMinimalResumeHTML} from './TechnicalMinimal';
import {getMinimalistCleanResumeHTML} from './MinimalistClean';
import {getMinimalistModernResumeHTML} from './MinimalistModern';
import {getMinimalistBoldResumeHTML} from './MinimalistBold';
import {getProfessionalTwoColumnResumeHTML} from './ProfessionalTwoColumn';
import {getTechnicalTwoColumnResumeHTML} from './TechnicalTwoColumn';
import {getCreativeTwoColumnResumeHTML} from './CreativeTwoColumn';

export * from './Professional';
export * from './Elegant';
export * from './ProfessionalV2';
export * from './Technical';
export * from './Minimalist';
export * from './Modern';
export * from './ModernCreative';
export * from './ModernCorporate';
export * from './ModernGradient';
export * from './ModernGlass';
export * from './ModernNeon';
export * from './ModernArtistic';
export * from './ProfessionalClassic';
export * from './ProfessionalExecutive';
export * from './ProfessionalModern';
export * from './ElegantClassic';
export * from './ElegantModern';
export * from './ElegantMinimal';
export * from './TechnicalDark';
export * from './TechnicalBlue';
export * from './TechnicalMinimal';
export * from './MinimalistClean';
export * from './MinimalistModern';
export * from './MinimalistBold';
export * from './ProfessionalTwoColumn';
export * from './TechnicalTwoColumn';
export * from './CreativeTwoColumn';

export const resumeTemplates = [
  {
    id: 'professional',
    name: 'Professional',
    getHTML: getProfessionalResumeHTML,
    image: require('../assets/templates/Professionalv1.png'),
  },
  {
    id: 'elegant',
    name: 'Elegant',
    getHTML: getElegantResumeHTML,
    image: require('../assets/templates/Elegant.png'),
  },
  {
    id: 'professional-v2',
    name: 'Professional V2',
    getHTML: getProfessionalV2ResumeHTML,
    image: require('../assets/templates/ProfessionalV2.png'),
  },
  {
    id: 'technical',
    name: 'Technical',
    getHTML: getTechnicalResumeHTML,
    image: require('../assets/templates/Technicalv1.png'),
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    getHTML: getMinimalistResumeHTML,
    image: require('../assets/templates/Minimalistv1.png'),
  },
  {
    id: 'modern',
    name: 'Modern',
    getHTML: getModernResumeHTML,
    image: require('../assets/templates/Modern.png'),
  },
  {
    id: 'modern-creative',
    name: 'Modern Creative',
    getHTML: getModernCreativeResumeHTML,
    image: require('../assets/templates/ModernCreative.png'),
  },
  {
    id: 'modern-corporate',
    name: 'Modern Corporate',
    getHTML: getModernCorporateResumeHTML,
    image: require('../assets/templates/ModernCorporate.png'),
  },
  {
    id: 'modern-gradient',
    name: 'Modern Gradient',
    getHTML: getModernGradientResumeHTML,
    image: require('../assets/templates/ModernGradient.png'),
  },
  {
    id: 'modern-glass',
    name: 'Modern Glass',
    getHTML: getModernGlassResumeHTML,
    image: require('../assets/templates/ModernGlass.png'),
  },
  {
    id: 'modern-neon',
    name: 'Modern Neon',
    getHTML: getModernNeonResumeHTML,
    image: require('../assets/templates/ModernNeon.png'),
  },
  {
    id: 'modern-artistic',
    name: 'Modern Artistic',
    getHTML: getModernArtisticResumeHTML,
    image: require('../assets/templates/ModernArtistic.png'),
  },
  {
    id: 'professional-classic',
    name: 'Professional Classic',
    getHTML: getProfessionalClassicResumeHTML,
    image: require('../assets/templates/ProfessionalClassic.png'),
  },
  {
    id: 'professional-executive',
    name: 'Professional Executive',
    getHTML: getProfessionalExecutiveResumeHTML,
    image: require('../assets/templates/ProfessionalExecutive.png'),
  },
  {
    id: 'professional-modern',
    name: 'Professional Modern',
    getHTML: getProfessionalModernResumeHTML,
    image: require('../assets/templates/ProfessionalModern.png'),
  },
  {
    id: 'elegant-classic',
    name: 'Elegant Classic',
    getHTML: getElegantClassicResumeHTML,
    image: require('../assets/templates/ElegantClassic.png'),
  },
  {
    id: 'elegant-modern',
    name: 'Elegant Modern',
    getHTML: getElegantModernResumeHTML,
    image: require('../assets/templates/ElegantModern.png'),
  },
  {
    id: 'elegant-minimal',
    name: 'Elegant Minimal',
    getHTML: getElegantMinimalResumeHTML,
    image: require('../assets/templates/ElegantMinimal.png'),
  },
  {
    id: 'technical-dark',
    name: 'Technical Dark',
    getHTML: getTechnicalDarkResumeHTML,
    image: require('../assets/templates/TechnicalDark.png'),
  },
  {
    id: 'technical-blue',
    name: 'Technical Blue',
    getHTML: getTechnicalBlueResumeHTML,
    image: require('../assets/templates/TechnicalBlue.png'),
  },
  {
    id: 'technical-minimal',
    name: 'Technical Minimal',
    getHTML: getTechnicalMinimalResumeHTML,
    image: require('../assets/templates/TechnicalMinimal.png'),
  },
  {
    id: 'minimalist-clean',
    name: 'Minimalist Clean',
    getHTML: getMinimalistCleanResumeHTML,
    image: require('../assets/templates/MinimalistClean.png'),
  },
  {
    id: 'minimalist-modern',
    name: 'Minimalist Modern',
    getHTML: getMinimalistModernResumeHTML,
    image: require('../assets/templates/MinimalistModern.png'),
  },
  {
    id: 'minimalist-bold',
    name: 'Minimalist Bold',
    getHTML: getMinimalistBoldResumeHTML,
    image: require('../assets/templates/MinimalistBold.png'),
  },
  {
    id: 'professional-two-column',
    name: 'Professional Two-Column',
    getHTML: getProfessionalTwoColumnResumeHTML,
    image: require('../assets/templates/ProfessionalTwoColumn.png'),
  },
  {
    id: 'technical-two-column',
    name: 'Technical Two-Column',
    getHTML: getTechnicalTwoColumnResumeHTML,
    image: require('../assets/templates/TechnicalTwoColumn.png'),
  },
  {
    id: 'creative-two-column',
    name: 'Creative Two-Column',
    getHTML: getCreativeTwoColumnResumeHTML,
    image: require('../assets/templates/CreativeTwoColumn.png'),
  },
];

export const getTemplateById = (id: string | undefined) => {
  for (const element of resumeTemplates) {
    if (element.id === id) {
      return element;
    }
  }
  return resumeTemplates[0];
};

export const getTemplateIndexById = (id: string) => {
  for (let i = 0; i < resumeTemplates.length; i++) {
    if (resumeTemplates[i].id === id) {
      return i;
    }
  }
  return 0;
};
