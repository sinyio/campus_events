import { StyleSheet } from 'react-native';

type ColorKey = 'background' | 'surface' | 'text' | 'textSecondary' | 'primary' | 'border' | 'textOnPrimary';

export const createStyles = (getColor: (color: ColorKey) => string) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: getColor('background'),
  },
  header: {
    backgroundColor: getColor('surface'),
    paddingBottom: 10,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  filterButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: getColor('surface'),
    borderWidth: 1,
    borderColor: getColor('border'),
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
    paddingHorizontal: 16,
    paddingBottom: 16,
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
}); 