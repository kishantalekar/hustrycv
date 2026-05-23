import {createSectionSlice} from './createSectionSlice';

export const createWorkSlice = (set: any) =>
  createSectionSlice<WorkItem>(set, 'work', 'WorkExperience');
