import React, {useEffect, useState} from 'react';
import {View, ScrollView, Text, StyleSheet} from 'react-native';
import {FONTS} from '../../constants';
import {COLORS, SPACING, BORDER_RADIUS, SHADOW, TYPOGRAPHY} from '../../theme';
import {generatePDF} from '../../utils/pdfUtils';
import {ResumePreviewProps} from './ResumePreview.types';
import Pdf from 'react-native-pdf';

export default function ResumePreview({
  resumeData,
  style,
  selectedTemplate,
  templates,
}: Readonly<ResumePreviewProps>) {
  const [pdfBase64, setPdfBase64] = useState<string | null>(null);

  useEffect(() => {
    if (resumeData && templates) {
      const selectedTemplateData = templates.find(
        t => t.id === selectedTemplate,
      );
      if (selectedTemplateData) {
        generatePDF(selectedTemplateData.getHTML(resumeData)).then(base64 => {
          if (base64) {
            return setPdfBase64(base64);
          }
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTemplate, resumeData]);

  if (!resumeData) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No resume data available</Text>
      </View>
    );
  }
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      {pdfBase64 && (
        <Pdf
          source={{uri: `data:application/pdf;base64,${pdfBase64}`}}
          style={styles.pdfView}
          spacing={SPACING.lg}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
  contentContainer: {
    padding: SPACING.container,
    justifyContent: 'flex-start',
    minHeight: 'auto',
    height: '100%',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background.primary,
  },
  emptyText: {
    fontSize: TYPOGRAPHY.size.md,
    color: COLORS.text.secondary,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
  },
  exportButton: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.md,
    marginTop: SPACING.lg,
    ...SHADOW.light,
  },
  exportButtonText: {
    color: COLORS.text.light,
    fontSize: TYPOGRAPHY.size.md,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
  },

  pdfView: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
});
