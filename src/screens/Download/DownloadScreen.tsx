import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useResumeStore} from '../../store/useResumeStore';
import {FONTS} from '../../constants';
import {createAndSavePDF, generatePDF} from '../../utils/pdfUtils';
import {getProfessionalResumeHTML} from '../../templates';
import {navigate} from '../../utils/navigation';
import Pdf from 'react-native-pdf';

export const DownloadScreen = () => {
  const resumeData = useResumeStore();
  const [pdfBase64, setPdfBase64] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [downloadStarted, setDownloadStarted] = useState(false);

  useEffect(() => {
    if (resumeData) {
      setIsLoading(true);
      generatePDF(getProfessionalResumeHTML(resumeData, 1))
        .then(base64 => {
          if (base64) {
            setPdfBase64(base64);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [resumeData]);

  const handleDownload = async () => {
    if (!resumeData) return;

    setDownloadStarted(true);
    try {
      await createAndSavePDF(getProfessionalResumeHTML(resumeData, 1));
      Alert.alert('Success', 'Resume saved successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to save resume. Please try again.');
    } finally {
      setDownloadStarted(false);
    }
  };

  const handleShare = () => {
    Alert.alert('Coming Soon', 'Share functionality will be available soon!');
  };

  const handleEmail = () => {
    Alert.alert('Coming Soon', 'Email functionality will be available soon!');
  };

  if (!resumeData) {
    return (
      <View style={styles.emptyContainer}>
        <Icon name="file-document-outline" size={80} color="#CCCCCC" />
        <Text style={styles.emptyText}>No resume data available</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Resume</Text>
        <Text style={styles.subtitle}>
          Download, share or email your professional resume
        </Text>
      </View>

      <View style={styles.previewContainer}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingText}>Generating preview...</Text>
          </View>
        ) : pdfBase64 ? (
          <Pdf
            source={{uri: `data:application/pdf;base64,${pdfBase64}`}}
            style={styles.pdfView}
            onError={error => console.log('PDF Error:', error)}
          />
        ) : (
          <View style={styles.errorContainer}>
            <Icon name="alert-circle-outline" size={60} color="#FF3B30" />
            <Text style={styles.errorText}>Failed to generate preview</Text>
          </View>
        )}
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={[
            styles.actionButton,
            styles.downloadButton,
            downloadStarted && styles.disabledButton,
          ]}
          onPress={handleDownload}
          disabled={downloadStarted || isLoading}>
          <Icon name="download" size={24} color="white" />
          <Text style={styles.actionButtonText}>
            {downloadStarted ? 'Downloading...' : 'Download PDF'}
          </Text>
        </TouchableOpacity>

        <View style={styles.secondaryActionsRow}>
          <TouchableOpacity
            style={[styles.actionButton, styles.shareButton]}
            onPress={handleShare}>
            <Icon name="share-variant" size={24} color="white" />
            <Text style={styles.actionButtonText}>Share</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.emailButton]}
            onPress={handleEmail}>
            <Icon name="email-outline" size={24} color="white" />
            <Text style={styles.actionButtonText}>Email</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={styles.viewDownloadsButton}
        onPress={() => navigate('DownloadedResumes')}>
        <Icon name="folder-open-outline" size={20} color="white" />
        <Text style={styles.viewDownloadsText}>View Downloaded Resumes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    fontFamily: FONTS.FIRA_SANS.BOLD,
    color: '#333333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    color: '#666666',
  },
  previewContainer: {
    flex: 1,
    margin: 16,
    minHeight: 400,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    overflow: 'hidden',
  },
  pdfView: {
    flex: 1,
    backgroundColor: 'white',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    color: '#666666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    marginTop: 12,
    fontSize: 16,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    color: '#666666',
  },
  actionsContainer: {
    padding: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionButtonText: {
    marginLeft: 10,
    fontSize: 16,
    fontFamily: FONTS.FIRA_SANS.BOLD,
    color: 'white',
  },
  downloadButton: {
    backgroundColor: '#007AFF',
    marginBottom: 12,
  },
  secondaryActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  shareButton: {
    flex: 1,
    backgroundColor: '#5856D6',
  },
  emailButton: {
    flex: 1,
    backgroundColor: '#34C759',
  },
  viewDownloadsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF9500',
    marginHorizontal: 16,
    marginBottom: 30,
    paddingVertical: 14,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  viewDownloadsText: {
    marginLeft: 10,
    fontSize: 16,
    fontFamily: FONTS.FIRA_SANS.BOLD,
    color: 'white',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 18,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    color: '#666666',
    textAlign: 'center',
  },
  disabledButton: {
    opacity: 0.7,
  },
});
