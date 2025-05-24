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
    paddingTop: 100,
    paddingLeft: 40,
    paddingRight: 40,
    backgroundColor: colors.background,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '300',
    color: '#F7F7F7',
    marginBottom: 210,
    textAlign: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 32,
    textAlign: 'center',
  },
  form: {
    width: '100%',
    alignItems: 'center',
  },
  loginContainer: {
    width: '100%',
    marginBottom: 10,
  },
  passwordContainer: {
    position: 'relative',
    marginBottom: 30,
    width: '100%',
  },
  eyeButton: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -23 }],
    zIndex: 1,
    padding: 8,
  },
}); 