import {Platform} from 'react-native';
import Sentry from '@sentry/react-native';
import SpInAppUpdates, {
  NeedsUpdateResponse,
  IAUUpdateKind,
  StartUpdateOptions,
  IAUInstallStatus,
} from 'sp-react-native-in-app-updates';

class UpdateService {
  private inAppUpdates: SpInAppUpdates;

  constructor() {
    this.inAppUpdates = new SpInAppUpdates(
      false, // isDebug
    );
  }

  async checkForUpdates(): Promise<NeedsUpdateResponse | null> {
    try {
      const result = await this.inAppUpdates.checkNeedsUpdate({});
      return result;
    } catch (error) {
      Sentry.captureException(error);
      console.error('Error checking for updates:', error);
      return null;
    }
  }

  async startFlexibleUpdate(): Promise<boolean> {
    try {
      const updateOptions = Platform.select({
        android: {
          updateType: IAUUpdateKind.IMMEDIATE,
        },
        ios: {
          title: 'Update Available',
          message: 'A new version is available. Would you like to update?',
          buttonUpgradeText: 'Update',
          buttonCancelText: 'Cancel',
        },
      });

      this.inAppUpdates.addStatusUpdateListener(status => {
        console.log('Update status:', status);
        if (status.status === IAUInstallStatus.DOWNLOADED) {
          console.log('Update downloaded');
          this.completeFlexibleUpdate();
        }
      });

      await this.inAppUpdates.startUpdate(updateOptions as StartUpdateOptions);
      return true;
    } catch (error) {
      Sentry.captureException(error);
      console.error('Error starting update:', error);
      return false;
    }
  }

  async completeFlexibleUpdate(): Promise<void> {
    try {
      await this.inAppUpdates.installUpdate();
    } catch (error) {
      Sentry.captureException(error);
      console.error('Error completing flexible update:', error);
    }
  }
}

export const updateService = new UpdateService();
