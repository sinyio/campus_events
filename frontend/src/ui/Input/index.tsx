import React from 'react';
import { TextInput, TextInputProps, View } from 'react-native';
import { styles } from './styles';

interface InputProps extends TextInputProps {
  children?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ children, ...props }) => {
  return (
    <View style={styles.container}>
      <TextInput
        {...props}
        style={[styles.input, props.style]}
        placeholderTextColor="#1E1E1F"
      />
      {children}
    </View>
  );
}; 