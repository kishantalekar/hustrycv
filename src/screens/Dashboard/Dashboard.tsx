import {
  useNavigation,
  NavigationProp,
  useFocusEffect,
} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import Pdf from 'react-native-pdf';
import {useResumeStore} from '@/store/useResumeStore';
import {getTemplateById} from '@/templates';
import {COLORS} from '@/theme';
import {createInitialResume} from '@/types';
import {navigate} from '@/utils/navigation';
import {generatePDF} from '@/utils/pdfUtils';
import {styles} from './Dashboard.styles';

export const Dashboard = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const {setActiveResume, resumes, addResume} = useResumeStore();
  const [pdfPreviews, setPdfPreviews] = useState<Record<string, string | null>>(
    {},
  );
  const [loadingPreviews, setLoadingPreviews] = useState<
    Record<string, boolean>
  >({});

  useFocusEffect(
    useCallback(() => {
      let isMounted = true;
      const abortController = new AbortController();

      const generatePreviews = async () => {
        const currentResumes = useResumeStore.getState().resumes;

        // Initialize loading states
        const loading = currentResumes.reduce(
          (acc, resume) => ({
            ...acc,
            [resume.metadata.id]: true,
          }),
          {},
        );

        if (isMounted) {
          setLoadingPreviews(loading);
        }

        const previews: Record<string, string | null> = {};

        for (const resume of currentResumes) {
          if (abortController.signal.aborted) {
            break;
          }

          try {
            const template = getTemplateById(resume.metadata.templateId);
            const base64 = await generatePDF(template?.getHTML(resume));
            if (isMounted) {
              previews[resume.metadata.id] = base64;
            }
          } catch (error) {
            console.log('Error generating preview:', error);
            if (isMounted) {
              previews[resume.metadata.id] = null;
            }
          } finally {
            if (isMounted) {
              setLoadingPreviews(prev => ({
                ...prev,
                [resume.metadata.id]: false,
              }));
            }
          }
        }

        if (isMounted) {
          setPdfPreviews(prev => ({...prev, ...previews}));
        }
      };

      // Initial generation
      generatePreviews();

      // Subscribe to resume changes
      const unsubscribe = useResumeStore.subscribe(state => state.resumes);

      return () => {
        isMounted = false;
        abortController.abort();
        unsubscribe();
      };
    }, []),
  );

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
