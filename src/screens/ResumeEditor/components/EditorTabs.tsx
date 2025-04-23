import React from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {FONTS} from '../../../constants/fonts';

const tabs = [
  {id: 'personal', label: 'Personal'},
  {id: 'summary', label: 'Summary'},
  {id: 'experience', label: 'Experience'},
  {id: 'education', label: 'Education'},
  {id: 'skills', label: 'Skills'},
];

interface EditorTabsProps {
  activeTab: string;
  onTabChange: (tab: any) => void;
}

export const EditorTabs = ({activeTab, onTabChange}: EditorTabsProps) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.container}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab.id}
            onPress={() => onTabChange(tab.id)}
            style={[styles.tab, activeTab === tab.id && styles.activeTab]}>
            <Text
              style={[
                styles.tabText,
                activeTab === tab.id && styles.activeTabText,
              ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingVertical: 8,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginHorizontal: 4,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#007AFF',
  },
  tabText: {
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: 'white',
    fontFamily: FONTS.FIRA_SANS.BOLD,
  },
});
