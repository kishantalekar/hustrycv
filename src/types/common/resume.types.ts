import {v4 as uuidv4} from 'uuid';

// interface BaseItem {
//   id: string;
//   keywords?: string[];
// }
// export interface Metadata {
//   id: string;
//   templateId: string;
//   title?: string;
//   version: string;
//   createdAt: string;
//   updatedAt: string;
// }

// export interface Basics {
//   name: string;
//   email: string;
//   phone: string;
//   location: string;
//   summary: string;
//   socials: LinkItem[];
// }

// export interface WorkItem extends BaseItem {
//   company: string;
//   position: string;
//   location: string;
//   startDate: string;
//   endDate: string;
//   current: boolean;
//   description: string;
//   status: string;
// }

// export interface EducationItem extends BaseItem {
//   institution: string;
//   degree: string;
//   startDate: string;
//   endDate: string;
//   // TODO:need to add a toggle for percentage or gpa
//   gpa?: string;
//   current: boolean;
//   status?: string;
//   location?: string;
// }

// export interface SkillItem extends BaseItem {
//   name: string;
//   level: string;
// }

// export interface LinkItem {
//   id: string;
//   label: string;
//   url: string;
//   icon: string;
//   iconVariant?: IconVariant;
// }

// export interface ProjectItem extends BaseItem {
//   id: string;
//   name: string;
//   description: string;
//   url: string;
//   links: LinkItem[];
//   startDate?: string;
//   endDate?: string;
//   status: string;
//   current: boolean;
// }

// export interface CertificateItem extends BaseItem {
//   id: string;
//   name: string;
//   authority: string;
//   certificationUrlOrCode: string;
//   description: string;
//   date: string;
// }
// export interface CustomSectionItem {
//   id: string;
//   [key: string]: any;
// }

// export interface Section<T> {
//   type: string;
//   visible: boolean;
//   items: T[];
// }

// export interface Settings {
//   atsOptimized: boolean;
//   font: string;
//   theme: 'light' | 'dark';
//   language: string;
// }

// export interface Resume {
//   metadata: Metadata;
//   basics: Basics;
//   sections: {
//     work: Section<WorkItem>;
//     education: Section<EducationItem>;
//     skills: Section<SkillItem>;
//     projects: Section<ProjectItem>;
//     certifications: Section<CertificateItem>;
//     customSections: Section<CustomSectionItem>[];
//   };
// }

export const createInitialResume = () => ({
  metadata: {
    id: uuidv4(),
    templateId: 'professional',
    version: '1.0',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    sectionOrder: [
      'personal',
      'experience',
      'education',
      'skills',
      'projects',
      'certifications',
    ],
  },
  basics: {
    name: '',
    email: '',
    phone: '',
    location: '',

    socials: [],
    summary: '',
  },
  sections: {
    work: {
      type: 'work',
      visible: true,
      items: [],
    },
    education: {
      type: 'education',
      visible: true,
      items: [],
    },
    skills: {
      type: 'skills',
      visible: true,
      items: [],
    },
    projects: {
      type: 'projects',
      visible: true,
      items: [],
    },
    certifications: {
      type: 'certifications',
      visible: true,
      items: [],
    },
    customSections: [],
  },
});
