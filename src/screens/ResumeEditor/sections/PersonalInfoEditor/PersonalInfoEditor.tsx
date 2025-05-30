import {Header} from '@/components/Header';
import {HTMLPreview} from '@/components/HTMLPreview/HTMLPreview';
import {TextInput} from '@/components/TextInput';
import {FONTS} from '@/constants';
import {AppNavigationProp} from '@/navigation/AppNavigator';
import {useResumeStore} from '@/store/useResumeStore';
import {globalStyles} from '@/styles/globalStyles';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Card, Divider, Text} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';

export const PersonalInfoEditor = () => {
  const {getActiveResume, updateBasics} = useResumeStore();
  const navigation = useNavigation<AppNavigationProp>();
  // console.log('basics', getActiveResume());
  const basics = getActiveResume().basics;
  return (
    <SafeAreaView style={globalStyles.keyboardAvoidingView}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={globalStyles.keyboardAvoidingView}>
        <Header title="Personal Details" />
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}>
          <Card style={styles.card}>
            <Card.Content>
              <TextInput
                label="Full Name"
                value={basics.name}
                onChangeText={text => updateBasics({name: text})}
                placeholder="Enter your full name"
                style={styles.input}
                leftIcon="person"
              />

              <TextInput
                label="Email"
                value={basics.email}
                onChangeText={text => updateBasics({email: text})}
                placeholder="Enter your email"
                keyboardType="email-address"
                style={styles.input}
                leftIcon="email"
              />

              <TextInput
                label="Phone"
                placeholder="Enter your phone number"
                keyboardType="phone-pad"
                onChangeText={text => updateBasics({phone: text})}
                value={basics.phone}
                style={styles.input}
                leftIcon="phone"
              />

              <TextInput
                label="Location"
                placeholder="City, Country"
                value={basics.location}
                onChangeText={text => updateBasics({location: text})}
                style={styles.input}
                leftIcon="location-on"
              />

              <Divider style={styles.divider} />
              {/* show the social profiles here  */}
              <Text style={styles.subsectionTitle}>Professional Profiles</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('SocialProfiles')}>
                <Text style={styles.summaryPreview}>
                  {basics?.socials?.length
                    ? `${basics?.socials?.length} profile${
                        basics?.socials?.length !== 1 ? 's' : ''
                      } added`
                    : 'Tap to add profile'}
                </Text>
              </TouchableOpacity>

              <Divider style={styles.divider} />
              <Text style={styles.subsectionTitle}>Professional Summary</Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('RichTextEditor', {
                    initialContent: basics.summary || '',
                    contentType: 'professional_summary',
                  })
                }>
                <Text style={styles.label}>Summary</Text>
                <View style={globalStyles.htmlDescriptionPreview}>
                  <HTMLPreview
                    html={basics.summary || ''}
                    placeholder="Tap to edit your professional summary..."
                    maxLines={3}
                  />
                </View>
              </TouchableOpacity>
            </Card.Content>
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  summaryPreview: {
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    padding: 12,
    marginTop: 4,
    minHeight: 40,
  },
  summaryText: {
    fontSize: 14,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    color: '#666',
    lineHeight: 20,
  },
  divider: {
    marginVertical: 24,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  label: {
    fontSize: 16,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    color: '#666',
    marginBottom: 8,
  },
  subsectionTitle: {
    fontSize: 18,
    fontFamily: FONTS.FIRA_SANS.MEDIUM,
    color: '#333',
    marginBottom: 16,
  },
  summaryInput: {
    minHeight: 120,
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
    fontSize: 16,
    lineHeight: 24,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
    elevation: 2,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
    borderRadius: 8,
  },
});
