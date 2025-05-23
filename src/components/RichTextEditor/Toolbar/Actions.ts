import {Images} from '@10play/tentap-editor';
import {Platform} from 'react-native';
import type {ToolbarItem} from '@10play/tentap-editor';

export enum ToolbarContext {
  Main,
  Link,
  Heading,
}

// bold italic underline strikethrough ordered and unordered list align .
export const DEFAULT_TOOLBAR_ITEMS: ToolbarItem[] = [
  {
    onPress:
      ({editor}) =>
      () =>
        editor.toggleBold(),
    active: ({editorState}) => editorState.isBoldActive,
    disabled: ({editorState}) => !editorState.canToggleBold,
    image: () => Images.bold,
  },
  {
    onPress:
      ({editor}) =>
      () =>
        editor.toggleItalic(),
    active: ({editorState}) => editorState.isItalicActive,
    disabled: ({editorState}) => !editorState.canToggleItalic,
    image: () => Images.italic,
  },
  {
    onPress:
      ({setToolbarContext, editorState, editor}) =>
      () => {
        if (Platform.OS === 'android') {
          // On android focus outside the editor will lose the tiptap selection so we wait for the next tick and set it with the last selection value we had
          setTimeout(() => {
            editor.setSelection(
              editorState.selection.from,
              editorState.selection.to,
            );
          });
        }
        setToolbarContext(ToolbarContext.Link);
      },
    active: ({editorState}) => editorState.isLinkActive,
    disabled: ({editorState}) =>
      !editorState.isLinkActive && !editorState.canSetLink,
    image: () => Images.link,
  },
  // {
  //   onPress:
  //     ({editor}) =>
  //     () =>
  //       editor.toggleTaskList(),
  //   active: ({editorState}) => editorState.isTaskListActive,
  //   disabled: ({editorState}) => !editorState.canToggleTaskList,
  //   image: () => Images.checkList,
  // },
  // {
  //   onPress:
  //     ({setToolbarContext}) =>
  //     () =>
  //       setToolbarContext(ToolbarContext.Heading),
  //   active: () => false,
  //   disabled: ({editorState}) => !editorState.canToggleHeading,
  //   image: () => Images.Aa,
  // },
  // {
  //   onPress:
  //     ({editor}) =>
  //     () =>
  //       editor.toggleCode(),
  //   active: ({editorState}) => editorState.isCodeActive,
  //   disabled: ({editorState}) => !editorState.canToggleCode,
  //   image: () => Images.code,
  // },
  {
    onPress:
      ({editor}) =>
      () =>
        editor.toggleUnderline(),
    active: ({editorState}) => editorState.isUnderlineActive,
    disabled: ({editorState}) => !editorState.canToggleUnderline,
    image: () => Images.underline,
  },
  {
    onPress:
      ({editor}) =>
      () =>
        editor.toggleStrike(),
    active: ({editorState}) => editorState.isStrikeActive,
    disabled: ({editorState}) => !editorState.canToggleStrike,
    image: () => Images.strikethrough,
  },
  // {
  //   onPress:
  //     ({editor}) =>
  //     () =>
  //       editor.toggleBlockquote(),
  //   active: ({editorState}) => editorState.isBlockquoteActive,
  //   disabled: ({editorState}) => !editorState.canToggleBlockquote,
  //   image: () => Images.quote,
  // },
  {
    onPress:
      ({editor}) =>
      () =>
        editor.toggleOrderedList(),
    active: ({editorState}) => editorState.isOrderedListActive,
    disabled: ({editorState}) => !editorState.canToggleOrderedList,
    image: () => Images.orderedList,
  },
  {
    onPress:
      ({editor}) =>
      () =>
        editor.toggleBulletList(),
    active: ({editorState}) => editorState.isBulletListActive,
    disabled: ({editorState}) => !editorState.canToggleBulletList,
    image: () => Images.bulletList,
  },
  // {
  //   // Regular list items (li) and task list items both use the
  //   // same sink command and button just with a different parameter, so we check both states here
  //   onPress:
  //     ({editor, editorState}) =>
  //     () =>
  //       editorState.canSink ? editor.sink() : editor.sinkTaskListItem(),
  //   active: () => false,
  //   disabled: ({editorState}) =>
  //     !editorState.canSink && !editorState.canSinkTaskListItem,
  //   image: () => Images.indent,
  // },
  // {
  //   // Regular list items (li) and task list items both use the
  //   // same lift command and button just with a different parameter, so we check both states here
  //   onPress:
  //     ({editor, editorState}) =>
  //     () =>
  //       editorState.canLift ? editor.lift() : editor.liftTaskListItem(),
  //   active: () => false,
  //   disabled: ({editorState}) =>
  //     !editorState.canLift && !editorState.canLiftTaskListItem,
  //   image: () => Images.outdent,
  // },
  // {
  //   onPress:
  //     ({editor}) =>
  //     () =>
  //       editor.undo(),
  //   active: () => false,
  //   disabled: ({editorState}) => !editorState.canUndo,
  //   image: () => Images.undo,
  // },
  // {
  //   onPress:
  //     ({editor}) =>
  //     () =>
  //       editor.redo(),
  //   active: () => false,
  //   disabled: ({editorState}) => !editorState.canRedo,
  //   image: () => Images.redo,
  // },
];
