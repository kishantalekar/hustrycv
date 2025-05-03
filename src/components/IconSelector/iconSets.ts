// Common icon sets used across the application

import {IconVariant} from '../CustomIcon';

export interface IconSet {
  variant: IconVariant;
  icons: string[];
}

export const iconSets: IconSet[] = [
  {
    variant: 'material',
    icons: [
      'add',
      'arrow-back',
      'arrow-forward',
      'check',
      'close',
      'delete',
      'edit',
      'email',
      'error',
      'home',
      'info',
      'link',
      'location-on',
      'menu',
      'more-vert',
      'person',
      'phone',
      'photo',
      'search',
      'settings',
      'share',
      'star',
      'warning',
      'work',
      'check-box',
      'check-box-outline-blank',
    ],
  },
  {
    variant: 'fontawesome',
    icons: [
      'github',
      'linkedin',
      'twitter',
      'facebook',
      'instagram',
      'globe',
      'code',
      'graduation-cap',
      'briefcase',
      'certificate',
      'trophy',
      'users',
      'tasks',
      'project-diagram',
      'tools',
      'language',
    ],
  },
  {
    variant: 'ionicons',
    icons: [
      'logo-github',
      'logo-linkedin',
      'logo-twitter',
      'logo-facebook',
      'logo-instagram',
      'globe-outline',
      'code-slash-outline',
      'school-outline',
      'business-outline',
      'ribbon-outline',
      'trophy-outline',
      'people-outline',
      'list-outline',
      'git-network-outline',
      'build-outline',
      'language-outline',
    ],
  },
];
