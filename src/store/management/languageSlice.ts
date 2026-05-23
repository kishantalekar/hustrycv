import {createSectionSlice} from './createSectionSlice';

export const createLanguageSlice = (set: any) =>
  createSectionSlice<LanguageItem>(set, 'languages', 'Language');
