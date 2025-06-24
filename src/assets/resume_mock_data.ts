import {getFontSize} from '../templates/Professional/utils/formatDate';

export const updatedMockResumeData: Resume = {
  metadata: {
    id: '06193fc2-7b5d-4205-a281-4a83f31668ce',
    templateId: 'professional',
    version: '1.0',
    createdAt: '2025-05-23T10:57:01.326Z',
    updatedAt: '2025-05-23T10:57:01.326Z',
    sectionOrder: [
      'personal',
      'work',
      'education',
      'skills',
      'projects',
      'certifications',
      'hobbies',
      'strengths',
      'references',
    ],
  },
  basics: {
    name: 'Kishan Talekar',
    email: 'kishantalekar024@gmail.com',
    phone: '+91 9353167354',
    location: 'Karwar, Karnataka',
    socials: [
      {
        id: '5074a1a7-692c-48c2-a0fe-f42ddab22cb6',
        label: 'LinkedIn',
        url: 'linkedin.com/in/kishantalekar',
        icon: 'linkedin',
      },
      {
        id: 'badf4462-29b9-4896-8bbd-f57c389d2c2b',
        label: 'GitHub',
        url: 'github.com/kishantalekar',
        icon: 'github',
      },
    ],
    summary: '',
  },
  sections: {
    work: {
      type: 'work',
      visible: true,
      items: [
        {
          id: 'dc2de273-4939-4b38-bbab-165f88a0343a',
          company: 'Techwondoe',
          position: 'React Developer (Internship)',
          location: 'Remote',
          startDate: '2024-09',
          endDate: '2025-04',
          current: false,
          description:
            '<ul><li>Integrated 20+ GraphQL endpoints (Apollo Client), implementing pagination and cache invalidation strategies that decreased API latency by 40%</li><li>Built reusable UI component using Storybook, increasing development speed by 25%</li><li>Integrated Sanity headless CMS API with React Native, implementing robust data transformation pipelines to convert CMS content into markdown format and developing a comprehensive rendering system that handled all edge cases</li><li>Enhanced system performance and marketing outcomes by implementing error tracking with Sentry and user behavior tracking with Customer.io, resulting in 40% reduction in production issues and 20% improved marketing campaign conversion rates through 15+ custom event triggers</li><li>Conducted technical evaluation and built proof-of-concept using React-Admin and Refine.dev framework, subsequently leading development of production-grade admin portal with custom AWS Amplify authentication layer and MFA implementation</li></ul>',
          status: 'visible',
        },
      ],
    },
    education: {
      type: 'education',
      visible: true,
      items: [
        {
          id: '048cda8e-8145-4bfd-9952-95a63a9e2ad3',
          institution: 'KARNATAK UNIVERSITY DHARWAD',
          degree: 'Bachelors in Computer Application',
          startDate: '2021-09',
          endDate: '2024-08',
          gpa: '8.8',
          isPercentage: false,
          current: false,
          status: 'visible',
          location: 'Karwar, Karnataka',
        },
        {
          id: 'ca83474b-c48d-4d69-9b12-5348a228840a',
          institution: 'GOVT PU COLLEGE KARWAR',
          degree: 'PCMB',
          startDate: '2019-01',
          endDate: '2020-01',
          gpa: '88',
          isPercentage: true,
          current: false,
          status: 'visible',
          location: 'Karwar, Karnataka',
        },
      ],
    },
    skills: {
      type: 'skills',
      visible: true,
      items: [
        {
          id: '3424c50d-5969-4f68-aa50-3d77415965f4',
          name: 'Programming Languages',
          level: 'Intermediate',
          keywords: ['TypeScript', 'JavaScript', 'Dart', 'Python'],
        },
        {
          id: '658b887b-6951-4705-b876-27c3f08a6911',
          name: 'Frontend Development',
          level: 'Intermediate',
          keywords: ['React Native', 'React.js', 'Next.js', 'Flutter'],
        },
        {
          id: 'eae084a0-b529-46d5-ac6b-d0916c9f7108',
          name: 'Testing & Quality Assurance',
          level: 'Intermediate',
          keywords: ['Jest', 'React Testing Library', 'Storybook'],
        },
      ],
    },
    projects: {
      type: 'projects',
      visible: true,
      items: [
        {
          id: 'a18f8bce-d709-4938-9f24-ad9cb5334b75',
          name: 'Ecobarter',
          description:
            '<ul><li>Developed a mobile platform that connects users with local scrap collectors</li><li>Integrated Razor pay to authorize payments and Managed complex app state using Getx</li><li>Implemented Firebase for user authentication and email verification, enabling secure sign-in, sign-up</li></ul>',
          url: '',
          links: [
            {
              id: 'f-112770557658',
              label: 'GitHub',
              url: 'https://github.com/kishantalekar/Ecobarter',
              icon: 'github',
            },
            {
              id: 'f-112770557659',
              label: 'Playstore',
              url: 'URL_ADDRESS.google.com/store/apps/details?id=com.ecobarter',
              icon: 'playstore',
            },
          ] as LinkItem[],
          startDate: '2024-06',
          endDate: '2024-08',
          status: 'visible',
          current: false,
        },
        {
          id: 'ae9f063b-73e1-48ce-81c5-2d4fc1c8284e',
          name: 'Nutriscan',
          description:
            '<ul><li>Developed a user-friendly food analysis app with barcode scanning to provide detailed nutritional information for informed dietary choices</li><li>Leveraged the Open Food Facts API to access and integrate extensive food product data</li><li>Added a reminder feature for approaching expiry dates, promoting timely use and reducing food waste.</li></ul>',
          url: '',
          links: [],
          startDate: '2024-06',
          endDate: '2024-08',
          status: 'visible',
          current: false,
        },
        {
          id: 'c7288a19-01e7-46d1-8e89-09d889556967',
          name: 'AquaBuddy',
          description:
            '<ul><li>Developed AquaBuddy, a water reminder app, which tracks users water intake to ensure.</li><li>Implemented local push notifications to remind users to stay hydrated</li></ul>',
          url: '',
          links: [],
          startDate: '2024-03',
          endDate: '2024-06',
          status: 'visible',
          current: false,
        },
        {
          id: '2aa5c7c4-63c6-4611-bff5-d97b69528b63',
          name: 'AniTrack',
          description:
            '<ul><li>Built a anime browsing app with features like details,upcoming schedules etc.</li><li>Implemented a python scrapper using BeautifulSoup and fastapi to scrape data from various sites</li></ul>',
          url: '',
          links: [],
          startDate: '2024-03',
          endDate: '2024-06',
          status: 'visible',
          current: false,
        },
      ],
    },
    certifications: {
      type: 'certifications',
      visible: true,
      items: [
        {
          id: '0892a6a2-2c16-4f74-afbb-5b1a2bac886e',
          name: 'Crash Course on Python',
          authority: 'Google',
          certificationUrlOrCode:
            'https:URL_ADDRESS.coursera.org/account/accomplishments/certificate/5Q5K4F345Q9F',
          description: '',
          date: '',
        },
        {
          id: '9d7173bd-6b7d-4185-af1c-4731309b7e30',
          name: 'JavaScript Algorithms and Data Structures',
          authority: 'freeCodeCamp',
          certificationUrlOrCode:
            'https:URL_ADDRESS.coursera.org/account/accomplishments/certificate/5Q5K4F345Q9F',
          description: '',
          date: '2024-03',
        },
        {
          id: '890c5732-6cd2-4b4c-ae64-d0d53c85a403',
          name: 'Responsive Web Design',
          authority: 'freeCodeCamp',
          certificationUrlOrCode: '',
          description: '',
          date: '2024-03',
        },
      ],
    },
    customSections: [],
    hobbies: {
      type: 'hobbies',
      visible: true,
      items: [
        {
          id: 'f-112770557658',
          name: 'Coding',
          link: {
            id: '5074a1a7-692c-48c2-a0fe-f42ddab22cb6',
            label: 'LinkedIn',
            url: 'linkedin.com/in/kishantalekar',
            icon: 'linkedin',
          },
        },
        {
          id: 'f-112770557659',
          name: 'Gaming',
          link: {
            id: 'badf4462-29b9-4896-8bbd-f57c389d2c2b',
            label: 'GitHub',
            url: 'github.com/kishantalekar',
            icon: 'github',
          },
        },
      ],
    },
    strengths: {
      type: 'strengths',
      visible: true,
      items: [
        {
          id: 'f-112770557658',
          name: 'Coding',
        },
        {
          id: 'f-112770557659',
          name: 'Gaming',
        },
      ],
    },
    references: {
      type: 'references',
      visible: true,
      items: [
        {
          id: 'f-112770557658',
          name: 'Coding',
          position: 'Frontend Developer',
          company: 'Kishan Talekar',
          contact1: '+91 9353167354',
          contact2: 'kishantalekar024@gmail.com',
          referenceText:
            '<p> I am a Frontend Developer with a keen interest in React Native, React.js, Next.js, Flutter, and other related technologies. I have a strong background in JavaScript, TypeScript, and Python, and have experience in building scalable and maintainable web applications. I am passionate about contributing to open-source projects and continuously learning new skills to stay up-to-date with the latest trends and technologies.</p>',
        },
        {
          id: 'f-112770557659',
          name: 'Gaming',
          position: 'Game Developer',
          company: 'Kishan Talekar',
          contact1: '+91 9353167354',
          contact2: 'kishantalekar024@gmail.com',
          referenceText:
            '<p> I am a Game Developer with a passion for creating immersive and engaging gaming experiences. I have a strong background in game development, particularly in the Unity game engine, and have experience in building high-quality games for various platforms. I am skilled in using C# and C++ for game development, and have a strong understanding of game physics and artificial intelligence. I am excited to bring my skills and experience to the gaming industry and contribute to the development of innovative and engaging games.</p>',
        },
      ],
    },
  },
  settings: {
    atsOptimized: true,
    theme: 'dark',
    language: 'en',
    font: {
      family: 'sans-serif',
      size: getFontSize('s'),
      lineSpacing: 1.2,
    },
    dateFormat: 'dd/mm/yyyy',
  },
};
