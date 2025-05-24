import { StyleSheet } from 'react-native';

type ThemeColors = {
  background: string;
  text: string;
  isDark: boolean;
};

export const createStyles = (colors: ThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  imageContainer: {
    position: 'relative',
    overflow: 'hidden',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerImage: {
    width: '100%',
    height: 350,
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    overflow: 'hidden',
  },
  backButton: {
    position: 'absolute',
    top: 48,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  favoriteButtonContainer: {
    position: 'absolute',
    top: 48,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  headerContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    zIndex: 2,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#F7F7F7',
    marginBottom: 16,
  },
  content: {
    padding: 20,
    paddingTop: 40,
  },
  section: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    color: colors.isDark ? '#F7F7F7' : '#1E1E1F',
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 16,
    color: colors.isDark ? '#F7F7F7' : '#1E1E1F',
  },
  dateTimeContainer: {
    flexDirection: 'column',
    gap: 4,
  },
  dateTimeText: {
    fontSize: 16,
    color: colors.text,
  },
}); 