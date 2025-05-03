import {View, TouchableOpacity, Text} from 'react-native';
import {Divider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Button, Checkbox, DateInputRow} from '@/components';
import {HTMLPreview} from '@/components/HTMLPreview/HTMLPreview';
import {TextInput} from '@/components/TextInput';
import {globalStyles} from '@/styles/globalStyles';
import {COLORS} from '@/theme';
import {ProjectItem} from '@/types';
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
  return (
    <View key={project.id} style={styles.projectCard}>
      <TouchableOpacity
        style={styles.cardHeader}
        onPress={() => toggleExpand(project.id)}>
        <View>
          <Text style={styles.projectName}>
            {project.name.length ? project.name : 'Project'}
          </Text>
          {!!project.url && (
            <Text style={styles.projectUrl}>
              {project.url.length ? project.url : 'Url'}
            </Text>
          )}
        </View>
        <Icon
          name={expandedItemId === project.id ? 'expand-less' : 'expand-more'}
          size={24}
          color="#666"
        />
      </TouchableOpacity>
      {expandedItemId === project.id && (
        <View style={styles.cardContent}>
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
          {/* <Button
            title="Configure Project"
            onPress={() =>
              navigation.navigate('ProjectConfig', {
                id: project.id,
              })
            }
            style={styles.configButton}
          /> */}
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

          <Button
            title="Delete"
            variant="danger"
            onPress={() => removeProject(project.id)}
          />
        </View>
      )}
    </View>
  );
}
