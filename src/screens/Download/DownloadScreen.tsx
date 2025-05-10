import {useResumeStore} from '@/store/useResumeStore';
import {globalStyles} from '@/styles/globalStyles';
import {getTemplateById} from '@/templates';
import {COLORS, SPACING} from '@/theme';
import {getResumeFileName} from '@/utils/fileUtils';
import {createAndSavePDF} from '@/utils/pdfUtils';
import * as Sentry from '@sentry/react-native';
import React, {useState} from 'react';
import {
  Alert,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from './DownloadScreen.styles';
export const DownloadScreen = () => {
  const {resumes, activeResumeId} = useResumeStore();
  const activeResume = resumes.find(
    resume => resume.metadata.id === activeResumeId,
  );
  const [downloadStarted, setDownloadStarted] = useState(false);

  const handleDownload = async () => {
    if (!activeResume) {
      return;
    }

    setDownloadStarted(true);
    try {
      const fileName = getResumeFileName(
        activeResume?.basics?.name || 'My Resume',
      );
      const template = getTemplateById(activeResume?.metadata?.templateId);

      await createAndSavePDF(template.getHTML(activeResume), fileName);
      Alert.alert('Success', 'Resume saved successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to save resume. Please try again.');
      console.log('Error saving resume:', error);
      Sentry.captureException(error, {
        tags: {
          component: 'DownloadScreen',
        },
        extra: {
          hasResumeData: Boolean(activeResume),
          templateId: activeResume?.metadata?.templateId,
        },
      });
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
        <StatusBar
          backgroundColor={COLORS.background.primary}
          barStyle="dark-content"
        />
        <Icon
          name="file-document-outline"
          size={80}
          color={COLORS.text.secondary}
        />
        <Text style={styles.emptyText}>No resume data available</Text>
        <Text
          style={[
            styles.subtitle,
            {textAlign: 'center', marginTop: SPACING.sm},
          ]}>
          Please create or select a resume to continue
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <StatusBar
          backgroundColor={COLORS.background.primary}
          barStyle="dark-content"
        />
        <View style={styles.header}>
          <Text style={styles.title}>Your Resume</Text>
          <Text style={styles.subtitle}>
            Ready to showcase your professional resume
          </Text>
        </View>

        <View style={styles.actionsCard}>
          <View style={styles.resumeInfoSection}>
            <Icon
              name="file-document-outline"
              size={40}
              color={COLORS.primary}
            />
            <View style={styles.resumeInfoText}>
              <Text style={styles.resumeName}>
                {activeResume.basics.name || 'My Resume'}
              </Text>
              <Text style={styles.resumeDate}>
                Last updated:{' '}
                {new Date(activeResume.metadata.updatedAt).toLocaleDateString()}
              </Text>
            </View>
          </View>

          <View style={styles.actionIconsContainer}>
            <TouchableOpacity
              style={styles.actionIconButton}
              onPress={handleDownload}
              disabled={downloadStarted}
              activeOpacity={0.7}>
              <View
                style={[styles.iconCircle, {backgroundColor: COLORS.primary}]}>
                <Icon name="download" size={24} color={COLORS.text.light} />
              </View>
              <Text style={styles.iconText}>
                {downloadStarted ? 'Saving...' : 'Save PDF'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionIconButton}
              onPress={handleEmail}
              activeOpacity={0.7}>
              <View
                style={[
                  styles.iconCircle,
                  {backgroundColor: COLORS.secondary},
                ]}>
                <Icon
                  name="email-outline"
                  size={24}
                  color={COLORS.text.light}
                />
              </View>
              <Text style={styles.iconText}>Email</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionIconButton}
              onPress={handleShare}
              activeOpacity={0.7}>
              <View
                style={[styles.iconCircle, {backgroundColor: COLORS.accent}]}>
                <Icon
                  name="share-variant"
                  size={24}
                  color={COLORS.text.light}
                />
              </View>
              <Text style={styles.iconText}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.shareCard}>
          <View style={styles.shareHeaderRow}>
            <Icon name="account-group" size={24} color={COLORS.primary} />
            <Text style={styles.shareTitle}>Share with friends</Text>
          </View>

          <Text style={styles.shareDescription}>
            Help your friends create professional resumes by sharing this app
            with them.
          </Text>

          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity
              style={[styles.socialButton, {backgroundColor: '#3b5998'}]}
              onPress={handleShare}
              activeOpacity={0.7}>
              <Icon name="facebook" size={20} color={COLORS.white} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.socialButton, {backgroundColor: '#1DA1F2'}]}
              onPress={handleShare}
              activeOpacity={0.7}>
              <Icon name="twitter" size={20} color={COLORS.white} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.socialButton, {backgroundColor: '#25D366'}]}
              onPress={handleShare}
              activeOpacity={0.7}>
              <Icon name="whatsapp" size={20} color={COLORS.white} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.socialButton, {backgroundColor: '#0e76a8'}]}
              onPress={handleShare}
              activeOpacity={0.7}>
              <Icon name="linkedin" size={20} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
