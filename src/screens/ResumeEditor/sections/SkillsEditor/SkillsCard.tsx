import {CardHeader, CollapsibleCard, KeywordItem} from '@/components';
import {TextInput} from '@/components/TextInput';
import {globalStyles} from '@/styles';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from './SkillsEditor.styles';

interface SkillCardProps {
  skill: SkillItem;
  expandedItemId: string;
  toggleExpand: (id: string) => void;
  updateSkill: (id: string, skill: SkillItem) => void;
  removeSkill: (id: string) => void;
  newKeyword: string;
  setNewKeyword: (text: string) => void;
  isDraggableListVisible: boolean;
  drag?: () => void;
  isActive?: boolean;
}
export function SkillsCard({
  skill,
  expandedItemId,
  toggleExpand,
  updateSkill,
  removeSkill,
  newKeyword,
  setNewKeyword,
  isDraggableListVisible,
  drag,
}: Readonly<SkillCardProps>) {
  const header = (
    <CardHeader
      title={skill.name}
      titlePlaceholder="Category"
      subtitle="skills"
      rightIcon={isDraggableListVisible ? 'drag-handle' : undefined}
      containerStyle={isDraggableListVisible ? globalStyles.card : undefined}
    />
  );

  if (isDraggableListVisible) {
    return <TouchableOpacity onPressIn={drag}>{header}</TouchableOpacity>;
  }
  return (
    <CollapsibleCard
      onToggle={() => toggleExpand(skill.id)}
      header={header}
      expanded={expandedItemId === skill.id}
      id={skill.id}
      handleDelete={removeSkill}>
      <View>
        <TextInput
          label="Category"
          value={skill.name}
          onChangeText={text => updateSkill(skill.id, {...skill, name: text})}
        />
        <Text style={styles.label}>Level:</Text>
        <View style={styles.levelSelector}>
          {['beginner', 'intermediate', 'advanced'].map(level => (
            <TouchableOpacity
              key={level}
              style={[
                styles.levelChip,
                skill.level === level && styles.selectedLevelChip,
              ]}
              onPress={() => updateSkill(skill.id, {...skill, level})}>
              <Text
                style={[
                  styles.levelChipText,
                  skill.level === level && styles.selectedLevelChipText,
                ]}>
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.keywordsSection}>
          <Text style={styles.keywordsTitle}>Skills:</Text>
          <View style={styles.keywordsList}>
            {skill?.keywords &&
              skill?.keywords?.map((keyword, index) => (
                <KeywordItem
                  key={index}
                  keyword={keyword}
                  onRemove={() =>
                    updateSkill(skill.id, {
                      ...skill,
                      keywords: skill.keywords?.filter((_, i) => i !== index),
                    })
                  }
                />
              ))}
          </View>
        </View>
        <View style={styles.keywordsContainer}>
          <TextInput
            label="Add Skill"
            helperText="Press enter to add"
            value={newKeyword}
            onChangeText={setNewKeyword}
            onSubmitEditing={() => {
              if (newKeyword.trim()) {
                updateSkill(skill.id, {
                  ...skill,
                  keywords: [...(skill.keywords ?? []), newKeyword.trim()],
                });
                setNewKeyword('');
              }
            }}
          />
        </View>
      </View>
    </CollapsibleCard>
  );
}
