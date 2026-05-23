import {createSectionSlice} from './createSectionSlice';

export const createStrengthsSlice = (set: any) =>
  createSectionSlice<StrengthItem>(set, 'strengths', 'Strength');
