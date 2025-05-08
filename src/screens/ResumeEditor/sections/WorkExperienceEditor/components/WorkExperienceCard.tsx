import {
  Button,
  CardHeader,
  Checkbox,
  CollapsibleCard,
  DateInputRow,
  HTMLPreview,
  TextInput,
} from '@/components';
import {globalStyles} from '@/styles';
import {COLORS} from '@/theme';
import {WorkItem} from '@/types';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Divider} from 'react-native-paper';
import {styles} from '../WorkExperienceEditor.styles';

interface WorkExperienceCardProps {
  experience: WorkItem;
  toggleExpand: (id: string) => void;
  expandedItems: {[key: string]: boolean};
  navigation: any;
  updateWorkExperience: (id: string, experience: any) => void;
  removeWorkExperience: (id: string) => void;
}

export function WorkExperienceCard({
  experience,
  toggleExpand,
  expandedItems,
  navigation,
  updateWorkExperience,
  removeWorkExperience,
}: Readonly<WorkExperienceCardProps>) {
  const header = (
    <CardHeader
      title={experience.company}
      subtitle={experience.position}
      location={experience.location}
      titlePlaceholder="Company name"
      subtitlePlaceholder="Position"
    />
  );

  return (
    <CollapsibleCard
      expanded={expandedItems[experience.id]}
      onToggle={() => toggleExpand(experience.id)}
      header={header}
      style={styles.experienceCard}
      id={experience.id}
      handleDelete={removeWorkExperience}>
      <View>
        <TextInput
          label="Company Name"
          value={experience.company}
          onChangeText={text =>
            updateWorkExperience(experience.id, {
              ...experience,
              company: text,
            })
          }
          leftIcon="business"
        />
        <TextInput
          label="Position"
          value={experience.position}
          onChangeText={text =>
            updateWorkExperience(experience.id, {
              ...experience,
              position: text,
            })
          }
          leftIcon="work"
        />
        <TextInput
          label="Location"
          value={experience.location}
          onChangeText={text =>
            updateWorkExperience(experience.id, {
              ...experience,
              location: text,
            })
          }
          leftIcon="location-on"
          helperText="Optional"
        />
        <Divider style={globalStyles.divider} />
        <DateInputRow
          startDate={experience.startDate}
          endDate={experience.endDate}
          onStartDateChange={text =>
            updateWorkExperience(experience.id, {
              ...experience,
              startDate: text,
            })
          }
          onEndDateChange={text =>
            updateWorkExperience(experience.id, {
              ...experience,
              endDate: text,
            })
          }
          current={experience.current}
        />
        <Checkbox
          checked={experience.current}
          onValueChange={isCurrentlyWorking => {
            updateWorkExperience(experience.id, {
              ...experience,
              current: isCurrentlyWorking,
              endDate: isCurrentlyWorking ? 'Present' : '',
            });
          }}
          label="I currently work here"
          color={COLORS.primary}
        />
        <Divider style={globalStyles.divider} />
        <Text style={styles.label}>Technical skills</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('KeywordsEditor', {
              id: experience.id,
              type: 'work',
            })
          }>
          <Text style={[styles.descriptionPreview, styles.placeholder]}>
            {experience?.keywords?.length
              ? `${experience?.keywords.length} skills added`
              : 'tap to add technical skills'}
          </Text>
        </TouchableOpacity>
        <Text style={styles.label}>Description</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('RichTextEditor', {
              initialContent: experience.description || '',
              contentType: 'work_description',
              itemId: experience.id,
            })
          }>
          <View style={styles.descriptionPreview}>
            <HTMLPreview
              html={experience.description || ''}
              placeholder="Tap to edit work description..."
              maxLines={3}
            />
          </View>
        </TouchableOpacity>
        <Button
          title="Delete"
          onPress={() => removeWorkExperience(experience.id)}
          variant="danger"
        />
      </View>
    </CollapsibleCard>
  );
}
