import React from "react";
import { TextInput, StyleSheet, TextInputProps } from "react-native";

interface InputProps extends TextInputProps {
  placeholder: string;
  secureTextEntry?: boolean;
  value: string;
  onChangeText: (text: string) => void;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  secureTextEntry = false,
  value,
  onChangeText,
  ...rest
}) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      placeholderTextColor="#888"
      value={value}
      onChangeText={onChangeText}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: "80%",
    height: 50,
    borderRadius: 25,
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 20,
    fontSize: 16,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
});

export default Input;
