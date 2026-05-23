import {createSectionSlice} from './createSectionSlice';

export const createLanguageSlice = (set: Function) =>
  createSectionSlice<LanguageItem>(set, 'languages', 'Language');
