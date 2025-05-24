import { StyleSheet } from 'react-native';
import { ColorKey } from '../../types/theme';

export const createStyles = (getColor: (key: ColorKey) => string) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: getColor('background'),
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      padding: 16,
    },
    calendarButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: getColor('surface'),
      justifyContent: 'center',
      alignItems: 'center',
    },
    calendarButtonActive: {
      backgroundColor: getColor('primary'),
    },
    eventsContainer: {
      flex: 1,
      // marginTop: 16,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: getColor('text'),
      marginBottom: 16,
    },
  }); 