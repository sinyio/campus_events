import { StyleSheet } from 'react-native';
import { ColorKey } from '../../types/theme';

export const createStyles = (getColor: (key: ColorKey) => string) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: getColor('background'),
      height: '100%',
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
    emptyListContent: {
      flex: 1,
      justifyContent: 'center',
    },
    loadMoreButton: {
      padding: 16,
      alignItems: 'center',
    },
    loadMoreText: {
      color: getColor('primary'),
      fontSize: 14,
      fontWeight: '500',
    },
    emptyContainer: {
      flex: 1,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },
    emptyText: {
      color: getColor('textSecondary'),
      textAlign: 'center',
      paddingBottom: 8,
    },
  }); 