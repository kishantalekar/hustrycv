import {COLORS, SPACING} from '@/theme';
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import React, {useEffect, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {ChangeLogItem} from '../../constants/changelog';
import {markChangeLogAsSeen} from '../../utils/changelogUtils';
import {Typography, TypographyVariant} from '../Typography';

interface ChangesLogModalProps {
  isVisible?: boolean;
  onClose?: () => void;
  bottomSheetRef: React.Ref<BottomSheet>;
  changes: ChangeLogItem[];
}

export const ChangesLogModal = ({
  isVisible = false,
  onClose,
  bottomSheetRef,
  changes,
}: ChangesLogModalProps) => {
  const snapPoints = useMemo(() => ['80%'], []);

  useEffect(() => {
    if (bottomSheetRef?.current) {
      if (isVisible) {
        // @ts-ignore
        bottomSheetRef.current?.snapToIndex(0);
      } else {
        // @ts-ignore
        bottomSheetRef.current?.close();
      }
    }
  }, [isVisible, bottomSheetRef]);

  const handleClose = async () => {
    // Mark all changes as seen
    for (const change of changes) {
      await markChangeLogAsSeen(change.version);
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      onChange={index => {
        if (index === -1) {
          handleClose();
        }
      }}
      enablePanDownToClose
      backgroundStyle={{
        backgroundColor: COLORS.background.primary,
      }}
      handleIndicatorStyle={styles.handleIndicator}
      handleStyle={styles.handleStyle}
      style={styles.bottomSheet}>
      <BottomSheetView style={styles.bottomSheetContent}>
        <Typography variant={TypographyVariant.H2} style={styles.title}>
          What's New
        </Typography>
        <BottomSheetScrollView style={styles.scrollView}>
          {changes.map((item, _) => (
            <View key={item.version} style={styles.changeLogItem}>
              <View style={styles.versionHeader}>
                <Typography
                  variant={TypographyVariant.TitleLarge}
                  style={styles.version}>
                  Version {item.version}
                </Typography>
                <Typography
                  variant={TypographyVariant.Body2}
                  style={styles.date}>
                  {item.date}
                </Typography>
              </View>

              {item.changes.map((change, changeIndex) => (
                <View key={changeIndex} style={styles.changeItem}>
                  <Typography
                    variant={TypographyVariant.Body2}
                    style={styles.bullet}>
                    •
                  </Typography>
                  <Typography
                    variant={TypographyVariant.Body2}
                    style={styles.changeText}>
                    {change}
                  </Typography>
                </View>
              ))}
            </View>
          ))}
        </BottomSheetScrollView>
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  handleIndicator: {
    backgroundColor: COLORS.border,
    width: 40,
    height: 4,
  },
  handleStyle: {
    backgroundColor: COLORS.background.primary,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingVertical: 10,
  },
  bottomSheet: {
    flex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  bottomSheetContent: {
    flex: 1,
    backgroundColor: COLORS.background.secondary,
    paddingBottom: 46,
    paddingHorizontal: SPACING.lg,
  },
  title: {
    textAlign: 'center',
    marginVertical: SPACING.lg,
    color: COLORS.text.primary,
  },
  scrollView: {
    flex: 1,
  },
  changeLogItem: {
    marginBottom: SPACING.lg,
  },
  versionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  version: {
    color: COLORS.primary,
  },
  date: {
    color: COLORS.text.secondary,
  },
  changeItem: {
    flexDirection: 'row',
    marginBottom: SPACING.xs,
    paddingLeft: SPACING.sm,
  },
  bullet: {
    marginRight: SPACING.xs,
    color: COLORS.primary,
  },
  changeText: {
    flex: 1,
    color: COLORS.text.primary,
  },
});
