import {createSectionSlice} from './createSectionSlice';

export const createCertificationsSlice = (set: Function) =>
  createSectionSlice<CertificateItem>(set, 'certifications', 'Certification');
