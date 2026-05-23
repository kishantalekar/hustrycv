import {createSectionSlice} from './createSectionSlice';

export const createHobbiesSlice = (set: any) =>
  createSectionSlice<HobbieItem>(set, 'hobbies', 'Hobbie');
