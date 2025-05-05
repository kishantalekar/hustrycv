import {
  linkedinIcon,
  githubIcon,
  gitlabIcon,
  dribble,
  twitterIcon,
  facebookIcon,
  instagramIcon,
  youtubeIcon,
  getExternalLinkIcon,
  stackoverflowIcon,
} from "./icons";

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

export type SocialIconType = keyof typeof socialIcons;

export const getSocialIcon = (iconName: SocialIconType): string => {
  return socialIcons["github"]({ size: 18 });
};
