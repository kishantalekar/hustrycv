import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import Pdf from 'react-native-pdf';
import {createInitialResume, useResumeStore} from '../../store/useResumeStore';
import {generatePDF} from '../../utils/pdfUtils';
import {getProfessionalResumeHTML} from '../../templates';
import {navigate} from '../../utils/navigation';
import {COLORS, SPACING, BORDER_RADIUS, SHADOW, typography} from '../../theme';

export const Dashboard = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const {setActiveResume, resumes, activeResumeId, addResume} =
    useResumeStore();
  const [pdfPreviews, setPdfPreviews] = useState<Record<string, string | null>>(
    {},
  );
  const [loadingPreviews, setLoadingPreviews] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    // Generate PDF previews for all resumes
    const generatePreviews = async () => {
      const loading = {};
      resumes.forEach(resume => {
        loading[resume.metadata.id] = true;
      });
      setLoadingPreviews(loading);

      const previews = {};
      for (const resume of resumes) {
        try {
          const base64 = await generatePDF(getProfessionalResumeHTML(resume));
          previews[resume.metadata.id] = base64;
        } catch (error) {
          console.error(
            'Error generating preview for resume:',
            resume.metadata.id,
            error,
          );
          previews[resume.metadata.id] = null;
        } finally {
          setLoadingPreviews(prev => ({
            ...prev,
            [resume.metadata.id]: false,
          }));
        }
      }
      setPdfPreviews(previews);
    };

    generatePreviews();
  }, [resumes]);

  const handleResumePress = (resumeId: string) => {
    setActiveResume(resumeId);
    navigation.navigate('ResumeEditor');
  };

  const handleCreateResumePress = () => {
    const newResume = createInitialResume();
    addResume(newResume);
    const id = newResume.metadata.id;
    setActiveResume(id);
    navigate('ResumeEditor');
  };

  const renderResumeItem = ({item}: {item: (typeof resumes)[0]}) => {
    const lastModified = new Date(item.metadata.updatedAt).toLocaleDateString();
    const isLoading = loadingPreviews[item.metadata.id];
    const pdfBase64 = pdfPreviews[item.metadata.id];

    return (
      <TouchableOpacity
        style={styles.resumeCard}
        onPress={() => handleResumePress(item.metadata.id)}>
        <View style={styles.resumePreview}>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color={COLORS.primary} />
              <Text style={styles.loadingText}>Generating preview...</Text>
            </View>
          ) : pdfBase64 ? (
            <Pdf
              source={{uri: `data:application/pdf;base64,${pdfBase64}`}}
              style={styles.pdfView}
              onError={error => console.log('PDF Error:', error)}
              singlePage={true}
              scale={3}
            />
          ) : (
            <Text style={styles.previewText}>Preview not available</Text>
          )}
        </View>
        <View style={styles.resumeInfo}>
          <Text style={styles.resumeName}>
            {item.basics.name || 'Untitled Resume'}
          </Text>
          <Text style={styles.resumeDate}>Last modified: {lastModified}</Text>
          <Text style={styles.resumeTemplate}>
            Template: {item.metadata.templateId}
          </Text>
          {/* <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => {
                setActiveResume(item.metadata.id);
                navigation.navigate('DownloadScreen');
              }}>
              <Text style={styles.actionButtonText}>Download</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.editButton]}
              onPress={() => handleResumePress(item.metadata.id)}>
              <Text style={styles.actionButtonText}>Edit</Text>
            </TouchableOpacity>
          </View> */}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Resumes</Text>
        <TouchableOpacity
          style={styles.createButton}
          onPress={handleCreateResumePress}>
          <Text style={styles.createButtonText}>Create New</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={resumes}
        renderItem={renderResumeItem}
        keyExtractor={item => item.metadata.id}
        contentContainerStyle={styles.resumeList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
    padding: SPACING.lg,
    marginTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  title: {
    ...typography.h1,
  },
  createButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.sm,
  },
  createButtonText: {
    color: COLORS.white,
    ...typography.button,
  },
  resumeList: {
    gap: SPACING.lg,
  },
  resumeCard: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.md,
    overflow: 'hidden',
    ...SHADOW.card,
  },
  resumePreview: {
    height: 100,
    backgroundColor: COLORS.preview,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pdfView: {
    width: '100%',
    height: '100%',
  },
  previewText: {
    color: COLORS.text.secondary,
    ...typography.body1,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: SPACING.sm,
    color: COLORS.text.secondary,
    ...typography.body2,
  },
  resumeInfo: {
    padding: SPACING.md,
  },
  resumeName: {
    fontSize: 18,
    fontFamily: typography.h1.fontFamily,
    marginBottom: SPACING.xs,
  },
  resumeDate: {
    ...typography.body2,
    color: COLORS.text.secondary,
    marginBottom: SPACING.xs,
  },
  resumeTemplate: {
    ...typography.body2,
    color: COLORS.text.secondary,
    marginBottom: SPACING.md,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: SPACING.md,
    marginTop: SPACING.xs,
  },
  actionButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButton: {
    backgroundColor: COLORS.secondary || '#555',
  },
  actionButtonText: {
    color: COLORS.white,
    ...typography.button,
  },
});
