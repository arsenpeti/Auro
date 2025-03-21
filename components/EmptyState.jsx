import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import { images } from '../constants';
import CostomButton from '../components/CustomButton';
import {router} from 'expo-router'

const EmptyState = () => {
  return (
    <View style={styles.container}>
      <Image 
        source={images.empty} 
        style={styles.image} 
        resizeMode="contain" 
      />
      <Text style={styles.text}>No video found</Text>
      <Text style={styles.text}>Be the first to upload</Text>

      <CostomButton 
        title='Create a video'
        handlePress={()=> router.push('create')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10, // Keeps spacing between elements
    alignItems: 'center', // Centers items horizontally
    justifyContent: 'center', // Centers items vertically (if inside a flex container)
  },
  image: {
    width: 250,
    height: 215,
  },
  text: {
    color: 'white',
    fontSize: 16, // ✅ Fixed: Number instead of string
    fontWeight: '600',
  },
});

export default EmptyState;
