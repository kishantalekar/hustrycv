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
