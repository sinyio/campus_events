import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { styles } from './styles';

interface ChipProps {
    active?: boolean;
    children: React.ReactNode;
    onPress?: () => void;
}


export const Chip: React.FC<ChipProps> = ({
    active = false,
    children,
    onPress
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                styles.container,
                active && styles.activeContainer,
            ]}
        >
            <Text style={[
                styles.text,
                active && styles.activeText,
            ]}>
                {children}
            </Text>
        </TouchableOpacity>
    );
};

export default Chip;
