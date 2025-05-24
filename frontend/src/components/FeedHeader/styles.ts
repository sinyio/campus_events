import { StyleSheet } from 'react-native';
import { ColorKey } from '../../types/theme';

export const createStyles = (getColor: (key: ColorKey) => string) =>
  StyleSheet.create({
    container: {
      backgroundColor: getColor('surface'),
      paddingBottom: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 3,
    },
    headerContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
    },
    categoriesContainer: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginRight: 12,
      gap: 10,
    },
    filterButton: {
      padding: 8,
      borderRadius: 8,
      backgroundColor: getColor('surface'),
      borderWidth: 1,
      borderColor: getColor('border'),
    },
    loadingContainer: {
      padding: 16,
      alignItems: 'center',
    },
    // Skeleton styles
    skeletonContainer: {
      width: '100%',
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      overflow: 'hidden',
    },
    skeletonChip: {
      width: 80,
      height: 30,
      borderRadius: 16,
      backgroundColor: '#EBEBEB',
    },
  });