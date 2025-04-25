import React, {useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {ProjectItem, useResumeStore} from '../../../store/useResumeStore';
import {Button, Card, TextInput, IconButton} from 'react-native-paper';

export const ProjectsEditor = () => {
  const {sections, addProject, updateProject, removeProject} = useResumeStore();
  const [newHighlight, setNewHighlight] = useState('');
  const [editingProject, setEditingProject] = useState<Partial<ProjectItem>>(
    {},
  );

  const handleAddProject = () => {
    if (editingProject.name && editingProject.description) {
      addProject({
        name: editingProject.name,
        description: editingProject.description,
        url: editingProject.url || '',
        highlights: editingProject.highlights || [],
      });
      setEditingProject({});
    }
  };

  const handleAddHighlight = () => {
    if (newHighlight && editingProject.id) {
      const currentHighlights = editingProject.highlights || [];
      updateProject(editingProject.id, {
        highlights: [...currentHighlights, newHighlight],
      });
      setNewHighlight('');
    } else if (newHighlight) {
      setEditingProject(prev => ({
        ...prev,
        highlights: [...(prev.highlights || []), newHighlight],
      }));
      setNewHighlight('');
    }
  };

  const handleRemoveHighlight = (projectId: string, index: number) => {
    const project = sections.projects.items.find(p => p.id === projectId);
    if (project) {
      const newHighlights = [...project.highlights];
      newHighlights.splice(index, 1);
      updateProject(projectId, {highlights: newHighlights});
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Add New Project" />
        <Card.Content>
          <TextInput
            label="Project Name"
            value={editingProject.name || ''}
            onChangeText={text =>
              setEditingProject(prev => ({...prev, name: text}))
            }
            style={styles.input}
          />
          <TextInput
            label="Description"
            value={editingProject.description || ''}
            onChangeText={text =>
              setEditingProject(prev => ({...prev, description: text}))
            }
            multiline
            style={styles.input}
          />
          <TextInput
            label="Project URL"
            value={editingProject.url || ''}
            onChangeText={text =>
              setEditingProject(prev => ({...prev, url: text}))
            }
            style={styles.input}
          />
          <View style={styles.highlightsContainer}>
            <TextInput
              label="Add Highlight"
              value={newHighlight}
              onChangeText={setNewHighlight}
              style={styles.input}
            />
            <Button mode="contained" onPress={handleAddHighlight}>
              Add Highlight
            </Button>
          </View>
          {editingProject.highlights?.map((highlight, index) => (
            <View key={index} style={styles.highlightItem}>
              <TextInput
                value={highlight}
                disabled
                style={styles.highlightInput}
              />
              <IconButton
                icon="delete"
                onPress={() =>
                  setEditingProject(prev => ({
                    ...prev,
                    highlights: prev.highlights?.filter((_, i) => i !== index),
                  }))
                }
              />
            </View>
          ))}
          <Button
            mode="contained"
            onPress={handleAddProject}
            style={styles.addButton}>
            Add Project
          </Button>
        </Card.Content>
      </Card>

      {sections.projects.items.map(project => (
        <Card key={project.id} style={styles.card}>
          <Card.Title
            title={project.name}
            right={props => (
              <IconButton
                {...props}
                icon="delete"
                onPress={() => removeProject(project.id)}
              />
            )}
          />
          <Card.Content>
            <TextInput
              label="Project Name"
              value={project.name}
              onChangeText={text => updateProject(project.id, {name: text})}
              style={styles.input}
            />
            <TextInput
              label="Description"
              value={project.description}
              onChangeText={text =>
                updateProject(project.id, {description: text})
              }
              multiline
              style={styles.input}
            />
            <TextInput
              label="Project URL"
              value={project.url}
              onChangeText={text => updateProject(project.id, {url: text})}
              style={styles.input}
            />
            <View style={styles.highlightsContainer}>
              <TextInput
                label="Add Highlight"
                value={newHighlight}
                onChangeText={setNewHighlight}
                style={styles.input}
              />
              <Button
                mode="contained"
                onPress={() => {
                  if (newHighlight) {
                    updateProject(project.id, {
                      highlights: [...project.highlights, newHighlight],
                    });
                    setNewHighlight('');
                  }
                }}>
                Add Highlight
              </Button>
            </View>
            {project.highlights.map((highlight, index) => (
              <View key={index} style={styles.highlightItem}>
                <TextInput
                  value={highlight}
                  onChangeText={text => {
                    const newHighlights = [...project.highlights];
                    newHighlights[index] = text;
                    updateProject(project.id, {highlights: newHighlights});
                  }}
                  style={styles.highlightInput}
                />
                <IconButton
                  icon="delete"
                  onPress={() => handleRemoveHighlight(project.id, index)}
                />
              </View>
            ))}
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  input: {
    marginBottom: 12,
  },
  highlightsContainer: {
    marginBottom: 12,
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  highlightInput: {
    flex: 1,
    marginRight: 8,
  },
  addButton: {
    marginTop: 16,
  },
});
