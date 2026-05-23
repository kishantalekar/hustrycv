import {createSectionSlice} from './createSectionSlice';

export const createWorkSlice = (set: Function) =>
  createSectionSlice<WorkItem>(set, 'work', 'WorkExperience');
