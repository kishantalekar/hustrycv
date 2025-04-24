export const mockResumeData = {
  metadata: {
    id: 'uuid',
    templateId: 'classic_1',
    version: '1.0',
    createdAt: 'ISO 8601 date',
    updatedAt: 'ISO 8601 date',
  },
  basics: {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    location: 'New York, NY',
    linkedin: 'linkedin.com/in/johndoe',
    github: 'github.com/johndoe',
    website: 'johndoe.com',
    summary: 'Full-stack developer with 5+ years of experience...',
  },
  sections: {
    work: {
      type: 'work',
      visible: true,
      items: [
        {
          id: 'uuid',
          company: 'Tech Corp',
          position: 'Senior Developer',
          location: 'Remote',
          startDate: '2020-01',
          endDate: '2023-05',
          current: false,
          highlights: [
            'Led a team of 5 developers...',
            'Built scalable APIs using Node.js...',
          ],
        },
      ],
    },
    education: {
      type: 'education',
      visible: true,
      items: [
        {
          id: 'uuid',
          institution: 'MIT',
          degree: 'B.S. Computer Science',
          startDate: '2016-09',
          endDate: '2020-05',
          gpa: '3.8',
        },
      ],
    },
    skills: {
      type: 'skills',
      visible: true,
      items: [
        {
          id: 'uuid',
          name: 'React',
          level: 'advanced',
          keywords: ['Hooks', 'Redux'],
        },
      ],
    },
    projects: {
      type: 'projects',
      visible: true,
      items: [
        {
          id: 'uuid',
          name: 'E-Commerce Platform',
          description: 'Built with Next.js and Stripe...',
          url: 'github.com/project',
          highlights: ['Increased conversion by 30%'],
        },
      ],
    },
    customSections: [
      {
        type: 'publications',
        title: 'Publications',
        visible: true,
        items: [
          {
            id: 'uuid',
            title: 'AI in Healthcare',
            publisher: 'Journal of Tech',
            date: '2022-03',
          },
        ],
      },
    ],
  },
  settings: {
    atsOptimized: true,
    font: 'Arial',
    theme: 'dark',
    language: 'en',
  },
};

export const extendedMockResumeData = {
  metadata: {
    id: 'uuid-extended',
    templateId: 'modern_1',
    version: '1.0',
    createdAt: '2023-12-20T10:00:00Z',
    updatedAt: '2023-12-21T15:30:00Z',
  },
  basics: {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@techmail.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/sarahjohnson',
    github: 'github.com/sarahj-dev',
    website: 'sarahjohnson.dev',
    summary:
      'Senior Full-stack Engineer with 8+ years of experience specializing in cloud architecture and distributed systems. Proven track record of leading high-performance teams and delivering scalable solutions for enterprise clients. Strong expertise in modern JavaScript frameworks, cloud services, and agile methodologies.',
  },
  sections: {
    work: {
      type: 'work',
      visible: true,
      items: [
        {
          id: 'work-1',
          company: 'CloudTech Solutions',
          position: 'Senior Software Engineer',
          location: 'San Francisco, CA',
          startDate: '2021-03',
          endDate: null,
          current: true,
          highlights: [
            'Led a team of 8 engineers in developing a microservices-based platform serving 1M+ users',
            'Reduced system latency by 40% through implementation of Redis caching and GraphQL optimization',
            'Architected and deployed cloud-native solutions using AWS, resulting in 30% cost reduction',
            'Mentored 5 junior developers and established best practices for code review and testing',
          ],
        },
        {
          id: 'work-2',
          company: 'InnovateSoft Inc.',
          position: 'Full Stack Developer',
          location: 'Boston, MA',
          startDate: '2018-06',
          endDate: '2021-02',
          current: false,
          highlights: [
            'Developed and maintained 3 major client-facing applications using React and Node.js',
            'Implemented CI/CD pipelines reducing deployment time by 60%',
            'Collaborated with UX team to improve application accessibility, achieving WCAG 2.1 compliance',
          ],
        },
        {
          id: 'work-3',
          company: 'TechStart Solutions',
          position: 'Junior Developer',
          location: 'Remote',
          startDate: '2016-01',
          endDate: '2018-05',
          current: false,
          highlights: [
            'Built responsive web applications using Angular and Express.js',
            'Contributed to open-source projects and internal development tools',
            'Participated in agile development processes and sprint planning',
          ],
        },
      ],
    },
    education: {
      type: 'education',
      visible: true,
      items: [
        {
          id: 'edu-1',
          institution: 'Stanford University',
          degree: 'M.S. Computer Science',
          startDate: '2014-09',
          endDate: '2016-06',
          gpa: '3.9',
          highlights: [
            'Specialization in Artificial Intelligence',
            'Teaching Assistant for Advanced Algorithms course',
            'Published research paper on distributed systems',
          ],
        },
        {
          id: 'edu-2',
          institution: 'University of Washington',
          degree: 'B.S. Computer Science',
          startDate: '2010-09',
          endDate: '2014-05',
          gpa: '3.8',
          highlights: [
            'Minor in Mathematics',
            "Dean's List all semesters",
            'President of Computer Science Club',
          ],
        },
      ],
    },
    skills: {
      type: 'skills',
      visible: true,
      items: [
        {
          id: 'skill-1',
          name: 'Frontend Development',
          level: 'expert',
          keywords: [
            'React',
            'Vue.js',
            'TypeScript',
            'Webpack',
            'Jest',
            'CSS3/SASS',
          ],
        },
        {
          id: 'skill-2',
          name: 'Backend Development',
          level: 'expert',
          keywords: [
            'Node.js',
            'Python',
            'Java',
            'GraphQL',
            'REST APIs',
            'MongoDB',
          ],
        },
        {
          id: 'skill-3',
          name: 'Cloud & DevOps',
          level: 'advanced',
          keywords: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform'],
        },
        {
          id: 'skill-4',
          name: 'Other Technologies',
          level: 'intermediate',
          keywords: ['Machine Learning', 'WebSocket', 'Redis', 'ElasticSearch'],
        },
      ],
    },
    projects: {
      type: 'projects',
      visible: true,
      items: [
        {
          id: 'proj-1',
          name: 'Enterprise Resource Planning System',
          description:
            'Led the development of a comprehensive ERP system using microservices architecture',
          url: 'github.com/sarahj-dev/erp-system',
          highlights: [
            'Implemented event-driven architecture using Apache Kafka',
            'Developed real-time analytics dashboard with 99.9% uptime',
            'Integrated with multiple third-party services and APIs',
          ],
        },
        {
          id: 'proj-2',
          name: 'AI-Powered Content Management System',
          description:
            'Built a CMS with AI capabilities for content optimization and analytics',
          url: 'github.com/sarahj-dev/smart-cms',
          highlights: [
            'Integrated OpenAI API for content suggestions',
            'Implemented advanced search using Elasticsearch',
            'Developed custom plugin system for extensibility',
          ],
        },
      ],
    },
    customSections: [
      {
        type: 'certifications',
        title: 'Certifications',
        visible: true,
        items: [
          {
            id: 'cert-1',
            title: 'AWS Solutions Architect Professional',
            issuer: 'Amazon Web Services',
            date: '2022-06',
            url: 'aws.amazon.com/certification',
          },
          {
            id: 'cert-2',
            title: 'Google Cloud Professional Developer',
            issuer: 'Google',
            date: '2021-08',
            url: 'cloud.google.com/certification',
          },
        ],
      },
      {
        type: 'publications',
        title: 'Publications',
        visible: true,
        items: [
          {
            id: 'pub-1',
            title: 'Scalable Microservices Architecture in Practice',
            publisher: 'IEEE Software',
            date: '2022-09',
            url: 'ieee.org/publications',
          },
          {
            id: 'pub-2',
            title: 'Machine Learning in DevOps Practices',
            publisher: 'ACM Digital Library',
            date: '2021-11',
            url: 'acm.org/publications',
          },
        ],
      },
    ],
  },
  settings: {
    atsOptimized: true,
    font: 'Roboto',
    theme: 'professional',
    language: 'en',
  },
};
