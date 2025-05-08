import {CustomIcon, IconVariant, SvgIcon, TextInput} from '@/components';
import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
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

interface IconSelectorProps {
  onSelect: (icon: string, iconVariant: IconVariant) => void;
  onClose: () => void;
}

interface IconItem {
  name: string;
}

const allIcons: IconItem[] = Object.keys(SVG_ICONS).map(name => ({
  name,
}));

export function IconSelector({onSelect, onClose}: Readonly<IconSelectorProps>) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredIcons = allIcons.filter(icon => {
    return icon.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const renderIcon = (item: IconItem) => {
    const IconComponent = SVG_ICONS[item.name as keyof typeof SVG_ICONS];
    return IconComponent ? (
      <SvgIcon size={24} color="#666">
        <IconComponent />
      </SvgIcon>
    ) : null;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Select Icon</Text>
        <TouchableOpacity onPress={onClose}>
          <CustomIcon variant="material" name="close" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      <TextInput
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search icons..."
        leftIcon="search"
        style={styles.searchInput}
      />

      <FlatList
        // eslint-disable-next-line react-native/no-inline-styles
        contentContainerStyle={{flexGrow: 1}}
        data={filteredIcons}
        numColumns={5}
        keyExtractor={item => item.name}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => {
              console.log('icon selected', item.name);
              onSelect(item.name, 'svg');
            }}>
            {renderIcon(item)}
            {/* <Text style={styles.iconName}>{item.name}</Text> */}
          </TouchableOpacity>
        )}
        style={styles.iconGrid}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    maxHeight: '80%',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  searchInput: {
    marginBottom: 16,
  },
  iconGrid: {
    flex: 1,
  },
  iconButton: {
    flex: 1,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
  },
  iconName: {
    fontSize: 12,
    color: '#666',
    // marginTop: 4,
    textAlign: 'center',
  },
});
