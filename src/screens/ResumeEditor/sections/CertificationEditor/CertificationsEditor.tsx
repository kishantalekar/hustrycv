import {Button, TipsCard, TipSets} from '@/components';
import {Header} from '@/components/Header';
import {REORDER_TIPS_SHOWN, SWIPE_TIPS_SHOWN} from '@/constants';
import {useResumeStore} from '@/store/useResumeStore';
import {globalStyles} from '@/styles/globalStyles';
import {COLORS} from '@/theme';
import React, {useState} from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, View} from 'react-native';
import {
  NestableDraggableFlatList,
  NestableScrollContainer,
} from 'react-native-draggable-flatlist';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {styles} from './CertificationEditor.styles';
import {CertificationCard} from './components/CertificationCard';

export const CertificationsEditor = () => {
  const {
    getActiveResume,
    addCertification,
    removeCertification,
    updateCertification,
    updateAllCertifications,
  } = useResumeStore();
  const certifications = getActiveResume().sections.certifications;
  const [expandedItemId, setExpandedItemId] = useState<string>('');
  const [isDraggableListVisible, setIsDraggableListVisible] = useState(false);

  const handleDragIconPress = () => {
    setExpandedItemId('');
    setIsDraggableListVisible(!isDraggableListVisible);
  };
  const toggleExpand = (id: string) => {
    setExpandedItemId(prev => (prev === id ? '' : id));
  };

  return (
    <SafeAreaView style={globalStyles.keyboardAvoidingView}>
      <GestureHandlerRootView>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={globalStyles.keyboardAvoidingView}>
          <Header
            title="Education"
            rightComponent={
              <Icon
                name="drag-indicator"
                size={24}
                color={isDraggableListVisible ? COLORS.primary : undefined}
              />
            }
            onRightPress={handleDragIconPress}
          />
          <ScrollView style={styles.container}>
            {certifications?.items.length > 0 && (
              <TipsCard
                tips={TipSets.swipe}
                variant="default"
                dismissible={true}
                showOnce={true}
                storageKey={SWIPE_TIPS_SHOWN}
                animationType="fade"
              />
            )}
            {certifications?.items.length > 2 && (
              <TipsCard
                tips={TipSets.reorder}
                variant="default"
                dismissible={true}
                showOnce={true}
                storageKey={REORDER_TIPS_SHOWN}
                animationType="fade"
              />
            )}
            <NestableScrollContainer>
              <NestableDraggableFlatList
                data={certifications?.items || []}
                keyExtractor={item => item.id}
                renderItem={({item, drag}) => (
                  <View style={styles.section}>
                    <CertificationCard
                      key={item.id}
                      cert={item}
                      toggleExpand={toggleExpand}
                      expandedItemId={expandedItemId}
                      updateCertification={updateCertification}
                      removeCertification={removeCertification}
                      isDraggableListVisible={isDraggableListVisible}
                      drag={drag}
                    />
                  </View>
                )}
                onDragEnd={({data}) => {
                  updateAllCertifications(data);
                }}
              />
            </NestableScrollContainer>

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
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};
