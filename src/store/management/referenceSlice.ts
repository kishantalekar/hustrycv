import {createSectionSlice} from './createSectionSlice';

export const createReferencesSlice = (set: any) =>
  createSectionSlice<ReferenceItem>(set, 'references', 'Reference');
