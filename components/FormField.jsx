import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { icons } from '../constants';

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <View style={[styles.formFieldContainer, otherStyles]}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={title.toLowerCase() === 'password' && !showPassword} // Using case insensitive check
          {...props} // Allow other props like keyboardType or maxLength
        />
        
        {title.toLowerCase() === 'password' && (
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.eyeIconContainer}
            accessibilityLabel="Toggle password visibility"
          >
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              style={styles.eyeIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;

// Styles
const styles = StyleSheet.create({
  formFieldContainer: {
    marginBottom: 16, // Space between form fields (space-y-2 equivalent)
  },
  title: {
    fontSize: 16, // text-base
    color: '#D1D3D8', // text-gray-100
    fontFamily: 'Poppins-Medium', // Assuming font-pmedium is a medium weight font
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2E', // bg-black-100 equivalent (dark background for input field)
    borderRadius: 20, // rounded-2xl equivalent
    borderWidth: 2,
    borderColor: '#333333', // border-black-200 equivalent (dark border color)
    height: 64, // h-16 equivalent (for input height)
    paddingHorizontal: 16, // px-4 equivalent
  },
  input: {
    flex: 1,
    fontSize: 16, // text-base
    color: '#FFFFFF', // white text
    fontFamily: 'Poppins-SemiBold', // font-psemibold
  },
  eyeIconContainer: {
    padding: 8,
  },
  eyeIcon: {
    width: 24,
    height: 24,
  },
});
