export type ThemeColors = {
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  primary: string;
  border: string;
  textOnPrimary: string;
};

export const theme = {
  colors: {
    light: {
      background: '#FFFFFF',
      surface: '#F7F7F7',
      text: '#1E1E1F',
      textSecondary: '#1E1E1F',
      primary: '#4790FF',
      border: '#E5E5E5',
      textOnPrimary: '#FFFFFF',
    },
    dark: {
      background: '#1E1E1F',
      surface: '#363638',
      text: '#F7F7F7',
      textSecondary: '#F7F7F7',
      primary: '#4790FF',
      border: '#363638',
      textOnPrimary: '#FFFFFF',
    },
  },
} as const; 