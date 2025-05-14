import { useTheme } from '../context/ThemeContext';
import { theme } from '../config/theme';

type ColorKey = keyof typeof theme.colors.light;

export const useThemeStyles = () => {
  const { isDark } = useTheme();

  const getColor = (colorKey: ColorKey) => {
    return isDark ? theme.colors.dark[colorKey] : theme.colors.light[colorKey];
  };

  return {
    getColor,
    isDark,
  };
}; 