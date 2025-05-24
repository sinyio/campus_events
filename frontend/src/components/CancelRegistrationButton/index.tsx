import React from 'react';
import Button from '../../ui/Button';
import { StyleSheet } from 'react-native';

interface CancelRegistrationButtonProps {
  onPress: () => void;
  disabled?: boolean;
}

export const CancelRegistrationButton: React.FC<CancelRegistrationButtonProps> = ({
  onPress,
  disabled = false,
}) => {
  return (
    <Button
      onPress={onPress}
      disabled={disabled}
      variant="destructive"
      style={styles.button}
    >
      Отменить регистрацию
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
  },
}); 