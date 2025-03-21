import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

const CustomButton = ({ title, handlePress, containerStyles, textStyles, isLoading }) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={[
        styles.buttonContainer, // Default styles for the button
        containerStyles, // Additional container styles passed as props
        isLoading && styles.disabledButton, // Apply opacity when loading
      ]}
      disabled={isLoading} // Disable the button when loading
    >
      {isLoading ? (
        <ActivityIndicator size="small" color="#FFFFFF" style={styles.loader} />
      ) : (
        <Text style={[styles.buttonText, textStyles]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

// Stylesheet
const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#FFA001', // Replace with your secondary color
    borderRadius: 16, // rounded-xl
    minHeight: 62, // min-h-[62px]
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16, // Ensure padding for touch area
  },
  buttonText: {
    color: '#FFFFFF', // Replace with your primary color
    fontFamily: 'Poppins-SemiBold', // Assuming you're using Poppins-SemiBold
    fontSize: 18, // text-lg equivalent
  },
  disabledButton: {
    opacity: 0.5, // Set the opacity to 50% when loading
  },
  loader: {
    // Ensures that the ActivityIndicator doesn't overlap with the text
    padding: 10, 
  },
});
