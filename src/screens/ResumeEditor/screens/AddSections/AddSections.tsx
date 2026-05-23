import {posthog} from '@/analytics/posthog/PostHog';
import {Header} from '@/components/Header';
import {useResumeStore} from '@/store/useResumeStore';
import {globalStyles} from '@/styles';
import {COLORS, SPACING} from '@/theme';
import {navigate} from '@/utils/navigation';
import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FormItem} from '../../components/FormItem/FormItem';
import {sections} from '../FormScreen/FormScreen';

export const AddSections = () => {
  const {getActiveResume, updateMetadata} = useResumeStore();
  const activeResume = getActiveResume();
  const resumeSections = activeResume?.metadata.sectionOrder;

  const sectionOrder = sections.filter(section => {
    return !resumeSections?.includes(section.id);
  });

  const handlePress = item => {
    if (resumeSections?.includes(item.id)) return;
    if (resumeSections) {
      updateMetadata({
        sectionOrder: [...resumeSections, item.id],
      });
    } else {
      updateMetadata({
        sectionOrder: [item.id],
      });
    }
    posthog.capture('added_section', {
      section: item.id,
    });
    navigate(item.screenName);
  };
  return (
    <SafeAreaView style={globalStyles.keyboardAvoidingView}>
      <Header title="Add Sections" />
      <View style={styles.container}>
        <FlatList
          data={sectionOrder}
          renderItem={({item}) => (
            <FormItem
              item={item}
              isActive={false}
              onPress={() => handlePress(item)}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
    padding: SPACING.md,
    gap: SPACING.lg,
  },
});
