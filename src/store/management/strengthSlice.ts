import {createSectionSlice} from './createSectionSlice';

export const createStrengthsSlice = (set: Function) =>
  createSectionSlice<StrengthItem>(set, 'strengths', 'Strength');
