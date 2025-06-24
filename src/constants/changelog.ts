export interface ChangeLogItem {
  version: string;
  date: string;
  changes: string[];
}

export const CHANGELOG: ChangeLogItem[] = [
  {
    version: '1.1.8',
    date: '2025-06-25',
    changes: [
      'Added 20+ resume templates',
      'Added Hobbies section',
      'Added Strengths section',
      'Added References section',
    ],
  },
];
