import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import CustomButton from '../components/CustomButton';
import { images } from '../constants'; 

import {useGlobalContext} from '../context/GlobalProvider'

export default function App() {
    const { loading, isLogged } = useGlobalContext();
  
    if (!loading && isLogged) return <Redirect href="/home" />;
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.contentContainer}>
          <Image
            source={images.logo}
            style={styles.logo}
            resizeMode="contain"
          />
          
          <Image
            source={images.cards}
            style={styles.cardImage}
            resizeMode="center"
          />
          
          <View style={styles.textContainer}>
            <Text style={styles.heading}>
              Discover endless possibilities with {' '}
            </Text>
            <Text style={styles.auroText}> {/* Apply the specific style to "Auro!" text */}
              Auro!
            </Text>
            <Image 
              source={images.path}
              style={styles.pathImage}
              resizeMode="contain"
            />
          </View>
          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push('/sign-in')}
            containerStyles={styles.buttonContainer} // Applying styles directly
          />
          <Text style={styles.description}>
            Where creativity meets innovation: embark on a journey of limitless exploration with Auro
          </Text>
        </View>
      </ScrollView>
      <StatusBar backgroundColor='#161622' style='light'/>
    </SafeAreaView>
  );
}

// StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D1E22', // Dark background color
  },
  scrollContainer: {
    height: '100%',
    paddingVertical: 20, // Ensure padding on the top and bottom
  },
  contentContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '85%', // Set min height to 85% of the screen height
    paddingHorizontal: 16, // px-4 equivalent
    flex: 1, // Ensure the content is flexible and can center vertically
  },
  logo: {
    width: 130,
    height: 84,
  },
  cardImage: {
    width: '100%',
    height: 300,
    maxWidth: 380, // max-W-[380px] equivalent
  },
  textContainer: {
    position: 'relative',
    marginTop: 20, // mt-5 equivalent
  },
  heading: {
    fontSize: 24, // text-3xl equivalent
    color: '#FFFFFF', // white
    fontWeight: 'bold',
    textAlign: 'center',
  },
  auroText: {  
    fontSize: 28, // Larger font size for prominence
    color: '#FFA001', // Custom color for "Auro!" text
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pathImage: {
    width: 136,
    height: 15,
    position: 'absolute',
    bottom: -2, // Position at the bottom with a small offset
    right: -8, // Offset to the right
  },
  description: {
    fontSize: 14, // text-sm equivalent
    fontFamily: 'Poppins-Regular', // Assuming you're using this font (adjust accordingly)
    color: '#D1D3D8', // light gray color (gray-100)
    marginTop: 28, // mt-7 equivalent
    textAlign: 'center',
    paddingHorizontal: 10, // Optional: adding padding if needed for mobile screens
  },
  buttonContainer: {
    width: '100%', 
    marginTop: 28, // margin equivalent for spacing
  },
});

