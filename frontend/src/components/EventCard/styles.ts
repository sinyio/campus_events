import { StyleSheet } from 'react-native';
import { ThemeColors } from '../../config/theme';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      height: 160,
      borderRadius: 24,
      overflow: 'hidden',
      marginBottom: 10,
      backgroundColor: colors.surface,
    },
    image: {
      width: '100%',
      height: '100%',
      position: 'absolute',
    },
    gradient: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      zIndex: 1,
    },
    favoriteButtonContainer: {
      position: 'absolute',
      top: 10,
      right: 10,
      zIndex: 3,
    },
    content: {
      flex: 1,
      padding: 16,
      justifyContent: 'flex-end',
      zIndex: 2,
    },
    category: {
      color: '#BFBFBF',
      fontSize: 14,
      marginBottom: 4,
    },
    title: {
      color: '#F7F7F7',
      fontSize: 21,
      fontWeight: 'bold',
      maxWidth: 220,
      // maxHeight: 50,
    },
    date: {
      color: '#F7F7F7',
      fontSize: 14,
      marginBottom: 'auto',
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    dateDay: {
      color: '#F7F7F7',
      fontSize: 25,
      marginRight: 4,
    },
    dateMonthText: {
      color: '#BFBFBF',
      fontSize: 14,
      lineHeight: 20,
    },
    dateMonthTextSeparator: {
      color: '#BFBFBF',
      fontSize: 30,
      lineHeight: 30,
      marginHorizontal: 4,
      marginTop: 5,
    },
  }); 