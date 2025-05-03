import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Button, DateInputRow, Checkbox} from '@/components';
import {HTMLPreview} from '@/components/HTMLPreview/HTMLPreview';
import {TextInput} from '@/components/TextInput';
import {COLORS} from '@/theme';
import {WorkItem} from '@/types';
import {styles} from '../WorkExperienceEditor.styles';

//TODO: add  status for work experience
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
  return (
    <View key={experience.id} style={styles.experienceCard}>
      <TouchableOpacity
        style={styles.cardHeader}
        onPress={() => toggleExpand(experience.id)}>
        <View>
          <Text style={styles.companyName}>
            {experience.company.length > 0
              ? experience.company
              : 'Company name'}
          </Text>
          <Text style={styles.position}>
            {experience.position.length ? experience.position : 'Position'}
          </Text>
          {!!experience.location && (
            <Text style={styles.location}>{experience.location}</Text>
          )}
        </View>
        <Icon
          name={expandedItems[experience.id] ? 'expand-less' : 'expand-more'}
          size={24}
          color="#666"
        />
      </TouchableOpacity>
      {expandedItems[experience.id] && (
        <View style={styles.cardContent}>
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
      )}
    </View>
  );
}
