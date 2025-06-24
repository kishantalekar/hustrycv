import {
  CardHeader,
  CollapsibleCard,
  HTMLPreview,
  TextInput,
} from '@/components';
import {globalStyles} from '@/styles';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from './ReferenceEditor.styles';

interface ReferenceCardProps {
  reference: ReferenceItem;
  expandedItemId: string;
  toggleExpand: (id: string) => void;
  updateReference: (id: string, reference: ReferenceItem) => void;
  removeReference: (id: string) => void;
  navigation: any;
  isDraggableListVisible: boolean;
  drag?: () => void;
}
export function ReferenceCard({
  reference,
  expandedItemId,
  toggleExpand,
  updateReference,
  removeReference,
  navigation,
  isDraggableListVisible,
  drag,
}: Readonly<ReferenceCardProps>) {
  const header = (
    <CardHeader
      title={reference.name}
      subtitle={reference.company}
      titlePlaceholder="Reference Name"
      subtitlePlaceholder="Company Name"
      rightIcon={isDraggableListVisible ? 'drag-handle' : undefined}
      containerStyle={isDraggableListVisible ? globalStyles.card : undefined}
    />
  );

  if (isDraggableListVisible) {
    return <TouchableOpacity onPressIn={drag}>{header}</TouchableOpacity>;
  }
  return (
    <CollapsibleCard
      expanded={expandedItemId === reference.id}
      onToggle={() => toggleExpand(reference.id)}
      header={header}
      id={reference.id}
      handleDelete={removeReference}>
      <View>
        <TextInput
          label="Reference Name"
          placeholder="Enter Reference name"
          value={reference.name}
          onChangeText={text =>
            updateReference(reference.id, {...reference, name: text})
          }
        />
        <TextInput
          label="Company Name"
          placeholder="Enter Company name"
          value={reference.company}
          onChangeText={text =>
            updateReference(reference.id, {...reference, company: text})
          }
        />
        <TextInput
          label="Position"
          placeholder="Enter Position"
          value={reference.position}
          onChangeText={text =>
            updateReference(reference.id, {...reference, position: text})
          }
        />
        <TextInput
          label="Contact 1"
          placeholder="Enter Contact Details"
          value={reference.contact1}
          onChangeText={text =>
            updateReference(reference.id, {...reference, contact1: text})
          }
        />
        <TextInput
          label="Contact 2"
          placeholder="Enter Contact Details"
          value={reference.contact2}
          onChangeText={text =>
            updateReference(reference.id, {...reference, contact2: text})
          }
        />

        <Text style={styles.label}>Description</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('RichTextEditor', {
              initialContent: reference.referenceText || '',
              contentType: 'reference_description',
              itemId: reference.id,
            })
          }>
          <View style={globalStyles.htmlDescriptionPreview}>
            <HTMLPreview
              html={reference.referenceText || ''}
              placeholder="Tap to edit reference description..."
              maxLines={3}
            />
          </View>
        </TouchableOpacity>
      </View>
    </CollapsibleCard>
  );
}
