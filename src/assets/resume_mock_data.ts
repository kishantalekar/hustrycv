import {Resume} from '@/types';

export const updatedMockResumeData: Resume = {
  metadata: {
    id: 'uuid-extended',
    templateId: 'professional',
    version: '1.0',
    createdAt: '2023-12-20T10:00:00Z',
    updatedAt: '2023-12-21T15:30:00Z',
  },
  basics: {
    name: 'Alex Chen',
    email: 'alex.chen@techmail.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    summary:
      '<p><strong>Senior Software Engineer</strong> with over <em>8 years</em> of experience in <u>full-stack development</u>, specializing in <strong>cloud architecture</strong> and <strong>distributed systems</strong>. Led multiple high-impact projects focusing on scalability and performance optimization.</p>',
    socials: [
      {
        id: 'social-1',
        type: 'professional',
        label: 'LinkedIn',
        url: 'https://linkedin.com/in/alexchen',
        icon: 'linkedin',
        iconVariant: 'fontawesome',
      },
      {
        id: 'social-2',
        type: 'development',
        label: 'GitHub',
        url: 'https://github.com/alexchen-dev',
        icon: 'github',
        iconVariant: 'fontawesome',
      },
      {
        id: 'social-3',
        type: 'portfolio',
        label: 'Portfolio',
        url: 'https://alexchen.dev',
        icon: 'globe',
        iconVariant: 'fontawesome',
      },
    ],
  },
  sections: {
    work: {
      type: 'work',
      visible: true,
      items: [
        {
          id: 'work-1',
          company: 'TechScale Solutions',
          position: 'Lead Software Engineer',
          location: 'San Francisco, CA',
          startDate: '2021-06',
          endDate: '',
          current: true,
          description:
            '<ul><li>Leading a team of <strong>12 engineers</strong> in developing cloud-native applications</li><li>Implemented <em>microservices architecture</em> resulting in <u>45% improved scalability</u></li><li>Spearheaded adoption of <strong>Kubernetes</strong> and <strong>service mesh</strong> technologies</li><li>Established CI/CD pipelines reducing deployment time by <u>60%</u></li></ul>',
          status: 'active',
          keywords: ['Kubernetes', 'Microservices', 'AWS', 'Service Mesh'],
        },
        {
          id: 'work-2',
          company: 'DataFlow Systems',
          position: 'Senior Backend Engineer',
          location: 'Seattle, WA',
          startDate: '2019-03',
          endDate: '2021-05',
          current: false,
          description:
            '<ul><li>Architected and implemented <strong>real-time data processing pipeline</strong> handling <em>2M+ events/second</em></li><li>Reduced system latency by <u>60%</u> through optimization of <strong>Apache Kafka</strong> clusters</li><li>Designed and deployed fault-tolerant architecture ensuring <em>99.99% uptime</em></li><li>Led cross-functional team of 5 engineers in successful system implementation</li></ul>',
          status: 'completed',
          keywords: ['Apache Kafka', 'Elasticsearch', 'Redis', 'Python'],
        },
        {
          id: 'work-3',
          company: 'InnovateTech Inc.',
          position: 'Full Stack Developer',
          location: 'Remote',
          startDate: '2017-01',
          endDate: '2019-02',
          current: false,
          description:
            '<ul><li>Developed <strong>React-based dashboard</strong> for IoT device management with modern UI components</li><li>Implemented <em>real-time monitoring</em> system with <u>WebSocket</u> integration for live data updates</li><li>Reduced dashboard loading time by 40% through code optimization and lazy loading</li><li>Built reusable component library used across multiple projects</li></ul>',
          status: 'completed',
          keywords: ['React', 'Node.js', 'WebSocket', 'MongoDB'],
        },
      ],
    },
    education: {
      type: 'education',
      visible: true,
      items: [
        {
          id: 'edu-1',
          institution: 'University of California, Berkeley',
          degree: 'M.S. Computer Science',
          startDate: '2015-09',
          endDate: '2017-05',
          gpa: '3.92',
          current: false,
          status: 'graduated',
          location: 'Berkeley, CA',
          keywords: [
            'Distributed Systems',
            'Machine Learning',
            'Cloud Computing',
          ],
        },
        {
          id: 'edu-2',
          institution: 'Georgia Institute of Technology',
          degree: 'B.S. Computer Science',
          startDate: '2011-09',
          endDate: '2015-05',
          gpa: '3.85',
          current: false,
          status: 'graduated',
          location: 'Atlanta, GA',
          keywords: ['Algorithms', 'Software Engineering', 'Data Structures'],
        },
      ],
    },
    skills: {
      type: 'skills',
      visible: true,
      items: [
        {
          id: 'skill-1',
          name: 'Cloud & Infrastructure',
          level: 'expert',
          keywords: [
            'AWS',
            'Kubernetes',
            'Docker',
            'Terraform',
            'CI/CD',
            'Microservices',
          ],
        },
        {
          id: 'skill-2',
          name: 'Backend Development',
          level: 'expert',
          keywords: [
            'Java',
            'Python',
            'Node.js',
            'Spring Boot',
            'GraphQL',
            'REST',
          ],
        },
        {
          id: 'skill-3',
          name: 'Data Engineering',
          level: 'advanced',
          keywords: [
            'Kafka',
            'Elasticsearch',
            'Redis',
            'PostgreSQL',
            'MongoDB',
          ],
        },
        {
          id: 'skill-4',
          name: 'Frontend Development',
          level: 'intermediate',
          keywords: ['React', 'TypeScript', 'Redux', 'Webpack', 'CSS3'],
        },
      ],
    },
    projects: {
      type: 'projects',
      visible: true,
      items: [
        {
          id: 'proj-1',
          name: 'Distributed Task Scheduler',
          description:
            '<ul><li>Built a <strong>highly available task scheduling system</strong> handling <em>100K+ concurrent jobs</em></li><li>Implemented distributed locking mechanism using <strong>Redis</strong> for synchronization</li><li>Deployed on <u>Kubernetes</u> cluster ensuring high availability and fault tolerance</li><li>Achieved 99.99% system uptime with automatic failover capabilities</li></ul>',
          url: 'https://github.com/alexchen-dev/task-scheduler',
          links: [
            {
              id: 'proj-1-link-1',
              label: 'GitHub',
              url: 'https://github.com/alexchen-dev/task-scheduler',
              icon: 'github',
              iconVariant: 'fontawesome',
            },
            {
              id: 'proj-1-link-2',
              label: 'Demo',
              url: 'https://task-scheduler.alexchen.dev',
              icon: 'globe',
              iconVariant: 'fontawesome',
            },
          ],
          status: 'active',
          current: true,
          keywords: ['Go', 'Kubernetes', 'Redis', 'gRPC'],
        },
        {
          id: 'proj-2',
          name: 'Real-time Analytics Platform',
          description:
            '<ul><li>Architected and implemented <strong>real-time analytics engine</strong> processing <em>1M+ events/minute</em></li><li>Optimized data pipeline using <strong>Apache Kafka</strong> and <strong>Elasticsearch</strong> achieving <u>99.9% uptime</u></li><li>Developed custom monitoring dashboard with <em>real-time metrics visualization</em></li><li>Implemented fault-tolerant data processing with automatic failover mechanisms</li></ul>',
          url: 'https://github.com/alexchen-dev/analytics-platform',
          links: [],
          status: 'completed',
          current: false,
          keywords: ['Kafka', 'Elasticsearch', 'Spring Boot', 'React'],
        },
      ],
    },
    certifications: {
      type: 'certifications',
      visible: true,
      items: [
        {
          id: 'cert-1',
          name: 'AWS Solutions Architect Professional',
          authority: 'Amazon Web Services',
          certificationUrlOrCode: 'AWS-SAP-123456',
          description:
            'Advanced certification for designing distributed systems on AWS.',
          date: '2023-03-15',
          keywords: ['AWS', 'Cloud Architecture'],
        },
        {
          id: 'cert-2',
          name: 'Certified Kubernetes Administrator',
          authority: 'Cloud Native Computing Foundation',
          certificationUrlOrCode: 'CKA-2023-789012',
          description:
            'Expert-level certification in Kubernetes administration.',
          date: '2022-11-30',
          keywords: ['Kubernetes', 'Container Orchestration'],
        },
        {
          id: 'cert-3',
          name: 'Google Professional Cloud Architect',
          authority: 'Google Cloud',
          certificationUrlOrCode: 'GCP-PCA-345678',
          description:
            'Professional certification for Google Cloud architecture.',
          date: '2022-06-20',
          keywords: ['Google Cloud', 'Cloud Architecture'],
        },
      ],
    },
    customSections: [
      {
        type: 'publications',
        visible: true,
        items: [
          {
            id: 'pub-1',
            title: 'Scalable Microservices Architecture Patterns',
            publisher: 'ACM Digital Library',
            date: '2023-04',
            url: 'https://acm.org/publications/scalable-microservices',
          },
          {
            id: 'pub-2',
            title: 'Optimizing Kubernetes for High-Performance Computing',
            publisher: 'IEEE Cloud Computing',
            date: '2022-08',
            url: 'https://ieee.org/publications/k8s-optimization',
          },
        ],
      },
      {
        type: 'awards',
        visible: true,
        items: [
          {
            id: 'award-1',
            title: 'Best Paper Award - Cloud Computing Conference 2023',
            issuer: 'IEEE Cloud Computing',
            date: '2023-06',
            url: 'https://cloudconf.org/awards/2023',
          },
        ],
      },
    ],
  },
};
