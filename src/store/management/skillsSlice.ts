import {createSectionSlice} from './createSectionSlice';

export const createSkillsSlice = (set: Function) =>
  createSectionSlice<SkillItem>(set, 'skills', 'Skill');
