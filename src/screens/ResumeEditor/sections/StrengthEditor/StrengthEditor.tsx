import {Button, Header, KeywordItem, TextInput} from '@/components';
import {useResumeStore} from '@/store/useResumeStore';
import {globalStyles} from '@/styles';
import {COLORS, SPACING} from '@/theme';
import React, {useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Divider} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';

const StrengthEditor = () => {
  const {getActiveResume, addStrength, removeStrength} = useResumeStore();

  const strengths = getActiveResume().sections.strengths;
  const [strength, setStrength] = useState('');

  const handleAddStrength = () => {
    // Logic to add strength
    if (strength.trim()) {
      // Add strength to the list or state
      addStrength({
        name: strength.trim(),
      });
      setStrength(''); // Clear input after adding
    } else {
      Alert.alert(
        'Invalid Input',
        'Please enter a valid strength before adding.',
      );
    }
  };
  return (
    <SafeAreaView style={globalStyles.keyboardAvoidingView}>
      <GestureHandlerRootView>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={globalStyles.keyboardAvoidingView}>
          <Header title="Strengths" />

          <ScrollView style={styles.container}>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Start typing..."
                value={strength}
                onChangeText={text => setStrength(text)}
                containerStyle={styles.textInput}
                onSubmitEditing={handleAddStrength}
                autoFocus
              />
              <Button
                title="Add"
                onPress={handleAddStrength}
                disabled={!strength}
              />
            </View>
            <Divider style={globalStyles.divider} />

            <View style={styles.keywordsList}>
              {strengths?.items?.map(keyword => (
                <KeywordItem
                  key={keyword.id}
                  keyword={keyword.name}
                  onRemove={() => removeStrength(keyword.id)}
                />
              ))}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export {StrengthEditor};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
    padding: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    gap: 8,
    alignContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    marginBottom: 0,
  },
  keywordsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
});
