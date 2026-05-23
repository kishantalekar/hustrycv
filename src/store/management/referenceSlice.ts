import {createSectionSlice} from './createSectionSlice';

export const createReferencesSlice = (set: Function) =>
  createSectionSlice<ReferenceItem>(set, 'references', 'Reference');
