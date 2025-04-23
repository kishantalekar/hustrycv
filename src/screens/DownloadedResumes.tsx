import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {FONTS} from '../constants';
import {
  loadDownloadedResumes,
  openResume,
  deleteResume,
} from '../utils/fileUtils';
interface DownloadedResume {
  name: string;
  path: string;
  createdDate: Date;
}

const DownloadedResumes = () => {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    marginBottom: 16,
    color: '#333',
  },
  listContainer: {
    flexGrow: 1,
  },
  resumeItem: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  resumeContent: {
    flex: 1,
  },
  deleteButton: {
    backgroundColor: '#DC3545',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    marginLeft: 12,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 14,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
  },
  resumeName: {
    fontSize: 16,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    color: '#333',
    marginBottom: 4,
  },
  resumeDate: {
    fontSize: 14,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    color: '#666',
  },
});

export default DownloadedResumes;
