/**
 * Template Engine — Barrel Export
 *
 * Import everything engine-related from here:
 *   import { composeResumeHTML, templateDefinitions } from '@/templates/engine';
 */
export {composeResumeHTML} from './TemplateComposer';
export {templateDefinitions, getTemplateDefinitionById} from './templateDefinitions';
export * from './templateTypes';
