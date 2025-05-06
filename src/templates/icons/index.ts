import {
  dribble,
  facebookIcon,
  getExternalLinkIcon,
  githubIcon,
  gitlabIcon,
  instagramIcon,
  linkedinIcon,
  stackoverflowIcon,
  twitterIcon,
  youtubeIcon,
} from './icons';

export const socialIcons: Record<string, (props: any) => string> = {
  linkedin: linkedinIcon,
  github: githubIcon,
  gitlab: gitlabIcon,
  stackoverflow: stackoverflowIcon,
  dribble: dribble,
  twitter: twitterIcon,
  facebook: facebookIcon,
  instagram: instagramIcon,
  youtube: youtubeIcon,
  externalLink: getExternalLinkIcon,
} as const;
export const getAvailableIcons = (): string => {
  return Object.keys(socialIcons)
    .map(key => key)
    .join(', ');
};

export type SocialIconType = keyof typeof socialIcons;

export const getSocialIcon = (iconName: SocialIconType): string => {
  const iconFn = socialIcons[iconName];
  if (!iconFn) {
    console.warn(`Icon not found for: ${iconName}`);
    return getExternalLinkIcon({});
  }
  return iconFn({});
};
