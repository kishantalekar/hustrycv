// Global type definitions
declare global {
  //Resume
  interface BaseItem {
    id: string;
    keywords?: string[];
  }
  interface Metadata {
    id: string;
    templateId: string;
    title?: string;
    version: string;
    createdAt: string;
    updatedAt: string;
    sectionOrder?: string[];
  }
  interface Basics {
    name: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
    socials: LinkItem[];
  }
  interface WorkItem extends BaseItem {
    company: string;
    position: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
    status: string;
  }
  interface EducationItem extends BaseItem {
    institution: string;
    degree: string;
    startDate: string;
    endDate: string;
    // TODO:need to add a toggle for percentage or gpa
    gpa?: string;
    current: boolean;
    status?: string;
    location?: string;
  }
  interface SkillItem extends BaseItem {
    name: string;
    level: string;
  }
  interface LinkItem {
    id: string;
    label: string;
    url: string;
    icon: string;
    iconVariant?: IconVariant;
  }
  interface ProjectItem extends BaseItem {
    id: string;
    name: string;
    description: string;
    url: string;
    links: LinkItem[];
    startDate?: string;
    endDate?: string;
    status: string;
    current: boolean;
  }
  interface CertificateItem extends BaseItem {
    id: string;
    name: string;
    authority: string;
    certificationUrlOrCode: string;
    description: string;
    date: string;
  }
  interface CustomSectionItem {
    id: string;
    [key: string]: any;
  }
  interface Section<T> {
    type: string;
    visible: boolean;
    items: T[];
  }
  interface Settings {
    atsOptimized: boolean;
    font: string;
    theme: 'light' | 'dark';
    language: string;
  }
  interface Resume {
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

  //common
}

// This empty export  is needed to make this a module
export {};
