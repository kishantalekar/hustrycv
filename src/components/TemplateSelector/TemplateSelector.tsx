import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {FONTS} from '@/constants';
import {SPACING, TYPOGRAPHY, COLORS, BORDER_RADIUS, SHADOW} from '@/theme';

type Template = {
  id: string;
  name: string;
  image: any;
  getHTML: (data: any) => string;
};

type TemplateSelectorProps = {
  selectedTemplate: string;
  onSelectTemplate: (templateId: string) => void;
  templates: Template[];
};

export const TemplateSelector = ({
  selectedTemplate,
  onSelectTemplate,
  templates,
}: TemplateSelectorProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Template</Text>
      <View style={styles.templatesContainer}>
        {templates.map(template => (
          <TouchableOpacity
            key={template.id}
            style={[
              styles.templateItem,
              selectedTemplate === template.id && styles.selectedTemplate,
            ]}
            onPress={() => onSelectTemplate(template.id)}>
            <Image source={template.image} style={styles.templateImage} />
            <Text style={styles.templateName}>{template.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.md,
  },
  title: {
    fontSize: TYPOGRAPHY.size.lg,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    color: COLORS.text.primary,
    marginBottom: SPACING.md,
  },
  templatesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  templateItem: {
    width: '30%',
    marginBottom: SPACING.md,
    alignItems: 'center',
    padding: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.background.secondary,
    ...SHADOW.light,
  },
  selectedTemplate: {
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  templateImage: {
    width: '100%',
    height: 120,
    borderRadius: BORDER_RADIUS.sm,
    marginBottom: SPACING.xs,
  },
  templateName: {
    fontSize: TYPOGRAPHY.size.sm,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    color: COLORS.text.primary,
    textAlign: 'center',
  },
});
