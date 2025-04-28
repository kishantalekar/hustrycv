import {ViewStyle} from 'react-native';

export interface Basics {
  name?: string;
  email?: string;
  phone?: string;
  summary?: string;
  location?: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

export interface Work {
  id: string;
  company?: string;
  position?: string;
}

export interface Education {
  id: string;
  institution?: string;
  degree?: string;
}

export interface Skill {
  id: string;
  name?: string;
  level?: string;
  keywords?: string[];
}
export interface Project {
  id: string;
  name?: string;
  description?: string;
  url?: string;
  highlights?: string[];
}
export interface Certification {
  id: string;
  name: string;
  authority: string;
  certificationUrlOrCode: string;
  issueDate: string;
  description: string;
}
export interface Template {
  id: string;
  name: string;
  image: any;
  getHTML: (data: any) => string;
}

export interface ResumeData {
  basics?: Basics;
  sections?: {
    work?: {
      type: string;
      visible: boolean;
      items: Array<Work>;
    };
    education?: {
      type: string;
      visible: boolean;
      items: Array<Education>;
    };
    skills?: {
      type: string;
      visible: boolean;
      items: Array<Skill>;
    };
    projects?: {
      type: string;
      visible: boolean;
      items: Array<Project>;
    };
    certifications?: {
      type: string;
      visible: boolean;
      items: Array<Project>;
    };
  };
}

export interface ResumePreviewProps {
  resumeData?: ResumeData;
  style?: ViewStyle;
  selectedTemplate?: string;
  templates?: Template[];
}
