import {getFontSize} from '../templates/Professional/utils/formatDate';

export const updatedMockResumeData: Resume = {
  metadata: {
    id: '06193fc2-7b5d-4205-a281-4a83f31668ce',
    templateId: 'professional',
    version: '1.0',
    createdAt: '2025-05-23T10:57:01.326Z',
    updatedAt: '2025-05-23T10:57:01.326Z',
    sectionOrder: [
      'work',
      'education',
      'skills',
      'projects',
      'certifications',
      'hobbies',
      'strengths',
      'references',
    ] as SectionType[],
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

// New mock data for the elegant template
export const elegantMockResumeData: Resume = {
  metadata: {
    id: 'elegant-template-001',
    templateId: 'elegant',
    version: '1.0',
    createdAt: '2025-06-21T10:00:00.000Z',
    updatedAt: '2025-06-21T10:00:00.000Z',
    sectionOrder: [
      'work',
      'education',
      'skills',
      'projects',
      'certifications',
    ] as SectionType[],
  },
  basics: {
    name: 'Alexandra Chen',
    email: 'alexandra.chen@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    socials: [
      {
        id: 'linkedin-001',
        label: 'LinkedIn',
        url: 'linkedin.com/in/alexandrachen',
        icon: 'linkedin',
      },
      {
        id: 'github-001',
        label: 'GitHub',
        url: 'github.com/alexandrachen',
        icon: 'github',
      },
    ],
    summary:
      'Senior Software Engineer with 6+ years of experience building scalable web applications and leading cross-functional teams. Passionate about creating elegant solutions to complex problems and mentoring junior developers.',
  },
  sections: {
    work: {
      type: 'work',
      visible: true,
      items: [
        {
          id: 'work-001',
          company: 'TechFlow Solutions',
          position: 'Senior Software Engineer',
          location: 'San Francisco, CA',
          startDate: '2022-03',
          endDate: '',
          current: true,
          description:
            '<ul><li>Led development of microservices architecture serving 2M+ users, reducing response time by 45%</li><li>Mentored team of 5 junior developers, improving code quality and delivery speed by 30%</li><li>Implemented CI/CD pipelines using Docker and Kubernetes, reducing deployment time from 2 hours to 15 minutes</li><li>Collaborated with product managers and designers to deliver 15+ features ahead of schedule</li></ul>',
          status: 'visible',
        },
        {
          id: 'work-002',
          company: 'InnovateTech Inc',
          position: 'Full Stack Developer',
          location: 'San Francisco, CA',
          startDate: '2020-01',
          endDate: '2022-02',
          current: false,
          description:
            '<ul><li>Developed responsive web applications using React, Node.js, and PostgreSQL</li><li>Built real-time chat functionality using WebSocket, increasing user engagement by 25%</li><li>Optimized database queries and implemented caching strategies, improving performance by 40%</li><li>Worked closely with UX team to implement pixel-perfect designs</li></ul>',
          status: 'visible',
        },
      ],
    },
    education: {
      type: 'education',
      visible: true,
      items: [
        {
          id: 'edu-001',
          institution: 'University of California, Berkeley',
          degree: 'Bachelor of Science in Computer Science',
          startDate: '2016-08',
          endDate: '2020-05',
          gpa: '3.8',
          isPercentage: false,
          current: false,
          status: 'visible',
          location: 'Berkeley, CA',
        },
      ],
    },
    skills: {
      type: 'skills',
      visible: true,
      items: [
        {
          id: 'skill-001',
          name: 'Programming Languages',
          level: 'Expert',
          keywords: ['JavaScript', 'TypeScript', 'Python', 'Java', 'Go'],
        },
        {
          id: 'skill-002',
          name: 'Frontend Technologies',
          level: 'Expert',
          keywords: [
            'React',
            'Vue.js',
            'Next.js',
            'HTML5',
            'CSS3',
            'Tailwind CSS',
          ],
        },
        {
          id: 'skill-003',
          name: 'Backend & Database',
          level: 'Advanced',
          keywords: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'Redis'],
        },
        {
          id: 'skill-004',
          name: 'DevOps & Tools',
          level: 'Advanced',
          keywords: [
            'Docker',
            'Kubernetes',
            'AWS',
            'Git',
            'Jenkins',
            'Terraform',
          ],
        },
      ],
    },
    projects: {
      type: 'projects',
      visible: true,
      items: [
        {
          id: 'project-001',
          name: 'EcoTrack',
          description:
            '<ul><li>Built a sustainability tracking platform used by 50+ companies to monitor their carbon footprint</li><li>Implemented real-time data visualization using D3.js and Chart.js</li><li>Integrated with multiple APIs for energy consumption data collection</li></ul>',
          url: '',
          links: [
            {
              id: 'proj-link-001',
              label: 'GitHub',
              url: 'https://github.com/alexandrachen/ecotrack',
              icon: 'github',
            },
            {
              id: 'proj-link-002',
              label: 'Live Demo',
              url: 'https://ecotrack.demo.com',
              icon: 'external-link',
            },
          ],
          startDate: '2023-01',
          endDate: '2023-06',
          status: 'visible',
          current: false,
        },
        {
          id: 'project-002',
          name: 'TaskFlow',
          description:
            '<ul><li>Developed a project management tool with drag-and-drop functionality</li><li>Built collaborative features including real-time comments and file sharing</li><li>Implemented role-based access control and team management features</li></ul>',
          url: '',
          links: [
            {
              id: 'proj-link-003',
              label: 'GitHub',
              url: 'https://github.com/alexandrachen/taskflow',
              icon: 'github',
            },
          ],
          startDate: '2022-08',
          endDate: '2022-12',
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
          id: 'cert-001',
          name: 'AWS Certified Solutions Architect',
          authority: 'Amazon Web Services',
          certificationUrlOrCode: 'https://aws.amazon.com/certification/',
          description: '',
          date: '2023-09',
        },
        {
          id: 'cert-002',
          name: 'Certified Kubernetes Administrator',
          authority: 'Cloud Native Computing Foundation',
          certificationUrlOrCode: 'https://cncf.io/certification/cka/',
          description: '',
          date: '2023-05',
        },
      ],
    },
    customSections: [],
    hobbies: {
      type: 'hobbies',
      visible: true,
      items: [],
    },
    strengths: {
      type: 'strengths',
      visible: true,
      items: [],
    },
    references: {
      type: 'references',
      visible: true,
      items: [],
    },
  },
  settings: {
    atsOptimized: true,
    theme: 'light',
    language: 'en',
    font: {
      family: 'Inter',
      size: getFontSize('m'),
      lineSpacing: 1.4,
    },
    dateFormat: 'mm/dd/yyyy',
  },
};
