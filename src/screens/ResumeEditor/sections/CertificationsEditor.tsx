import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TextInput} from '@/components/TextInput';
import {FONTS} from '@/constants';
import {useResumeStore} from '@/store/useResumeStore';
import {globalStyles} from '@/styles/globalStyles';

export const CertificationsEditor = () => {
  const {
    getActiveResume,
    addCertification,
    removeCertification,
    updateCertification,
  } = useResumeStore();
  const certifications = getActiveResume().sections.certifications;
  const [expandedItems, setExpandedItems] = useState<{[key: string]: boolean}>(
    {},
  );
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCertification, setNewCertification] = useState({
    name: '',
    authority: '',
    certificationUrlOrCode: '',
    issueDate: '',
    description: '',
  });

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleAddCertification = () => {
    if (newCertification.name && newCertification.authority) {
      addCertification(newCertification);
      setNewCertification({
        name: '',
        authority: '',
        certificationUrlOrCode: '',
        issueDate: '',
        description: '',
      });
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={globalStyles.keyboardAvoidingView}>
      <ScrollView style={styles.container}>
        <View style={styles.section}>
          {certifications?.items.map(cert => (
            <View key={cert.id} style={styles.certificationCard}>
              <TouchableOpacity
                style={styles.cardHeader}
                onPress={() => toggleExpand(cert.id)}>
                <View>
                  <Text style={styles.certificationName}>{cert.name}</Text>
                  <Text style={styles.certificationDate}>{cert.issueDate}</Text>
                </View>
                <Icon
                  name={expandedItems[cert.id] ? 'expand-less' : 'expand-more'}
                  size={24}
                  color="#666"
                />
              </TouchableOpacity>
              {expandedItems[cert.id] && (
                <View style={styles.cardContent}>
                  <TextInput
                    label="Certification Name"
                    placeholder="Enter certification name"
                    value={cert.name}
                    onChangeText={text =>
                      updateCertification(cert.id, {...cert, name: text})
                    }
                  />
                  <TextInput
                    label="Authority"
                    placeholder="Enter issuing authority"
                    value={cert.authority}
                    onChangeText={text =>
                      updateCertification(cert.id, {...cert, authority: text})
                    }
                  />
                  <TextInput
                    label="Certification URL/Code"
                    placeholder="Enter URL or certification code"
                    value={cert.certificationUrlOrCode}
                    onChangeText={text =>
                      updateCertification(cert.id, {
                        ...cert,
                        certificationUrlOrCode: text,
                      })
                    }
                  />
                  <TextInput
                    label="Issue Date"
                    placeholder="e.g., 2023-09"
                    value={cert.issueDate}
                    onChangeText={text =>
                      updateCertification(cert.id, {...cert, issueDate: text})
                    }
                  />
                  <TextInput
                    label="Description"
                    placeholder="Enter certification description"
                    value={cert.description}
                    onChangeText={text =>
                      updateCertification(cert.id, {...cert, description: text})
                    }
                    multiline
                    style={{height: 80}}
                  />
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => removeCertification(cert.id)}>
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))}
        </View>

        <View style={styles.section}>
          {!showAddForm ? (
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setShowAddForm(true)}>
              <Text style={styles.addButtonText}>Add New Certification</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.inputContainer}>
              <View style={styles.addFormHeader}>
                {newCertification.name ? (
                  <Text style={styles.newCertificationTitle}>
                    {newCertification.name}
                  </Text>
                ) : (
                  <Text style={styles.addFormTitle}>Add New Certification</Text>
                )}
                {!!newCertification.issueDate && (
                  <Text style={styles.newCertificationDate}>
                    {newCertification.issueDate}
                  </Text>
                )}
              </View>

              <TextInput
                label="Certification Name *"
                placeholder="Enter certification name"
                value={newCertification.name}
                onChangeText={text =>
                  setNewCertification(prev => ({...prev, name: text}))
                }
                error={
                  !newCertification.name ? 'Certification name is required' : ''
                }
              />
              <TextInput
                label="Issuing Authority *"
                placeholder="Enter issuing authority"
                value={newCertification.authority}
                onChangeText={text =>
                  setNewCertification(prev => ({...prev, authority: text}))
                }
                error={
                  !newCertification.authority ? 'Authority is required' : ''
                }
              />
              <TextInput
                label="Certification URL or Code"
                placeholder="Enter URL or certification code"
                value={newCertification.certificationUrlOrCode}
                onChangeText={text =>
                  setNewCertification(prev => ({
                    ...prev,
                    certificationUrlOrCode: text,
                  }))
                }
              />
              <TextInput
                label="Issue Date *"
                placeholder="e.g., 2023-09"
                value={newCertification.issueDate}
                onChangeText={text =>
                  setNewCertification(prev => ({...prev, issueDate: text}))
                }
                error={
                  !newCertification.issueDate ? 'Issue date is required' : ''
                }
              />
              <TextInput
                label="Description"
                placeholder="Enter certification description (optional)"
                value={newCertification.description}
                onChangeText={text =>
                  setNewCertification(prev => ({...prev, description: text}))
                }
                multiline
                style={{height: 80}}
              />

              <View style={styles.formButtons}>
                <TouchableOpacity
                  style={[styles.formButton, styles.cancelButton]}
                  // onPress={handleCancelAdd}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.formButton,
                    styles.saveButton,
                    (!newCertification.name || !newCertification.authority) &&
                      styles.disabledButton,
                  ]}
                  onPress={handleAddCertification}
                  disabled={
                    !newCertification.name || !newCertification.authority
                  }>
                  <Text style={styles.saveButtonText}>Save Certification</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: FONTS.FIRA_SANS.BOLD,
    marginBottom: 16,
    color: '#333',
  },
  addFormHeader: {
    marginBottom: 16,
  },
  // addFormHeader: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   marginBottom: 16,
  // },
  closeButton: {
    padding: 8,
  },
  formButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  formButton: {
    flex: 1,
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#007AFF',
  },
  cancelButton: {
    backgroundColor: '#E0E0E0',
  },
  saveButtonText: {
    color: 'white',
    fontFamily: FONTS.FIRA_SANS.REGULAR,
  },
  cancelButtonText: {
    color: '#666',
    fontFamily: FONTS.FIRA_SANS.REGULAR,
  },
  // Update existing addButton style
  addButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  addFormTitle: {
    fontSize: 18,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    color: '#666',
  },
  newCertificationTitle: {
    fontSize: 20,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    color: '#333',
  },
  newCertificationDate: {
    fontSize: 14,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    color: '#666',
    marginTop: 4,
  },
  inputContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  // addButton: {
  //   backgroundColor: '#007AFF',
  //   padding: 12,
  //   borderRadius: 6,
  //   alignItems: 'center',
  //   marginTop: 8,
  // },
  disabledButton: {
    opacity: 0.6,
  },
  addButtonText: {
    color: 'white',
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    fontSize: 16,
  },
  certificationCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 16,
  },
  certificationName: {
    fontSize: 16,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    color: '#333',
    marginBottom: 4,
  },
  certificationDate: {
    fontSize: 14,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    color: '#666',
  },
  cardContent: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  certificationDetail: {
    fontSize: 14,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    color: '#666',
    marginBottom: 8,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 12,
  },
  deleteButtonText: {
    color: 'white',
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    fontSize: 14,
  },
});
