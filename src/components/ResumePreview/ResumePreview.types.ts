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
  };
}

export interface ResumePreviewProps {
  resumeData: ResumeData;
  style?: any;
}
