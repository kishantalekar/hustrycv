import React from 'react';
import { View } from 'react-native';
import { ToolbarItemComp } from './ToolbarItemComp';
import type { ToolbarItem } from './actions';
import type { EditorBridge } from '../../types';

interface WebToolbarProps {
  editor: EditorBridge;
  args: Parameters<ToolbarItem['onPress']>[0];
  items: ToolbarItem[];
  hidden?: boolean;
}
export const WebToolbar = ({
  args,
  editor,
  hidden,
  items,
}: WebToolbarProps) => {
  if (hidden) {return null;}

  return (
    <View style={{ flexDirection: 'row' }}>
      {items?.map((item, i) => (
        <ToolbarItemComp {...item} args={args} editor={editor} key={i} />
      ))}
    </View>
  );
};
