import {StyleSheet} from 'react-native';
import {FONTS} from '@/constants';

export const styles = StyleSheet.create({
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
    color: '#333333',
    marginBottom: 4,
  },
  cardContent: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  certificationDetail: {
    fontSize: 14,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    color: '#828282',
    marginBottom: 8,
  },
});
