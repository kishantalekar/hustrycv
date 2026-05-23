/**
 * templates/index.ts — Template Registry
 *
 * Phase 3 (Template Engine): The `resumeTemplates` array now drives
 * all templates through the new data-driven engine (composeResumeHTML).
 *
 * Old architecture: 27 folders × ~8 files = ~216 files, all duplicated logic.
 * New architecture: 27 TemplateDefinitions + 11 shared section renderers.
 *
 * BACKWARD COMPATIBLE: All existing template IDs are preserved.
 * Old `getHTML` signature is maintained so `DownloadScreen` and `PreviewScreen`
 * need no changes.
 */

import {composeResumeHTML} from './engine/TemplateComposer';
import {templateDefinitions} from './engine/templateDefinitions';

// Re-export engine for consumers that want to compose directly
export {composeResumeHTML} from './engine/TemplateComposer';
export {templateDefinitions} from './engine/templateDefinitions';
export type {TemplateDefinition, TemplateTheme, RenderContext} from './engine/templateTypes';

// ─── Template Registry ────────────────────────────────────────────────────────

/**
 * The single authoritative list of templates used by:
 *   - TemplateSelector (picker UI)
 *   - getTemplateById (lookup by ID)
 *   - getHTML (called by DownloadScreen and useResumeHTML hook)
 */
export const resumeTemplates = templateDefinitions.map(definition => ({
  id: definition.id,
  name: definition.name,
  category: definition.category,
  isFeatured: definition.isFeatured ?? false,
  isNew: definition.isNew ?? false,
  image: definition.preview,
  getHTML: (resumeData: Resume) => composeResumeHTML(resumeData, definition),
}));

// ─── Lookup Helpers ───────────────────────────────────────────────────────────

export const getTemplateById = (id: string | undefined) => {
  if (id) {
    const found = resumeTemplates.find(t => t.id === id);
    if (found) {
      return found;
    }
  }
  return resumeTemplates[0];
};

export const getTemplateIndexById = (id: string): number => {
  const index = resumeTemplates.findIndex(t => t.id === id);
  return index >= 0 ? index : 0;
};
