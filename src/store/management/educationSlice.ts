import {createSectionSlice} from './createSectionSlice';

export const createEducationSlice = (set: Function) =>
  createSectionSlice<EducationItem>(set, 'education', 'Education');
