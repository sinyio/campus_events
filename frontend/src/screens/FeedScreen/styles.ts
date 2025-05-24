import { StyleSheet } from 'react-native';
import { ColorKey } from '../../types/theme';

export const createStyles = (getColor: (color: ColorKey) => string) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: getColor('background'),
  },
  header: {
    marginBottom: 16,
  },
  titleContainer: {
    paddingHorizontal: 16,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 60,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: getColor('text'),
    marginBottom: 4,
  },
  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '300',
    color: '#68686B',
  },
}); 