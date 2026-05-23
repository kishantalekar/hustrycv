import AsyncStorage from '@react-native-async-storage/async-storage';
import {CHANGELOG, ChangeLogItem} from '../constants/changelog';
// import {getAppVersion} from './appVersion';

const CHANGELOG_VERSION_KEY = '@changelog_version_';

export const checkForChangeLogUpdates = async (): Promise<
  ChangeLogItem[] | null
> => {
  try {
    const currentAppVersion = '2.0.0';
    const unseenChanges: ChangeLogItem[] = [];

    for (const change of CHANGELOG) {
      const versionKey = CHANGELOG_VERSION_KEY + change.version;
      const isVersionSeen = await AsyncStorage.getItem(versionKey);
      const isNewerOrEqual =
        compareVersions(change.version, currentAppVersion) <= 0;

      if (!isVersionSeen && isNewerOrEqual) {
        unseenChanges.push(change);
      }
    }

    return unseenChanges.length > 0 ? unseenChanges : null;
  } catch (error) {
    console.error('Error checking changelog updates:', error);
    return null;
  }
};

export const markChangeLogAsSeen = async (version: string): Promise<void> => {
  try {
    const versionKey = CHANGELOG_VERSION_KEY + version;
    await AsyncStorage.setItem(versionKey, 'true');
  } catch (error) {
    console.error('Error marking changelog as seen:', error);
  }
};

// Helper function to compare version strings
const compareVersions = (version1: string, version2: string): number => {
  const v1Parts = version1.split('.').map(Number);
  const v2Parts = version2.split('.').map(Number);

  for (let i = 0; i < Math.max(v1Parts.length, v2Parts.length); i++) {
    const v1 = v1Parts[i] || 0;
    const v2 = v2Parts[i] || 0;

    if (v1 > v2) return 1;
    if (v1 < v2) return -1;
  }

  return 0;
};
