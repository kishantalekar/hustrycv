import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NavigationProp} from '@react-navigation/native';
import {styles} from './AIChatScreen.styles';
import {Typography, TypographyVariant} from '@/components';
import {
  getInitialPrompt,
  processChatMessage,
  formatSectionData,
} from '@/utils/ai/chatParser';
import {extractJsonFromCodeBlock} from '@/utils/regex';
import {useResumeStore} from '@/store/useResumeStore';
import {v4 as uuidv4} from 'uuid';

type Section =
  | 'basics'
  | 'work'
  | 'education'
  | 'skills'
  | 'projects'
  | 'certifications';

const SECTIONS: Section[] = [
  'basics',
  'work',
  'education',
  'skills',
  'projects',
  'certifications',
];

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
}

export const AIChatScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const currentSection = SECTIONS[currentSectionIndex];

  const store = useResumeStore();

  useEffect(() => {
    // Start the conversation with the section's prompt
    if (currentSection) {
      appendMessage('ai', getInitialPrompt(currentSection));
    }
  }, [currentSectionIndex]);

  const appendMessage = (role: 'user' | 'ai', content: string) => {
    setMessages(prev => [...prev, {id: uuidv4(), role, content}]);
  };

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMsg = inputText.trim();
    setInputText('');
    appendMessage('user', userMsg);
    setIsTyping(true);

    try {
      // Build context from previous messages in this section
      // For simplicity, we just pass the last few messages
      const context = messages
        .slice(-6)
        .map(m => `${m.role}: ${m.content}`)
        .join('\n');

      const response = await processChatMessage(
        userMsg,
        currentSection,
        context,
      );

      // Check if response contains a JSON block indicating completion
      if (response.includes('```json')) {
        try {
          const jsonStr = extractJsonFromCodeBlock(response);
          const data = formatSectionData(currentSection, jsonStr);

          // Update store
          if (currentSection === 'basics') {
            store.updateBasics(data);
          } else if (currentSection === 'work') {
            data.forEach((item: any) => store.addWorkExperience(item));
          } else if (currentSection === 'education') {
            data.forEach((item: any) => store.addEducation(item));
          } else if (currentSection === 'skills') {
            data.forEach((item: any) => store.addSkill(item));
          } else if (currentSection === 'projects') {
            data.forEach((item: any) => store.addProject(item));
          } else if (currentSection === 'certifications') {
            data.forEach((item: any) => store.addCertification(item));
          }

          // Move to next section
          appendMessage(
            'ai',
            `Great! I've saved your ${currentSection} details. Let's move on.`,
          );

          if (currentSectionIndex < SECTIONS.length - 1) {
            setCurrentSectionIndex(prev => prev + 1);
          } else {
            appendMessage(
              'ai',
              "All done! I've generated your resume. Taking you to the editor now...",
            );
            setTimeout(() => {
              navigation.navigate('ResumeEditor');
            }, 2000);
          }
        } catch (e) {
          console.error('Failed to parse JSON', e);
          appendMessage(
            'ai',
            "I gathered the information but hit a snag saving it. Could you provide it again or let me know what I missed?",
          );
        }
      } else {
        appendMessage('ai', response);
      }
    } catch (error) {
      appendMessage(
        'ai',
        "Sorry, I'm having trouble connecting right now. Let's try that again.",
      );
    } finally {
      setIsTyping(false);
    }
  };

  const renderMessage = ({item}: {item: Message}) => (
    <View
      style={[
        styles.messageContainer,
        item.role === 'user' ? styles.userMessage : styles.aiMessage,
      ]}>
      <Text style={styles.messageText}>{item.content}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Typography variant={TypographyVariant.H2} style={styles.title}>
          AI Resume Coach
        </Typography>
        <Typography variant={TypographyVariant.BodySmall} style={styles.subtitle}>
          Building section: {currentSection.toUpperCase()}
        </Typography>
      </View>

      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={item => item.id}
          style={styles.messageList}
          contentContainerStyle={styles.messageListContent}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({animated: true})
          }
        />

        {isTyping && (
          <View style={styles.processingContainer}>
            <ActivityIndicator size="small" color="#000" />
          </View>
        )}

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type your answer..."
            placeholderTextColor="#888"
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              !inputText.trim() && styles.sendButtonDisabled,
            ]}
            onPress={handleSend}
            disabled={!inputText.trim() || isTyping}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>➤</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};
