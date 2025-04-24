import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import {FONTS} from '../../constants';
import {createAndSavePDF, generatePDF} from '../../utils/pdfUtils';
import {navigate} from '../../utils/navigation';
import {ResumePreviewProps} from './ResumePreview.types';
import Document from 'react-native-pdf';
import {getProfessionalResumeHTML} from '../../templates';

export default function ResumePreview({
  resumeData,
  style,
}: Readonly<ResumePreviewProps>) {
  const [pdfBase64, setPdfBase64] = useState<string | null>(null);

  useEffect(() => {
    if (resumeData) {
      generatePDF(getProfessionalResumeHTML(resumeData, 1)).then(base64 => {
        if (base64) {
          return setPdfBase64(base64);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <View style={[styles.previewContainer, style]}>
        {pdfBase64 && (
          <Document
            source={{uri: `data:application/pdf;base64,${pdfBase64}`}}
            style={{flex: 1}}
          />
        )}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() =>
            createAndSavePDF(getProfessionalResumeHTML(resumeData, 1))
          }
          style={styles.exportButton}>
          <Text style={styles.exportButtonText}>{'Download PDF'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigate('DownloadedResumes')}
          style={styles.viewDownloadsButton}>
          <Text style={styles.exportButtonText}>View Downloads</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  contentContainer: {
    padding: 16,
    alignItems: 'center',
    minHeight: '100%',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    fontFamily: FONTS.FIRA_SANS.REGULAR,
  },
  exportButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  exportButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
  },
  previewContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    // overflow: 'hidden',
    height: 842,
    width: '100%',
  },
  webView: {
    flex: 1,
    backgroundColor: 'white',
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  viewDownloadsButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#28A745',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
