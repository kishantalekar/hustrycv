import {createSectionSlice} from './createSectionSlice';

export const createCertificationsSlice = (set: any) =>
  createSectionSlice<CertificateItem>(set, 'certifications', 'Certification');
