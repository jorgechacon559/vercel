
import { Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors, buttonStyles } from '../styles/commonStyles';

interface ButtonProps {
    text: string;
    onPress: () => void;
    style?: ViewStyle | ViewStyle[];
    textStyle?: TextStyle;
    disabled?: boolean;
}

const Button = ({ text, onPress, style, textStyle, disabled = false }: ButtonProps) => {
    return (
        <TouchableOpacity 
            style={[
                buttonStyles.button, 
                disabled && { backgroundColor: colors.gray, opacity: 0.6 },
                style
            ]} 
            onPress={onPress}
            disabled={disabled}
        >
            <Text style={[
                buttonStyles.buttonText, 
                disabled && { color: colors.white },
                textStyle
            ]}>
                {text}
            </Text>
        </TouchableOpacity>
    );
};

export default Button;
