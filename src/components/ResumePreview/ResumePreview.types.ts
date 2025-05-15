import {ViewStyle} from 'react-native';

// export interface Basics {
//   name?: string;
//   email?: string;
//   phone?: string;
//   summary?: string;
//   location?: string;
//   linkedin?: string;
//   github?: string;
//   website?: string;
// }

// export interface Work {
//   id: string;
//   company?: string;
//   position?: string;
// }

// export interface Education {
//   id: string;
//   institution?: string;
//   degree?: string;
// }

// export interface Skill {
//   id: string;
//   name?: string;
//   level?: string;
//   keywords?: string[];
// }
// export interface Project {
//   id: string;
//   name?: string;
//   description?: string;
//   url?: string;
//   highlights?: string[];
// }
// export interface Certification {
//   id: string;
//   name: string;
//   authority: string;
//   certificationUrlOrCode: string;
//   issueDate: string;
//   description: string;
// }
export interface Template {
  id: string;
  name: string;
  image: any;
  getHTML: (data: any) => string;
}

// export interface ResumeData {
//   basics?: Basics;
//   sections?: {
//     work?: {
//       type: string;
//       visible: boolean;
//       items: Array<WorkItem>;
//     };
//     education?: {
//       type: string;
//       visible: boolean;
//       items: Array<EducationItem>;
//     };
//     skills?: {
//       type: string;
//       visible: boolean;
//       items: Array<SkillItem>;
//     };
//     projects?: {
//       type: string;
//       visible: boolean;
//       items: Array<ProjectItem>;
//     };
//     certifications?: {
//       type: string;
//       visible: boolean;
//       items: Array<ProjectItem>;
//     };
//   };
// }

export interface ResumePreviewProps {
  resumeData?: Resume;
  style?: ViewStyle;
  selectedTemplate?: string;
  templates?: Template[];
}
