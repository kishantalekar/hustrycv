import {StyleSheet} from 'react-native';
import {FONTS} from '@/constants';

export const styles = StyleSheet.create({
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
  skillCard: {
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
  skillName: {
    fontSize: 16,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    color: '#333',
    marginBottom: 4,
  },
  skillLevel: {
    fontSize: 14,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    color: '#666',
  },
  cardContent: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  skillDetail: {
    fontSize: 14,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    color: '#666',
    marginBottom: 8,
  },
  keywordsSection: {
    marginTop: 8,
  },
  keywordsTitle: {
    fontSize: 14,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    color: '#666',
    marginBottom: 8,
  },
  keywordsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  keywordItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  keywordText: {
    flex: 1,
    fontSize: 14,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    color: '#666',
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
  addButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    fontSize: 16,
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
  addFormHeader: {
    marginBottom: 16,
  },
  addFormTitle: {
    fontSize: 18,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    color: '#666',
  },
  newSkillTitle: {
    fontSize: 20,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 4,
    padding: 12,
    marginBottom: 12,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    fontSize: 15,
    color: '#333',
  },
  label: {
    fontSize: 16,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    color: '#666',
    marginBottom: 8,
  },
  levelSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  levelChip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    marginRight: 8,
  },
  selectedLevelChip: {
    backgroundColor: '#007AFF',
  },
  levelChipText: {
    color: '#666',
    fontSize: 14,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
  },
  selectedLevelChipText: {
    color: 'white',
  },
  keywordsContainer: {
    marginBottom: 12,
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
  addKeywordButton: {
    backgroundColor: '#007AFF',
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 8,
  },
  addKeywordButtonText: {
    color: 'white',
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    fontSize: 14,
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
  disabledButton: {
    opacity: 0.6,
  },
});
