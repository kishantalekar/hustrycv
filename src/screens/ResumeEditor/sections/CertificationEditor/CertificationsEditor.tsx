import React, {useState} from 'react';
import {View, ScrollView, KeyboardAvoidingView, Platform} from 'react-native';
import {Button} from '@/components';
import {useResumeStore} from '@/store/useResumeStore';
import {globalStyles} from '@/styles/globalStyles';
import {styles} from './CertificationEditor.styles';
import {CertificationCard} from './components/CertificationCard';

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
            <CertificationCard
              key={cert.id}
              cert={cert}
              toggleExpand={toggleExpand}
              expandedItemId={expandedItemId}
              updateCertification={updateCertification}
              removeCertification={removeCertification}
            />
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
                date: '',
              });
              setExpandedItemId(id);
            }}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
