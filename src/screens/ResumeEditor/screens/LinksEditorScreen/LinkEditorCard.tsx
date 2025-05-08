import {
  CollapsibleCard,
  TextInput,
  Typography,
  TypographyVariant,
} from '@/components';
import {CustomIcon} from '@/components/CustomIcon';
import {COLORS} from '@/theme';
import {LinkItem} from '@/types';
import Clipboard from '@react-native-clipboard/clipboard';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import {styles} from './LinksEditorScreen.styles';

interface LinkEditorCardProps {
  link: LinkItem;
  index: number;
  expanded: boolean;
  toggleExpand: (id: string) => void;
  handleRemoveLink: (index: number) => void;
  handleUpdateLink: (index: number, link: any) => void;
  openIconSelector: (index: number, link: any) => void;
}
export function LinkEditorCard({
  link,
  index,
  expanded,
  toggleExpand,
  handleRemoveLink,
  handleUpdateLink,
  openIconSelector,
}: Readonly<LinkEditorCardProps>) {
  const header = (
    <View style={styles.linkHeaderContent}>
      <Text style={styles.linkTitle}>{link.label || 'New Link'}</Text>
      <View style={styles.linkUrlRow}>
        <CustomIcon
          variant={link.iconVariant}
          name={link.icon}
          size={14}
          color={'grey'}
        />
        <Text style={styles.linkUrl} numberOfLines={1}>
          {link.url || 'No URL added'}
        </Text>
      </View>
    </View>
  );
  return (
    <CollapsibleCard
      expanded={expanded}
      onToggle={() => toggleExpand(link.id)}
      header={header}
      handleDelete={() => handleRemoveLink(index)}>
      <View>
        <TextInput
          label="Link Label"
          placeholder="e.g. GitHub Repository, Live Demo"
          value={link.label}
          onChangeText={text => handleUpdateLink(index, {...link, label: text})}
          style={[styles.input, styles.linkLabelInput]}
          // leftIcon={'link'}
          // iconVariant={link.iconVariant}
        />
        <TouchableOpacity
          style={styles.iconSelectorButton}
          onPress={() => openIconSelector(index, link)}>
          <CustomIcon
            variant={link.iconVariant}
            name={link.icon}
            size={20}
            color={COLORS.text.secondary}
          />
          <Text style={styles.iconSelectorText}>Change Icon</Text>
        </TouchableOpacity>
        <View style={styles.urlInputContainer}>
          <TextInput
            label="URL"
            placeholder="Link URL"
            value={link.url}
            onChangeText={text => handleUpdateLink(index, {...link, url: text})}
            style={[styles.input, styles.linkUrlInput]}
            leftIcon={link.icon || 'link'}
            iconVariant={link.iconVariant}
          />

          <View style={styles.urlActions}>
            <View style={styles.urlActionButton}>
              <IconButton
                icon="content-paste"
                size={20}
                onPress={async () => {
                  const text = await Clipboard.getString();
                  handleUpdateLink(index, {...link, url: text});
                }}
              />
              <Typography
                variant={TypographyVariant.TitleSmall}
                color={COLORS.text.secondary}>
                Paste
              </Typography>
            </View>
            <View style={styles.urlActionButton}>
              <IconButton
                icon="content-copy"
                size={20}
                onPress={() => Clipboard.setString(link.url)}
              />
              <Typography
                variant={TypographyVariant.TitleSmall}
                color={COLORS.text.secondary}>
                Copy
              </Typography>
            </View>
          </View>
        </View>
      </View>
    </CollapsibleCard>
  );
}
