import { StyleSheet } from 'react-native';
import { theme } from '../config/theme';

export const styles = StyleSheet.create({
  header: {
    backgroundColor: theme.colors.light.surface,
    // borderBottomLeftRadius: 24,
    // borderBottomRightRadius: 24,
    paddingTop: 70,
    paddingBottom: 16,
    paddingHorizontal: 16,
    height: 110,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  tabBar: {
    height: 94,
    backgroundColor: theme.colors.light.surface,
    // borderTopLeftRadius: 24,
    // borderTopRightRadius: 24,
    paddingTop: 16,
  },
  tabBarItem: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  tabBarLabel: {
    marginTop: 10,
    fontWeight: 200,
    fontSize: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    paddingBottom: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 