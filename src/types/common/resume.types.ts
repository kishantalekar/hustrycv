import {v4 as uuidv4} from 'uuid';

export interface Metadata {
  id: string;
  templateId: string;
  version: string;
  createdAt: string;
  updatedAt: string;
}

export interface Basics {
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  website: string;
  summary: string;
}

export interface WorkItem {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  status: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

export interface SkillItem {
  id: string;
  name: string;
  level: string;
  keywords: string[];
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  url: string;
}

export interface CertificateItem {
  id: string;
  name: string;
  authority: string;
  certificationUrlOrCode: string;
  description: string;
}
export interface CustomSectionItem {
  id: string;
  [key: string]: any;
}

export interface Section<T> {
  type: string;
  visible: boolean;
  items: T[];
}

export interface Settings {
  atsOptimized: boolean;
  font: string;
  theme: 'light' | 'dark';
  language: string;
}

export interface Resume {
  metadata: Metadata;
  basics: Basics;
  sections: {
    work: Section<WorkItem>;
    education: Section<EducationItem>;
    skills: Section<SkillItem>;
    projects: Section<ProjectItem>;
    certifications: Section<CertificateItem>;
    customSections: Section<CustomSectionItem>[];
  };
}

export const createInitialResume = () => ({
  metadata: {
    id: uuidv4(),
    templateId: 'classic_1',
    version: '1.0',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  basics: {
    name: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    website: '',
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
