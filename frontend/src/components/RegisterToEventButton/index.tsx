import React from 'react';
import { View, Text } from 'react-native';
import Button from '../../ui/Button';
import { Ticket } from '../../ui/Icons/Ticket';
import { createStyles } from './styles';

interface RegisterToEventButtonProps {
  onPress: () => void;
  disabled?: boolean;
}

const RegisterToEventButton: React.FC<RegisterToEventButtonProps> = ({ onPress, disabled }) => {
  const styles = createStyles();

  return (
    <Button 
      onPress={onPress}
      variant="primary"
      style={styles.registerButton}
      disabled={disabled}
    >
      <View style={styles.buttonContent}>
        <Text style={styles.buttonText}>Зарегистрироваться</Text>
        <Ticket />
      </View>
    </Button>
  );
};

export default RegisterToEventButton;
