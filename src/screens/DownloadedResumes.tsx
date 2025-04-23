import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {FONTS} from '../constants';
import {loadDownloadedResumes, openResume} from '../utils/fileUtils';
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

  const renderItem = ({item}: {item: DownloadedResume}) => (
    <TouchableOpacity
      style={styles.resumeItem}
      onPress={() => openResume(item.path)}>
      <Text style={styles.resumeName}>{item.name}</Text>
      <Text style={styles.resumeDate}>
        {item.createdDate.toLocaleDateString()}
      </Text>
    </TouchableOpacity>
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
