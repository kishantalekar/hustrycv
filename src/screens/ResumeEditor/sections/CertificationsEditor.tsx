import React, {useState} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Button} from '@/components';
import {TextInput} from '@/components/TextInput';
import {FONTS} from '@/constants';
import {useResumeStore} from '@/store/useResumeStore';
import {globalStyles} from '@/styles/globalStyles';

export const CertificationsEditor = () => {
  const {
    getActiveResume,
    addCertification,
    removeCertification,
    updateCertification,
  } = useResumeStore();
  const certifications = getActiveResume().sections.certifications;
  const [expandedItemId, setExpandedItemId] = useState<string>('');

  const toggleExpand = (id: string) => {
    setExpandedItemId(prev => (prev === id ? '' : id));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={globalStyles.keyboardAvoidingView}>
      <ScrollView style={styles.container}>
        <View style={styles.section}>
          {certifications?.items.map(cert => (
            <View key={cert.id} style={styles.certificationCard}>
              <TouchableOpacity
                style={styles.cardHeader}
                onPress={() => toggleExpand(cert.id)}>
                <View>
                  <Text style={styles.certificationName}>
                    {cert.name || 'New Certification'}
                  </Text>
                </View>
                <Icon
                  name={
                    expandedItemId === cert.id ? 'expand-less' : 'expand-more'
                  }
                  size={24}
                  color="#666"
                />
              </TouchableOpacity>
              {expandedItemId === cert.id && (
                <View style={styles.cardContent}>
                  <TextInput
                    label="Certification Name"
                    placeholder="Enter certification name"
                    value={cert.name}
                    onChangeText={text =>
                      updateCertification(cert.id, {...cert, name: text})
                    }
                  />
                  <TextInput
                    label="Authority"
                    placeholder="Enter issuing authority"
                    value={cert.authority}
                    onChangeText={text =>
                      updateCertification(cert.id, {...cert, authority: text})
                    }
                  />
                  <TextInput
                    label="Certification URL/Code"
                    placeholder="Enter URL or certification code"
                    value={cert.certificationUrlOrCode}
                    onChangeText={text =>
                      updateCertification(cert.id, {
                        ...cert,
                        certificationUrlOrCode: text,
                      })
                    }
                  />
                  <TextInput
                    label="Description"
                    placeholder="Enter certification description"
                    value={cert.description}
                    onChangeText={text =>
                      updateCertification(cert.id, {...cert, description: text})
                    }
                    multiline
                    style={{height: 80}}
                  />
                  <Button
                    title="Delete"
                    onPress={() => removeCertification(cert.id)}
                    variant="danger"
                  />
                </View>
              )}
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Button
            title="Add New Certification"
            onPress={() => {
              const id = addCertification({
                name: '',
                authority: '',
                certificationUrlOrCode: '',
                description: '',
              });
              setExpandedItemId(id);
            }}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: FONTS.FIRA_SANS.BOLD,
    marginBottom: 16,
    color: '#333333',
  },
  certificationCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 16,
  },
  certificationName: {
    fontSize: 16,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    color: '#333333',
    marginBottom: 4,
  },
  cardContent: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  certificationDetail: {
    fontSize: 14,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    color: '#828282',
    marginBottom: 8,
  },
});
