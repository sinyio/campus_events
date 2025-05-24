import { StyleSheet } from 'react-native';
import { ColorKey } from '../../types/theme';

export const createStyles = (getColor: (key: ColorKey) => string) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: getColor('background'),
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingTop: 16,
      paddingBottom: 8,
      height: 70,
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      color: getColor('text'),
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },
    errorText: {
      color: getColor('textSecondary'),
      textAlign: 'center',
      marginBottom: 16,
    },
    retryButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      backgroundColor: getColor('primary'),
      borderRadius: 8,
    },
    retryButtonText: {
      color: getColor('textOnPrimary'),
      fontSize: 14,
      fontWeight: '500',
    },
    listContent: {
      flexGrow: 1,
      padding: 16,
      paddingBottom: 8,
    },
    loadMoreButton: {
      padding: 16,
      alignItems: 'center',
    },
    emptyContainer: {
      flex: 1,
      minHeight: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 100
    },
    emptyText: {
      color: getColor('textSecondary'),
      textAlign: 'center',
    },
  }); 