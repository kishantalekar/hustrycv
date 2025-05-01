import {StyleSheet, Dimensions} from 'react-native';
import {FONTS} from '@/constants';

const {width} = Dimensions.get('window');

export const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
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
    flex: 1,
  },
  flex1: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  pickerContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingBottom: 20,
  },
  pickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  pickerButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  pickerButtonText: {
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    fontSize: 16,
    color: '#1565C0',
  },
  doneButton: {
    color: '#FA6607',
    fontFamily: FONTS.FIRA_SANS.MEDIUM,
  },
  picker: {
    width: width,
    height: 200,
  },
});
