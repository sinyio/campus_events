import { StyleSheet } from 'react-native';
import { ColorKey } from '../../types/theme';

export const createStyles = (getColor: (key: ColorKey) => string) =>
  StyleSheet.create({
    modalContainer: {
      position: 'absolute',
      top: 56,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: getColor('background'),
    },
    modalContent: {
      backgroundColor: getColor('background'),
      width: '100%',
      height: '100%',
      padding: 20,
      justifyContent: 'space-between',
    },
    contentContainer: {
      flex: 1,
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      color: getColor('text'),
      marginBottom: 20,
    },
    section: {
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 21,
      fontWeight: '600',
      color: getColor('text'),
      marginBottom: 10,
    },
    categoryContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
    },
    categoryChip: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: getColor('primary'),
    },
    categoryChipActive: {
      backgroundColor: getColor('primary'),
    },
    categoryChipText: {
      color: getColor('primary'),
    },
    categoryChipTextActive: {
      color: getColor('textOnPrimary'),
    },
    statusContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
    },
    statusChip: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: getColor('primary'),
    },
    statusChipActive: {
      backgroundColor: getColor('primary'),
    },
    statusChipText: {
      color: getColor('primary'),
    },
    statusChipTextActive: {
      color: getColor('textOnPrimary'),
    },
    buttonContainer: {
      gap: 10,
      marginTop: 20,
    },
    button: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 8,
      width: '100%',
      alignItems: 'center',
    },
    cancelButton: {
      backgroundColor: '#363638',
    },
    applyButton: {
      backgroundColor: getColor('primary'),
    },
    buttonText: {
      fontSize: 16,
      fontWeight: '500',
    },
    cancelButtonText: {
      color: getColor('text'),
    },
    applyButtonText: {
      color: getColor('textOnPrimary'),
    },
  }); 