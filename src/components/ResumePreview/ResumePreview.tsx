import {LottieAnimation} from '@/components';
import React from 'react';
import {Text, View} from 'react-native';
import WebView from 'react-native-webview';
import {ResumePreviewProps} from './ResumePreview.types';
import {styles} from './ResumePreview.styles';
import {useResumeHTML} from '@/hooks/useResumeHTML';

export function ResumePreview({
  resumeData,
  selectedTemplate,
}: Readonly<ResumePreviewProps>) {
  const {html, isGenerating} = useResumeHTML(resumeData, selectedTemplate || 'professional', 500);

  if (!resumeData) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No resume data available</Text>
      </View>
    );
  }

  const renderLoading = () => (
    <View style={styles.loadingContainer}>
      <LottieAnimation
        source={require('../../assets/animations/cv_loading.json')}
        autoPlay
        loop
        style={styles.loadingAnimation}
      />
      <Text style={styles.loadingText}>Generating Preview...</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {isGenerating ? (
        renderLoading()
      ) : (
        <WebView
          originWhitelist={['*']}
          source={{html}}
          style={styles.webView}
          bounces={false}
          showsVerticalScrollIndicator={true}
          showsHorizontalScrollIndicator={false}
          startInLoadingState={true}
          renderLoading={renderLoading}
          scalesPageToFit={true}
        />
      )}
    </View>
  );
}
