import {Platform, ToastAndroid} from 'react-native';
import RNFetchBlob from 'react-native-blob-util';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

// export const requestStoragePermission = async () => {
//   try {
//     if (Platform.OS === 'android') {
//       if (Platform.Version >= 33) {
//         const granted = await PermissionsAndroid.requestMultiple([
//           PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
//           PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
//         ]);
//         return Object.values(granted).every(
//           permission => permission === PermissionsAndroid.RESULTS.GRANTED,
//         );
//       } else if (Platform.Version >= 31) {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
//         );
//         return granted === PermissionsAndroid.RESULTS.GRANTED;
//       }
//     }
//     return true;
//   } catch (err) {
//     console.warn(err);
//     return false;
//   }
// };

export const generatePDF = async (html: string) => {
  try {
    if (!html.trim()) {
      throw new Error('No content to export');
    }

    const options = {
      html,
      base64: true,
    };

    const file = await RNHTMLtoPDF.convert(options);
    if (!file.base64) {
      throw new Error('Failed to generate PDF');
    }
    return file.base64;
  } catch (error) {
    console.error('Error in generatePDF:', error);
    throw error;
  }
};

export const createAndSavePDF = async (html: string, fileName: string) => {
  try {
    if (!html.trim()) {
      throw new Error('No content to export');
    }

    const options = {
      html,
      fileName,
      directory: 'Download', // This ensures the file is saved in the Downloads directory
    };

    const file = await RNHTMLtoPDF.convert(options);
    if (!file.filePath) {
      throw new Error('Failed to generate PDF');
    }

    if (Platform.OS === 'android') {
      // Use the direct file path from RNHTMLtoPDF
      await RNFetchBlob.android.addCompleteDownload({
        title: fileName,
        description: 'Resume PDF',
        mime: 'application/pdf',
        path: file.filePath,
        showNotification: true,
      });

      ToastAndroid.show('PDF saved to Downloads folder', ToastAndroid.LONG);
    }

    return file.filePath;
  } catch (error) {
    console.error('Error generating PDF:', error);
    if (Platform.OS === 'android') {
      ToastAndroid.show('Failed to save PDF', ToastAndroid.LONG);
    }
    throw error;
  }
};
