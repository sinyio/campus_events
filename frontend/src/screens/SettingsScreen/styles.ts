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
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.text,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.surface,
    borderRadius: 20,
    marginBottom: 12,
  },
  buttonText: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 12,
  },
  icon: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: colors.text,
    borderRadius: 12,
  },
  iconFilled: {
    backgroundColor: colors.text,
  },
}); 