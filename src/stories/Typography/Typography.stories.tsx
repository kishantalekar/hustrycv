import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Typography} from '../../components/Typography/Typography';
import {TypographyVariant} from '../../components/Typography/Typography.types';
import {COLORS} from '../../theme';

export default {
  title: 'Components/Typography',
  component: Typography,
};

export const AllVariants = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Typography
          variant={TypographyVariant.DisplayLarge}
          style={styles.marginBottom}>
          Display Large (57px/64px)
        </Typography>
        <Typography
          variant={TypographyVariant.DisplayMedium}
          style={styles.marginBottom}>
          Display Medium (45px/52px)
        </Typography>
        <Typography
          variant={TypographyVariant.DisplaySmall}
          style={styles.marginBottom}>
          Display Small (36px/44px)
        </Typography>
      </View>

      <View style={styles.section}>
        <Typography
          variant={TypographyVariant.HeadlineLarge}
          style={styles.marginBottom}>
          Headline Large (32px/40px)
        </Typography>
        <Typography
          variant={TypographyVariant.HeadlineMedium}
          style={styles.marginBottom}>
          Headline Medium (28px/36px)
        </Typography>
        <Typography
          variant={TypographyVariant.HeadlineSmall}
          style={styles.marginBottom}>
          Headline Small (24px/32px)
        </Typography>
      </View>

      <View style={styles.section}>
        <Typography
          variant={TypographyVariant.TitleLarge}
          style={styles.marginBottom}>
          Title Large (22px/28px)
        </Typography>
        <Typography
          variant={TypographyVariant.TitleMedium}
          style={styles.marginBottom}>
          Title Medium (16px/24px)
        </Typography>
        <Typography
          variant={TypographyVariant.TitleSmall}
          style={styles.marginBottom}>
          Title Small (14px/20px)
        </Typography>
      </View>

      <View style={styles.section}>
        <Typography
          variant={TypographyVariant.BodyLarge}
          style={styles.marginBottom}>
          Body Large (16px/24px) - Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </Typography>
        <Typography
          variant={TypographyVariant.BodyMedium}
          style={styles.marginBottom}>
          Body Medium (14px/20px) - Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </Typography>
        <Typography
          variant={TypographyVariant.BodySmall}
          style={styles.marginBottom}>
          Body Small (12px/16px) - Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </Typography>
      </View>

      <View style={styles.section}>
        <Typography
          variant={TypographyVariant.LabelLarge}
          style={styles.marginBottom}>
          Label Large (14px/20px)
        </Typography>
        <Typography
          variant={TypographyVariant.LabelMedium}
          style={styles.marginBottom}>
          Label Medium (12px/16px)
        </Typography>
      </View>

      <View style={styles.section}>
        <Typography variant={TypographyVariant.H1} style={styles.marginBottom}>
          Legacy H1
        </Typography>
        <Typography variant={TypographyVariant.H2} style={styles.marginBottom}>
          Legacy H2
        </Typography>
        <Typography
          variant={TypographyVariant.Body1}
          style={styles.marginBottom}>
          Legacy Body1
        </Typography>
        <Typography
          variant={TypographyVariant.Body2}
          style={styles.marginBottom}>
          Legacy Body2
        </Typography>
        <Typography
          variant={TypographyVariant.Button}
          style={styles.marginBottom}>
          Legacy Button
        </Typography>
        <Typography
          variant={TypographyVariant.Caption}
          style={styles.marginBottom}>
          Legacy Caption
        </Typography>
      </View>
    </ScrollView>
  );
};

export const ColorVariants = () => {
  return (
    <View style={styles.container}>
      <Typography
        variant={TypographyVariant.HeadlineMedium}
        color={COLORS.text.primary}
        style={styles.marginBottom}>
        Primary Text Color
      </Typography>
      <Typography
        variant={TypographyVariant.HeadlineMedium}
        color={COLORS.text.secondary}
        style={styles.marginBottom}>
        Secondary Text Color
      </Typography>
      <Typography
        variant={TypographyVariant.HeadlineMedium}
        color={COLORS.primary}
        style={styles.marginBottom}>
        Primary Brand Color
      </Typography>
      <Typography
        variant={TypographyVariant.HeadlineMedium}
        color={COLORS.secondary}
        style={styles.marginBottom}>
        Secondary Brand Color
      </Typography>
      <View style={styles.darkBackground}>
        <Typography
          variant={TypographyVariant.HeadlineMedium}
          color={COLORS.text.light}
          style={styles.marginBottom}>
          Light Text Color (on dark background)
        </Typography>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.background.primary,
  },
  section: {
    marginBottom: 32,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingBottom: 16,
  },
  marginBottom: {
    marginBottom: 16,
  },
  darkBackground: {
    backgroundColor: '#333',
    padding: 16,
    borderRadius: 8,
  },
});
