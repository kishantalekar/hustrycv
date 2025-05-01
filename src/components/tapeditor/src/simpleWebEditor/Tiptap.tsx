import { EditorContent } from '@tiptap/react';
import React from 'react';
import { TenTapStartKit } from '../bridges/StarterKit';
import { useTenTap } from '../webEditorUtils';

let tenTapExtensions = TenTapStartKit.filter(
  (e) =>
    !window.whiteListBridgeExtensions ||
    window.whiteListBridgeExtensions.includes(e.name),
);

export default function Tiptap() {
  const editor = useTenTap({ bridges: tenTapExtensions });

  return (
    <EditorContent
      editor={editor}
      className={window.dynamicHeight ? 'dynamic-height' : undefined}
    />
  );
}
