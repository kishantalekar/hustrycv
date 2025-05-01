import {View, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Button} from '@/components';
import {TextInput} from '@/components/TextInput';
import {SkillItem} from '@/store/useResumeStore';
import {styles} from './SkillsEditor.styles';

interface SkillCardProps {
  skill: SkillItem;
  expandedItemId: string;
  toggleExpand: (id: string) => void;
  updateSkill: (id: string, skill: SkillItem) => void;
  removeSkill: (id: string) => void;
  newKeyword: string;
  setNewKeyword: (text: string) => void;
}
export function SkillsCard({
  skill,
  expandedItemId,
  toggleExpand,
  updateSkill,
  removeSkill,
  newKeyword,
  setNewKeyword,
}: Readonly<SkillCardProps>) {
  return (
    <View key={skill.id} style={styles.skillCard}>
      <TouchableOpacity
        style={styles.cardHeader}
        onPress={() => toggleExpand(skill.id)}>
        <View>
          <Text style={styles.skillName}>
            {skill.name.length ? skill.name : 'Skill'}
          </Text>
          <Text style={styles.skillLevel}>
            {skill.level.charAt(0).toUpperCase() + skill.level.slice(1)}
          </Text>
        </View>
        <Icon
          name={expandedItemId === skill.id ? 'expand-less' : 'expand-more'}
          size={24}
          color="#666"
        />
      </TouchableOpacity>
      {expandedItemId === skill.id && (
        <View style={styles.cardContent}>
          <TextInput
            label="Skill Name"
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
            <Text style={styles.keywordsTitle}>Keywords:</Text>
            <View style={styles.keywordsList}>
              {skill.keywords.map((keyword, index) => (
                <View key={index} style={styles.keywordItem}>
                  <Text style={styles.skillDetail}>• {keyword}</Text>
                  <TouchableOpacity
                    onPress={() =>
                      updateSkill(skill.id, {
                        ...skill,
                        keywords: skill.keywords.filter((_, i) => i !== index),
                      })
                    }>
                    <Icon name="close" size={20} color="#666" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
          <View style={styles.keywordsContainer}>
            <TextInput
              label="Add Keyword"
              helperText="Press enter to add"
              value={newKeyword}
              onChangeText={setNewKeyword}
              onSubmitEditing={() => {
                if (newKeyword.trim()) {
                  updateSkill(skill.id, {
                    ...skill,
                    keywords: [...skill.keywords, newKeyword.trim()],
                  });
                  setNewKeyword('');
                }
              }}
            />
          </View>
          {/* <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => removeSkill(skill.id)}>
            <Text style={styles.deleteButtonText}>Delete</Text>
                  </TouchableOpacity> */}
          <Button
            title="Delete"
            onPress={() => removeSkill(skill.id)}
            variant="danger"
          />
        </View>
      )}
    </View>
  );
}
