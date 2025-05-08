import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import {SvgIcon} from '../SvgIcon/SvgIcon';
import {CustomIconProps} from './CustomIcon.types';

// Import SVG icons
import DribbleIcon from '@/assets/icons/dribble.svg';
import ExternalLinkIcon from '@/assets/icons/externalLink.svg';
import FacebookIcon from '@/assets/icons/facebook.svg';
import GithubIcon from '@/assets/icons/github.svg';
import GitlabIcon from '@/assets/icons/gitlab.svg';
import InstagramIcon from '@/assets/icons/instagram.svg';
import StackoverflowIcon from '@/assets/icons/stackoverflow.svg';
import TwitterIcon from '@/assets/icons/twitter.svg';
import YoutubeIcon from '@/assets/icons/youtube.svg';

const SVG_ICONS = {
  dribble: DribbleIcon,
  externalLink: ExternalLinkIcon,
  facebook: FacebookIcon,
  github: GithubIcon,
  gitlab: GitlabIcon,
  instagram: InstagramIcon,
  stackoverflow: StackoverflowIcon,
  twitter: TwitterIcon,
  youtube: YoutubeIcon,
};

export const CustomIcon: React.FC<CustomIconProps> = ({
  variant = 'material',
  name,
  size = 24,
  color,
  SvgComponent,
  ...props
}) => {
  if (variant === 'svg') {
    if (SvgComponent) {
      return (
        <SvgIcon size={size} color={color}>
          <SvgComponent />
        </SvgIcon>
      );
    }
    const SelectedSvgIcon = SVG_ICONS[name as keyof typeof SVG_ICONS];
    if (SelectedSvgIcon) {
      return (
        <SvgIcon size={size} color={color}>
          <SelectedSvgIcon />
        </SvgIcon>
      );
    }
  }

  const IconComponent = {
    material: MaterialIcons,
    octicon: Octicons,
    fontawesome: FontAwesome,
    ionicon: Ionicons,
    antdesign: AntDesign,
    ionicons: Ionicons,
    svg: MaterialIcons,
  }[variant];

  return <IconComponent name={name} size={size} color={color} {...props} />;
};
