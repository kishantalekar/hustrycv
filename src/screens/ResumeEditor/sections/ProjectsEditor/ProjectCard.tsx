import {
  CardHeader,
  Checkbox,
  CollapsibleCard,
  DateInputRow,
  HTMLPreview,
  TextInput,
} from '@/components';
import {globalStyles} from '@/styles';
import {COLORS} from '@/theme';
import {ProjectItem} from '@/types';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Divider} from 'react-native-paper';
import {styles} from './ProjectsEditor.styles';

interface ProjectCardProps {
  project: ProjectItem;
  expandedItemId: string;
  toggleExpand: (id: string) => void;
  updateProject: (id: string, project: ProjectItem) => void;
  removeProject: (id: string) => void;
  navigation: any;
}
export function ProjectCard({
  project,
  expandedItemId,
  toggleExpand,
  updateProject,
  removeProject,
  navigation,
}: Readonly<ProjectCardProps>) {
  const header = (
    <CardHeader
      title={project.name}
      subtitle={project.url}
      titlePlaceholder="Project Name"
      subtitlePlaceholder="Project Url"
    />
  );

  return (
    <CollapsibleCard
      expanded={expandedItemId === project.id}
      onToggle={() => toggleExpand(project.id)}
      header={header}
      id={project.id}
      handleDelete={removeProject}>
      <View>
        <TextInput
          label="Project Name"
          placeholder="Enter project name"
          value={project.name}
          onChangeText={text =>
            updateProject(project.id, {...project, name: text})
          }
        />
        <DateInputRow
          startDate={project.startDate}
          endDate={project.endDate}
          onStartDateChange={text =>
            updateProject(project.id, {
              ...project,
              startDate: text,
            })
          }
          onEndDateChange={text =>
            updateProject(project.id, {
              ...project,
              endDate: text,
            })
          }
          current={project.current}
        />
        <Checkbox
          checked={project.current}
          onValueChange={isCurrentlyWorking => {
            updateProject(project.id, {
              ...project,
              current: isCurrentlyWorking,
              endDate: isCurrentlyWorking ? 'Present' : '',
            });
          }}
          label="I currently working on it"
          color={COLORS.primary}
        />
        <Divider style={globalStyles.divider} />

        <Text style={styles.label}>Project Links</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ProjectConfig', {
              id: project.id,
            })
          }>
          <Text style={[styles.descriptionPreview, styles.placeholder]}>
            {project?.links?.length
              ? `${project?.links.length} project links added`
              : 'tap to add project links'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.label}>Skills & Technologies Used</Text>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('KeywordsEditor', {
              id: project.id,
              type: 'project',
            })
          }>
          <Text style={[styles.descriptionPreview, styles.placeholder]}>
            {project?.keywords?.length
              ? `${project?.keywords.length} skills added`
              : 'tap to add project skills'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.label}>Description</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('RichTextEditor', {
              initialContent: project.description || '',
              contentType: 'project_description',
              itemId: project.id,
            })
          }>
          <View style={styles.descriptionPreview}>
            <HTMLPreview
              html={project.description || ''}
              placeholder="Tap to edit project description..."
              maxLines={3}
            />
          </View>
        </TouchableOpacity>
      </View>
    </CollapsibleCard>
  );
}
