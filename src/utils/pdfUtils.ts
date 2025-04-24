import {Platform, ToastAndroid, PermissionsAndroid} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

export const requestStoragePermission = async () => {
  try {
    if (Platform.OS === 'android') {
      if (Platform.Version >= 33) {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
        ]);
        return Object.values(granted).every(
          permission => permission === PermissionsAndroid.RESULTS.GRANTED,
        );
      } else if (Platform.Version >= 31) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
    }
    return true;
  } catch (err) {
    console.warn(err);
    return false;
  }
};
export const generatePDF = async (html: string) => {
  const options = {
    html,
    base64: true,
  };
  const file = await RNHTMLtoPDF.convert(options);
  if (file.base64) {
    return file.base64;
  }
  return null;
};
export const createAndSavePDF = async (html: string) => {
  try {
    const hasPermission = await requestStoragePermission();
    if (!hasPermission) {
      if (Platform.OS === 'android') {
        ToastAndroid.show(
          'Storage permission required to save PDF',
          ToastAndroid.LONG,
        );
      }
      return;
    }

    if (!html.trim()) {
      throw new Error('No content to export');
    }

    const options = {
      html,
      fileName: `Resume_${Date.now()}`,
      directory: Platform.OS === 'android' ? 'Download' : 'Documents',
      padding: 12,
      bgColor: '#ffffff',
      width: 595, // <-- A4 width in points
      height: 842,
    };

    const file = await RNHTMLtoPDF.convert(options);
    if (file.filePath) {
      if (Platform.OS === 'android') {
        ToastAndroid.show('PDF saved to Downloads folder', ToastAndroid.LONG);
      }
      return file.filePath;
    }
  } catch (error) {
    console.error('Error generating PDF:', error);
    if (Platform.OS === 'android') {
      ToastAndroid.show('Failed to save PDF', ToastAndroid.LONG);
    }
  }
};
