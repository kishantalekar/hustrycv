import {View, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Button} from '@/components';
import {HTMLPreview} from '@/components/HTMLPreview/HTMLPreview';
import {Project} from '@/components/ResumePreview/ResumePreview.types';
import {TextInput} from '@/components/TextInput';
import {ProjectItem} from '@/store/useResumeStore';
import {styles} from './ProjectsEditor.styles';

interface ProjectCardProps {
  project: ProjectItem;
  expandedItemId: string;
  toggleExpand: (id: string) => void;
  updateProject: (id: string, project: Project) => void;
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
          <TextInput
            label="Project URL"
            placeholder="Enter project URL (optional)"
            value={project.url}
            onChangeText={text =>
              updateProject(project.id, {...project, url: text})
            }
          />

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
