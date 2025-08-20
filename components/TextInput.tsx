
import React from 'react';
import { TextInput as RNTextInput, StyleSheet, View, TextInputProps } from 'react-native';
import { colors } from '../styles/commonStyles';

export default function TextInput({ style, ...props }: TextInputProps) {
  return (
    <View style={[styles.container, style]}>
      <RNTextInput
        style={styles.input}
        placeholderTextColor={colors.text}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    height: 56,
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#eee'
  },
  input: {
    fontSize: 16,
    color: colors.text,
  },
});
