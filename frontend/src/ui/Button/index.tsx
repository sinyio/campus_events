import React from 'react';
import { TouchableOpacity, Text, ViewStyle, TextStyle } from 'react-native';
import { styles } from './styles';

type ButtonSize = 's' | 'm';
type ButtonVariant = 'primary' | 'destructive';

interface ButtonProps {
  onPress: () => void;
  children: React.ReactNode;
  size?: ButtonSize;
  variant?: ButtonVariant;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onPress,
  children,
  size = 'm',
  variant = 'primary',
  style,
  textStyle,
  disabled = false,
}) => {
  const buttonStyles = [
    styles.button,
    size === 's' ? styles.sizeS : styles.sizeM,
    variant === 'primary' ? styles.primary : styles.destructive,
    disabled && styles.disabled,
    style,
  ];

  return (
    <TouchableOpacity 
      style={buttonStyles} 
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.text, textStyle]}>{children}</Text>
    </TouchableOpacity>
  );
};

export default Button; 