import { StyleSheet } from 'react-native';

type ColorKey = 'background' | 'surface' | 'text' | 'textSecondary' | 'primary' | 'border' | 'textOnPrimary';

export const createStyles = (getColor: (color: ColorKey) => string) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: getColor('background'),
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    backgroundColor: getColor('surface'),
    borderRadius: 8,
    padding: 12,
    marginRight: 12,
    color: getColor('text'),
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: getColor('surface'),
  },
  filterButtonText: {
    color: getColor('text'),
    fontSize: 14,
    fontWeight: '500',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: getColor('text'),
    marginBottom: 16,
  },
  emptyText: {
    color: getColor('textSecondary'),
    textAlign: 'center',
    marginTop: 20,
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
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 16,
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
}); 