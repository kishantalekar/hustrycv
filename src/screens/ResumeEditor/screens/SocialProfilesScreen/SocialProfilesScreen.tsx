import {Button} from '@/components';
import {Header} from '@/components/Header';
import {TextInput} from '@/components/TextInput';
import {useResumeStore} from '@/store/useResumeStore';
import {SocialLink} from '@/types/common/social.types';
import Clipboard from '@react-native-clipboard/clipboard';
import React, {useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {IconButton, Text} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {v4 as uuidv4} from 'uuid';

export const SocialProfilesScreen = () => {
  const {getActiveResume, updateBasics} = useResumeStore();
  const basics = getActiveResume().basics;
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const socials = basics.socials || [];

  const handleUpdateSocial = (
    index: number,
    field: keyof SocialLink,
    value: string,
  ) => {
    const updatedSocials = [...socials];
    updatedSocials[index] = {...updatedSocials[index], [field]: value};
    updateBasics({socials: updatedSocials});
  };

  const handleDeleteSocial = (id: string) => {
    const updatedSocials = socials.filter(s => s.id !== id);
    updateBasics({socials: updatedSocials});
  };

  const handleAddSocial = () => {
    const newSocial: SocialLink = {
      id: uuidv4(),
      type: '',
      url: '',
    };
    updateBasics({socials: [...socials, newSocial]});
    setExpandedId(newSocial.id);
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Social Profiles" />
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          {socials.map((social, index) => (
            <View key={social.id} style={styles.socialCard}>
              <TouchableOpacity
                style={styles.socialHeader}
                onPress={() => toggleExpand(social.id)}>
                <View style={styles.socialHeaderContent}>
                  <Text style={styles.socialTitle}>
                    {social.type || 'New Profile'}
                  </Text>
                  <Text style={styles.socialUrl} numberOfLines={1}>
                    {social.url || 'No URL added'}
                  </Text>
                </View>
                <View style={styles.socialHeaderActions}>
                  <IconButton
                    icon="delete"
                    size={20}
                    onPress={() => handleDeleteSocial(social.id)}
                  />
                  <Icon
                    name={
                      expandedId === social.id ? 'expand-less' : 'expand-more'
                    }
                    size={24}
                    color="#666"
                  />
                </View>
              </TouchableOpacity>

              {expandedId === social.id && (
                <View style={styles.socialContent}>
                  <TextInput
                    label="Platform Name"
                    placeholder="e.g. LinkedIn, GitHub, Portfolio"
                    value={social.type}
                    onChangeText={text =>
                      handleUpdateSocial(index, 'type', text)
                    }
                    style={[styles.input, styles.socialTypeInput]}
                    leftIcon="link"
                  />
                  <View style={styles.urlInputContainer}>
                    <TextInput
                      label="URL"
                      placeholder="Profile URL"
                      value={social.url}
                      onChangeText={text =>
                        handleUpdateSocial(index, 'url', text)
                      }
                      style={[styles.input, styles.socialUrlInput]}
                      leftIcon="link"
                    />
                    <View style={styles.urlActions}>
                      <IconButton
                        icon="content-paste"
                        size={20}
                        onPress={async () => {
                          const text = await Clipboard.getString();
                          handleUpdateSocial(index, 'url', text);
                        }}
                      />
                      <IconButton
                        icon="content-copy"
                        size={20}
                        onPress={() => Clipboard.setString(social.url)}
                      />
                    </View>
                  </View>
                </View>
              )}
            </View>
          ))}

          <Button
            variant="outline"
            title="Add Social Link"
            onPress={handleAddSocial}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  header: {
    marginBottom: 16,
  },
  subsectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  summary: {
    fontSize: 14,
    color: '#666',
  },
  socialCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  socialHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  socialHeaderContent: {
    flex: 1,
  },
  socialTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  socialUrl: {
    fontSize: 14,
    color: '#666',
  },
  socialHeaderActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  socialContent: {
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  input: {
    marginBottom: 12,
  },
  socialTypeInput: {
    backgroundColor: '#F8F8F8',
  },
  socialUrlInput: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  urlInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  urlActions: {
    flexDirection: 'row',
    marginLeft: 8,
  },
});
