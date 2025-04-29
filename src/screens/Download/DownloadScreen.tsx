import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Alert,
} from 'react-native';
import Pdf from 'react-native-pdf';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from './DownloadScreen.styles';
import {useResumeStore} from '../../store/useResumeStore';
import {getProfessionalResumeHTML} from '../../templates';
import {navigate} from '../../utils/navigation';
import {createAndSavePDF, generatePDF} from '../../utils/pdfUtils';

export const DownloadScreen = () => {
  const {resumes, activeResumeId} = useResumeStore();
  const activeResume = resumes.find(
    resume => resume.metadata.id === activeResumeId,
  );
  const [pdfBase64, setPdfBase64] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [downloadStarted, setDownloadStarted] = useState(false);

  useEffect(() => {
    if (activeResume) {
      setIsLoading(true);
      generatePDF(getProfessionalResumeHTML(activeResume))
        .then(base64 => {
          if (base64) {
            setPdfBase64(base64);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [activeResume]);

  const handleDownload = async () => {
    if (!activeResume) {
      return;
    }

    setDownloadStarted(true);
    try {
      await createAndSavePDF(getProfessionalResumeHTML(activeResume));
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

  if (!activeResume) {
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
