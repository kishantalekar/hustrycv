import {createSectionSlice} from './createSectionSlice';

export const createHobbiesSlice = (set: Function) =>
  createSectionSlice<HobbieItem>(set, 'hobbies', 'Hobbie');
