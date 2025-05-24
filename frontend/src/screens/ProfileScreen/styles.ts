import { StyleSheet } from 'react-native';

type ThemeColors = {
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  primary: string;
  border: string;
  textOnPrimary: string;
};

export const createStyles = (colors: ThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
  },
  userInfo: {
    marginBottom: 40,
  },
  userName: {
    fontSize: 46,
    fontWeight: 'bold',
    color: colors.text,
  },
  userEmail: {
    fontSize: 16,
    color: '#68686B',
  },
  sectionTitle: {
    fontSize: 30,
    color: colors.text,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  navigationBlocks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
  },
  block: {
    flex: 1,
    aspectRatio: 0.88,
    borderRadius: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  blockBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    borderRadius: 24,
    overflow: 'hidden',
  },
  blockText: {
    fontSize: 21,
    fontWeight: '500',
    paddingBottom: 20,
    marginHorizontal: 'auto',
    color: '#F7F7F7',
  },
}); 