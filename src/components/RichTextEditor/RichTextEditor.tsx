
import React from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet, View} from 'react-native';
import {COLORS} from '@/theme';
import {
  useEditorBridge,
  TenTapStartKit,
  RichText,
  Toolbar,
} from '@10play/tentap-editor';
import {globalStyles} from '@/styles/globalStyles';
import {DEFAULT_TOOLBAR_ITEMS} from './Toolbar/Actions';

interface RichTextEditorProps {
  initialContent?: string;
  onChangeContent?: (content: string) => void;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  initialContent = '',
  onChangeContent,
}) => {
  const editor = useEditorBridge({
    autofocus: true,
    initialContent: initialContent,
    onChange: () => {
      if (onChangeContent && editor) {
        editor.getHTML().then(html => {
          return onChangeContent(html);
        });
      }
    },
    bridgeExtensions: TenTapStartKit,
  });
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={globalStyles.keyboardAvoidingView}>
      <RichText editor={editor} style={styles.editor} />
      <View style={{height: 60}}>
        <Toolbar editor={editor} hidden={false} items={DEFAULT_TOOLBAR_ITEMS} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.danger,
  },
  editor: {
    flex: 1,
    marginHorizontal: 16,
  },
  toolbarContainer: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    backgroundColor: COLORS.background.secondary,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
});
