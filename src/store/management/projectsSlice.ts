import {createSectionSlice} from './createSectionSlice';

export const createProjectsSlice = (set: Function) =>
  createSectionSlice<ProjectItem>(set, 'projects', 'Project');
