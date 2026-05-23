// Global type definitions
declare global {
  //Resume
  interface BaseItem {
    id: string;
  }
  interface Metadata {
    id: string;
    templateId: string;
    title?: string;
    version: string;
    createdAt: string;
    updatedAt: string;
    sectionOrder?: SectionType[];
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
    isPercentage: boolean;
    current: boolean;
    status?: string;
    location?: string;
  }
  interface SkillItem extends BaseItem {
    name: string;
    level: string;
    keywords: string[];
  }
  interface LinkItem {
    id?: string;
    label?: string;
    url?: string;
    icon?: string;
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
  interface HobbieItem extends BaseItem {
    id: string;
    name: string;
    link: LinkItem;
  }
  interface StrengthItem extends BaseItem {
    id: string;
    name: string;
  }

  interface ReferenceItem extends BaseItem {
    id: string;
    name: string;
    position: string;
    company: string;
    contact1: string;
    contact2: string;
    referenceText?: string;
  }
  interface LanguageItem extends BaseItem {
    name: string;
    level: string;
  }
  interface AwardItem extends BaseItem {
    title: string;
    issuer: string;
    date: string;
    url: string;
    description: string;
  }
  interface PublicationItem extends BaseItem {
    title: string;
    publisher: string;
    date: string;
    url: string;
    description: string;
  }

  interface VolunteeringItem extends BaseItem {
    name: string;
    organization: string;
    position: string;
    startDate: string;
    endDate: string;
    location: string;
    url: string;
    description: string;
  }
  interface CustomSectionItem {
    id: string;
    [key: string]: any;
  }

  type SectionType =
    | 'work'
    | 'education'
    | 'skills'
    | 'projects'
    | 'certifications'
    | 'hobbies'
    | 'custom'
    | 'strengths'
    | 'references'
    | 'personal'
    | 'volunteering'
    | 'languages'
    | 'awards'
    | 'publications';

  interface Section<T> {
    type: SectionType;
    visible: boolean;
    items: T[];
  }

  type FontSize = {
    [key in Settings['font']['size']]: number;
  };
  interface Settings {
    atsOptimized: boolean;
    font: {
      family: string; // Font family name (e.g., "Arial", "Helvetica")
      size: FontSize; // Base font size in points (e.g., 11, 12)
      lineSpacing: number; // Line height multiplier (e.g., 1.2 for 120%)
    };
    dateFormat: 'dd/mm/yyyy' | 'mm/dd/yyyy' | 'dd.mm.yyyy' | 'yyyy-mm-dd';
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
      hobbies: Section<HobbieItem>;
      strengths: Section<StrengthItem>;
      references: Section<ReferenceItem>;
      languages: Section<LanguageItem>;
      awards: Section<AwardItem>;
      publications: Section<PublicationItem>;
      volunteering: Section<VolunteeringItem>;
      customSections: Section<CustomSectionItem>[];
    };
    settings: Settings;
  }

  //common
}

// This empty export  is needed to make this a module
export {};
