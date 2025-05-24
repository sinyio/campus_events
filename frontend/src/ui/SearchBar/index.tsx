import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { styles } from './styles'

interface SearchBarProps {
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
    placeholder = 'Search...',
    value,
    onChange,
}) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor="#68686B"
                value={value}
                onChangeText={onChange}
            />
        </View>
    );
};

export default SearchBar; 