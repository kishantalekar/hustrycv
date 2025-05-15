// import {LottieAnimation} from '@/components';
// import {useResumeStore} from '@/store/useResumeStore';
// import {globalStyles} from '@/styles/globalStyles';
// import {COLORS, SPACING, TYPOGRAPHY} from '@/theme';
// // import {ResumeChatManager} from '@/utils/ai/resumeChatManager';
// import React, {useEffect, useRef, useState} from 'react';
// import {
//   FlatList,
//   KeyboardAvoidingView,
//   Platform,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// type Message = {
//   id: string;
//   text: string;
//   sender: 'user' | 'ai';
//   timestamp: number;
// };

// type Section =
//   | 'basics'
//   | 'work'
//   | 'education'
//   | 'skills'
//   | 'projects'
//   | 'certifications';

// export const AIChatScreen = () => {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [inputText, setInputText] = useState('');
//   const [isProcessing, setIsProcessing] = useState(false);
//   const chatManager = useRef<ResumeChatManager>(new ResumeChatManager());
//   const messageListRef = useRef<FlatList>(null);
//   const {addResume, setActiveResume} = useResumeStore();

//   useEffect(() => {
//     // Send initial welcome message
//     const welcomeMessage: Message = {
//       id: Date.now().toString(),
//       text: "Hi! I'm your AI resume assistant. Let's create your resume together. First, let me ask about your basic information.",
//       sender: 'ai',
//       timestamp: Date.now(),
//     };
//     setMessages([welcomeMessage]);
//   }, []);

//   const handleSendMessage = async () => {
//     if (!inputText.trim() || isProcessing) return;

//     const userMessage: Message = {
//       id: Date.now().toString(),
//       text: inputText.trim(),
//       sender: 'user',
//       timestamp: Date.now(),
//     };

//     setMessages(prev => [...prev, userMessage]);
//     setInputText('');
//     setIsProcessing(true);

//     try {
//       const response = await chatManager.current.processMessage(
//         userMessage.text,
//       );

//       const aiMessage: Message = {
//         id: (Date.now() + 1).toString(),
//         text: response,
//         sender: 'ai',
//         timestamp: Date.now(),
//       };

//       setMessages(prev => [...prev, aiMessage]);
//     } catch (error) {
//       console.error('Error processing message:', error);
//       const errorMessage: Message = {
//         id: (Date.now() + 1).toString(),
//         text: 'I encountered an error. Please try again.',
//         sender: 'ai',
//         timestamp: Date.now(),
//       };
//       setMessages(prev => [...prev, errorMessage]);
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   const renderMessage = ({item}: {item: Message}) => (
//     <View
//       style={[
//         styles.messageContainer,
//         item.sender === 'user' ? styles.userMessage : styles.aiMessage,
//       ]}>
//       <Text
//         style={[
//           styles.messageText,
//           {
//             color:
//               item.sender === 'user' ? COLORS.text.light : COLORS.text.primary,
//           },
//         ]}>
//         {item.text}
//       </Text>
//     </View>
//   );

//   return (
//     <SafeAreaView style={globalStyles.container}>
//       <KeyboardAvoidingView
//         style={styles.container}
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
//         <View style={styles.header}>
//           <Text style={styles.title}>AI Resume Assistant</Text>
//           <Text style={styles.subtitle}>
//             Let's build your resume together, step by step
//           </Text>
//         </View>

//         <FlatList
//           data={messages}
//           renderItem={renderMessage}
//           keyExtractor={item => item.id}
//           style={styles.messageList}
//           contentContainerStyle={[
//             styles.messageListContent,
//             {justifyContent: 'flex-end'},
//           ]}
//           onContentSizeChange={() =>
//             messageListRef.current?.scrollToEnd({animated: true})
//           }
//           ref={messageListRef}
//         />

//         {isProcessing && (
//           <View style={styles.processingContainer}>
//             <LottieAnimation
//               source={require('@/assets/animations/typing.json')}
//               style={styles.processingAnimation}
//               loop={true}
//               autoPlay={true}
//             />
//           </View>
//         )}

//         <View style={styles.inputContainer}>
//           <TextInput
//             style={styles.input}
//             value={inputText}
//             onChangeText={setInputText}
//             placeholder="Type your message..."
//             placeholderTextColor={COLORS.text.secondary}
//             multiline
//             maxLength={500}
//           />
//           <TouchableOpacity
//             style={[
//               styles.sendButton,
//               !inputText.trim() && styles.sendButtonDisabled,
//             ]}
//             onPress={handleSendMessage}
//             disabled={!inputText.trim() || isProcessing}>
//             <Icon
//               name="send"
//               size={24}
//               color={
//                 inputText.trim() ? COLORS.text.light : COLORS.text.secondary
//               }
//             />
//           </TouchableOpacity>
//         </View>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.background.primary,
//   },
//   header: {
//     padding: SPACING.lg,
//     borderBottomWidth: 1,
//     borderBottomColor: COLORS.border,
//   },
//   title: {
//     fontSize: TYPOGRAPHY.size.xl,
//     fontWeight: 'bold',
//     color: COLORS.text.primary,
//     marginBottom: SPACING.xs,
//   },
//   subtitle: {
//     fontSize: TYPOGRAPHY.size.sm,
//     color: COLORS.text.secondary,
//   },
//   messageList: {
//     flex: 1,
//   },
//   messageListContent: {
//     padding: SPACING.md,
//   },
//   messageContainer: {
//     maxWidth: '80%',
//     marginVertical: SPACING.xs,
//     padding: SPACING.md,
//     borderRadius: 12,
//   },
//   userMessage: {
//     alignSelf: 'flex-end',
//     backgroundColor: COLORS.primary,
//   },
//   aiMessage: {
//     alignSelf: 'flex-start',
//     backgroundColor: COLORS.background.secondary,
//   },
//   messageText: {
//     fontSize: TYPOGRAPHY.size.md,
//   },
//   processingContainer: {
//     padding: SPACING.md,
//     alignItems: 'flex-start',
//   },
//   processingAnimation: {
//     width: 50,
//     height: 30,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     padding: SPACING.md,
//     borderTopWidth: 1,
//     borderTopColor: COLORS.border,
//     backgroundColor: COLORS.background.primary,
//   },
//   input: {
//     flex: 1,
//     minHeight: 40,
//     maxHeight: 100,
//     backgroundColor: COLORS.background.secondary,
//     borderRadius: 20,
//     paddingHorizontal: SPACING.lg,
//     paddingVertical: SPACING.sm,
//     marginRight: SPACING.sm,
//     color: COLORS.text.primary,
//   },
//   sendButton: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: COLORS.primary,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   sendButtonDisabled: {
//     backgroundColor: COLORS.background.secondary,
//   },
// });
