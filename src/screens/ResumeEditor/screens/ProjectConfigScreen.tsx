import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import Clipboard from '@react-native-clipboard/clipboard';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {IconButton} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {v4 as uuidv4} from 'uuid';
import {Button, TextInput} from '@/components';
import {CustomIcon} from '@/components/CustomIcon';
import {Header} from '@/components/Header';
import {IconSelector} from '@/components/IconSelector/IconSelector';
import {FONTS} from '@/constants';
import {useResumeStore} from '@/store/useResumeStore';
import {COLORS, SPACING} from '@/theme';
import {LinkItem} from '@/types';

interface ProjectConfigScreenProps {
  route: {
    params: {
      id: string;
    };
  };
  navigation: any;
}

export function ProjectConfigScreen({
  route,
}: Readonly<ProjectConfigScreenProps>) {
  const {id} = route.params;
  const {activeResumeId, resumes, updateProject} = useResumeStore();
  const activeResume = resumes.find(r => r.metadata.id === activeResumeId);

  const project = activeResume?.sections.projects?.items?.find(
    p => p.id === id,
  );
  const projectLinks = project?.links;

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isIconSelectorOpen, setIsIconSelectorOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<{
    index: number;
    link: LinkItem;
  } | null>(null);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['50%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    setIsIconSelectorOpen(index === 0);
  }, []);

  const handleAddLink = () => {
    const newLink: LinkItem = {
      id: uuidv4(),
      label: '',
      url: '',
      icon: 'link',
    };
    updateProject(id, {
      ...project,
      links: [...(projectLinks || []), newLink],
    });
    setExpandedId(newLink.id);
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleUpdateLink = (index: number, updatedLink: LinkItem) => {
    const newLinks = [...(project?.links || [])];
    newLinks[index] = updatedLink;
    updateProject(id, {
      ...project,
      links: newLinks,
    });
  };

  const handleRemoveLink = (index: number) => {
    const newLinks = [...(project?.links || [])];
    newLinks.splice(index, 1);
    updateProject(id, {
      ...project,
      links: newLinks,
    });
  };

  const handleSelectIcon = (icon: string, variant: string) => {
    if (editingLink) {
      handleUpdateLink(editingLink.index, {
        ...editingLink.link,
        icon,
        iconVariant: variant as any,
      });
    }
    setIsIconSelectorOpen(false);
    // setEditingLink(null);
  };

  const openIconSelector = (index: number, link: LinkItem) => {
    setEditingLink({index, link});
    setIsIconSelectorOpen(true);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Header title="Project Links" />
        <ScrollView style={styles.scrollView}>
          <View style={styles.content}>
            {(project?.links || []).map((link, index) => (
              <View key={link.id} style={styles.linkCard}>
                <TouchableOpacity
                  style={styles.linkHeader}
                  onPress={() => toggleExpand(link.id)}>
                  <View style={styles.linkHeaderContent}>
                    <Text style={styles.linkTitle}>
                      {link.label || 'New Link'}
                    </Text>
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
                  <View style={styles.linkHeaderActions}>
                    <IconButton
                      icon="delete"
                      size={20}
                      onPress={() => handleRemoveLink(index)}
                    />
                    <Icon
                      name={
                        expandedId === link.id ? 'expand-less' : 'expand-more'
                      }
                      size={24}
                      color="#666"
                    />
                  </View>
                </TouchableOpacity>

                {expandedId === link.id && (
                  <View style={styles.linkContent}>
                    <TouchableOpacity
                      style={styles.iconSelectorButton}
                      onPress={() => openIconSelector(index, link)}>
                      <CustomIcon
                        variant={link.iconVariant}
                        name={link.icon || 'link'}
                        size={20}
                        color={COLORS.text.secondary}
                      />
                      <Text style={styles.iconSelectorText}>Select Icon</Text>
                    </TouchableOpacity>
                    <TextInput
                      label="Link Label"
                      placeholder="e.g. GitHub Repository, Live Demo"
                      value={link.label}
                      onChangeText={text =>
                        handleUpdateLink(index, {...link, label: text})
                      }
                      style={[styles.input, styles.linkLabelInput]}
                      leftIcon={link.icon || 'link'}
                      iconVariant={link.iconVariant}
                    />
                    <View style={styles.urlInputContainer}>
                      <TextInput
                        label="URL"
                        placeholder="Link URL"
                        value={link.url}
                        onChangeText={text =>
                          handleUpdateLink(index, {...link, url: text})
                        }
                        style={[styles.input, styles.linkUrlInput]}
                        leftIcon={link.icon || 'link'}
                        iconVariant={link.iconVariant}
                      />
                      <View style={styles.urlActions}>
                        <IconButton
                          icon="content-paste"
                          size={20}
                          onPress={async () => {
                            const text = await Clipboard.getString();
                            handleUpdateLink(index, {...link, url: text});
                          }}
                        />
                        <IconButton
                          icon="content-copy"
                          size={20}
                          onPress={() => Clipboard.setString(link.url)}
                        />
                      </View>
                    </View>
                  </View>
                )}
              </View>
            ))}

            <Button
              variant="outline"
              title="Add Link"
              onPress={handleAddLink}
            />
          </View>
        </ScrollView>
        <BottomSheet
          ref={bottomSheetRef}
          index={isIconSelectorOpen ? 0 : -1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          enablePanDownToClose
          backgroundStyle={{
            backgroundColor: COLORS.background.primary,
          }}
          handleIndicatorStyle={{
            backgroundColor: COLORS.border,
            width: 40,
            height: 4,
          }}
          handleStyle={{
            backgroundColor: COLORS.background.primary,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            paddingVertical: 10,
          }}
          style={styles.bottomSheet}>
          <BottomSheetView style={styles.bottomSheetContent}>
            <IconSelector
              onSelect={handleSelectIcon}
              onClose={() => setIsIconSelectorOpen(false)}
            />
          </BottomSheetView>
        </BottomSheet>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
  bottomSheet: {
    flex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  bottomSheetContent: {
    flex: 1,
    backgroundColor: COLORS.background.secondary,
    paddingBottom: 46,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  linkCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  linkHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  linkHeaderContent: {
    flex: 1,
  },
  linkTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  linkUrlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  linkUrl: {
    fontSize: 14,
    color: '#666',
  },
  linkHeaderActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkContent: {
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  input: {
    marginBottom: 12,
  },
  linkLabelInput: {
    backgroundColor: '#F8F8F8',
  },
  linkUrlInput: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  iconSelectorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  iconSelectorText: {
    marginLeft: 8,
    fontSize: 14,
    color: COLORS.text.secondary,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
  },
  urlInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  urlActions: {
    flexDirection: 'row',
    marginLeft: 8,
  },
  //     fontWeight: 'bold',
  //     color: '#333',
  //     marginBottom: 16,
  //   },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  iconSelector: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkInputs: {
    flex: 1,
    gap: 8,
  },
  linkInput: {
    marginBottom: 0,
  },
  removeButton: {
    padding: 8,
  },
  addButton: {
    marginTop: 8,
  },
  saveButton: {
    marginTop: 24,
    backgroundColor: COLORS.primary,
  },
});
