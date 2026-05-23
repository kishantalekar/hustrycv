import {createSectionSlice} from './createSectionSlice';

export const createSkillsSlice = (set: any) =>
  createSectionSlice<SkillItem>(set, 'skills', 'Skill');
