import {createSectionSlice} from './createSectionSlice';

export const createProjectsSlice = (set: any) =>
  createSectionSlice<ProjectItem>(set, 'projects', 'Project');
