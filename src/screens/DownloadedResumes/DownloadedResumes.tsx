import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, Alert} from 'react-native';
import {styles} from './DownloadedResumes.styles';
import {
  loadDownloadedResumes,
  openResume,
  deleteResume,
} from '../../utils/fileUtils';
interface DownloadedResume {
  name: string;
  path: string;
  createdDate: Date;
}

export const DownloadedResumes = () => {
  const [resumes, setResumes] = useState<DownloadedResume[]>([]);

  useEffect(() => {
    loadDownloadedResumes().then(data => {
      setResumes(data);
    });
  }, []);

  const handleDelete = (resume: DownloadedResume) => {
    Alert.alert(
      'Delete Resume',
      `Are you sure you want to delete ${resume.name}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const success = await deleteResume(resume.path);
            if (success) {
              setResumes(prev =>
                prev.filter(item => item.path !== resume.path),
              );
            }
          },
        },
      ],
    );
  };

  const renderItem = ({item}: {item: DownloadedResume}) => (
    <View style={styles.resumeItem}>
      <TouchableOpacity
        style={styles.resumeContent}
        onPress={() => openResume(item.path)}>
        <Text style={styles.resumeName}>{item.name}</Text>
        <Text style={styles.resumeDate}>
          {item.createdDate.toLocaleDateString()}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item)}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Downloaded Resumes</Text>
      {resumes.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No downloaded resumes found</Text>
        </View>
      ) : (
        <FlatList
          data={resumes}
          renderItem={renderItem}
          keyExtractor={item => item.path}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};
