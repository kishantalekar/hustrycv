import { getMinimalistResumeHTML } from './Minimalist';
import { getModernResumeHTML } from './Modern';
import { getProfessionalResumeHTML } from './Professional';
import { getTechnicalResumeHTML } from './Technical';

export * from './Professional';
export * from './Technical';
export * from './Minimalist';
export * from './Modern';

export const resumeTemplates = [
  {
    id: 'professional',
    name: 'Professional',
    // image: require('../assets/templates/professional.png'),
    getHTML: getProfessionalResumeHTML,
  },
  {
    id: 'technical',
    name: 'Technical',
    // image: require('../assets/templates/technical.png'),
    getHTML: getTechnicalResumeHTML,
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    // image: require('../assets/templates/minimalist.png'),
    getHTML: getMinimalistResumeHTML,
  },
  {
    id: 'modern',
    name: 'Modern',
    // image: require('../assets/templates/modern.png'),
    getHTML: getModernResumeHTML,
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
};
