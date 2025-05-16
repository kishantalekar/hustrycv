import {Platform, ToastAndroid} from 'react-native';
import FileViewer from 'react-native-file-viewer';
import RNFS from 'react-native-fs';

export const getDownloadPath = () => {
  return Platform.OS === 'android'
    ? `${RNFS.ExternalStorageDirectoryPath}/Android/data/com.blueprintresume/files/Download`
    : RNFS.DocumentDirectoryPath;
};

export const loadDownloadedResumes = async () => {
  try {
    const downloadPath = getDownloadPath();
    const files = await RNFS.readDir(downloadPath);
    return files
      .filter(
        file => file.name.endsWith('.pdf') && file.name.startsWith('Resume_'),
      )
      .map(file => ({
        name: file.name,
        path: file.path,
        createdDate: new Date(file.ctime!),
      }))
      .sort((a, b) => b.createdDate.getTime() - a.createdDate.getTime());
  } catch (error: any) {
    console.error('Error loading resumes:', error);
    if (Platform.OS === 'android') {
      ToastAndroid.show(
        'Error loading resumes: ' + error?.message,
        ToastAndroid.LONG,
      );
    }
    return [];
  }
};

export const openResume = async (path: string) => {
  try {
    await FileViewer.open(path, {
      showOpenWithDialog: true,
      showAppsSuggestions: true,
    });
  } catch (error) {
    console.error('Error opening PDF:', error);
    if (Platform.OS === 'android') {
      ToastAndroid.show('No PDF viewer app installed', ToastAndroid.LONG);
    }
  }
};

export const deleteResume = async (path: string) => {
  try {
    await RNFS.unlink(path);
    if (Platform.OS === 'android') {
      ToastAndroid.show('Resume deleted successfully', ToastAndroid.SHORT);
    }
    return true;
  } catch (error) {
    console.error('Error deleting resume:', error);
    if (Platform.OS === 'android') {
      ToastAndroid.show('Failed to delete resume', ToastAndroid.LONG);
    }
    return false;
  }
};

export const getResumeFileName = (name: string | null | undefined): string => {
  if (!name) {
    return 'My_Resume';
  }
  const sanitizedName = name.replace(/[^a-zA-Z0-9]/g, '_');
  return `${sanitizedName}_Resume`;
};
