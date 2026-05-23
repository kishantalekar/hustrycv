import {createSectionSlice} from './createSectionSlice';

export const createEducationSlice = (set: any) =>
  createSectionSlice<EducationItem>(set, 'education', 'Education');
