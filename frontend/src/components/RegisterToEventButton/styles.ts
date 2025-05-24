import { StyleSheet } from 'react-native';

export const createStyles = () => StyleSheet.create({
  registerButton: {
    width: '100%',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '300',
  },
});
