import {CardHeader, CollapsibleCard} from '@/components';
import {TextInput} from '@/components/TextInput';
import {globalStyles} from '@/styles';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from './LanguageEditor.styles';

const PROFICIENCY_LEVELS = [
  'Beginner',
  'Elementary',
  'Intermediate',
  'Upper Intermediate',
  'Advanced',
  'Native',
];

interface LanguageCardProps {
  language: LanguageItem;
  expandedItemId: string;
  toggleExpand: (id: string) => void;
  updateLanguage: (id: string, language: Partial<LanguageItem>) => void;
  removeLanguage: (id: string) => void;
  isDraggableListVisible: boolean;
  drag?: () => void;
  isActive?: boolean;
}

export function LanguageCard({
  language,
  expandedItemId,
  toggleExpand,
  updateLanguage,
  removeLanguage,
  isDraggableListVisible,
  drag,
}: Readonly<LanguageCardProps>) {
  const header = (
    <CardHeader
      title={language.name}
      titlePlaceholder="Language (e.g. English)"
      subtitle={language.level || 'Select proficiency level'}
      rightIcon={isDraggableListVisible ? 'drag-handle' : undefined}
      containerStyle={isDraggableListVisible ? globalStyles.card : undefined}
    />
  );

  if (isDraggableListVisible) {
    return <TouchableOpacity onPressIn={drag}>{header}</TouchableOpacity>;
  }

  return (
    <CollapsibleCard
      onToggle={() => toggleExpand(language.id)}
      header={header}
      expanded={expandedItemId === language.id}
      id={language.id}
      handleDelete={removeLanguage}>
      <View>
        <TextInput
          label="Language"
          value={language.name}
          placeholder="e.g. English, Spanish, Mandarin"
          onChangeText={text => updateLanguage(language.id, {name: text})}
        />
        <Text style={styles.label}>Proficiency Level:</Text>
        <View style={styles.levelSelector}>
          {PROFICIENCY_LEVELS.map(level => (
            <TouchableOpacity
              key={level}
              style={[
                styles.levelChip,
                language.level === level && styles.selectedLevelChip,
              ]}
              onPress={() => updateLanguage(language.id, {level})}>
              <Text
                style={[
                  styles.levelChipText,
                  language.level === level && styles.selectedLevelChipText,
                ]}>
                {level}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </CollapsibleCard>
  );
}
