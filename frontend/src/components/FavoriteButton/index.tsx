import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Heart } from '../../ui/Icons/Heart';
import { useTheme } from '../../context/ThemeContext';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onPress: () => void;
  transparent?: boolean;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  isFavorite = true,
  onPress,
  transparent = false,
}) => {
  const { isDark } = useTheme();
  const styles = createStyles(isDark, transparent);

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
    >
      <Heart isFavorite={isFavorite} />
    </TouchableOpacity>
  );
};

const createStyles = (isDark: boolean, transparent: boolean) => StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: transparent ? 'transparent' : 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
});
