import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, Image, StyleSheet, Alert } from 'react-native';
import { images } from '../../constants'; // Assuming you have the images folder
import FormField from '../../components/FormField'; // Assuming the FormField component is correctly imported
import CustomButton from '../../components/CustomButton'; // Assuming the CustomButton component is correctly imported
import { Link, router } from 'expo-router'; // Correct import for Link from expo-router
import 'react-native-url-polyfill/auto';
import { creatUser } from '../../lib/appwrite';

const SignUp = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert('Error', 'Please fill in all the fields');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await creatUser(form.email, form.password, form.username);
      router.replace('/home'); // Redirect to home page after successful sign up
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const alreadyLoggedIn = () => {
    router.replace('/home'); // Redirect to home page if the user is already logged in
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.contentContainer}>
          <Image source={images.logo} resizeMode="contain" style={styles.logo} />
          <Text style={styles.title}>Sign up to Auro</Text>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles={styles.inputField}
          />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles={styles.inputField}
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles={styles.inputField}
            secureTextEntry
          />

          <CustomButton
            title="Sign Up"
            handlePress={submit}
            containerStyles={styles.button}
            isLoading={isSubmitting}
          />

          {/* Already Logged In button */}
          <CustomButton
            title="Already logged in?"
            handlePress={alreadyLoggedIn}
            containerStyles={styles.button}
            isLoading={isSubmitting}
          />

          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>Have an account already</Text>
            <Link href="/sign-in" style={styles.linkText}>
              Sign in
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D1E22', // Primary color for the background
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    minHeight: '82%', // Using percentage instead of 'vh' for React Native
    paddingHorizontal: 16, // Equivalent to px-4 in Tailwind
    marginVertical: 24, // Equivalent to my-6 in Tailwind
  },
  logo: {
    width: 115,
    height: 35,
    alignSelf: 'center', // Align logo at the center
    marginBottom: 20,
  },
  title: {
    fontSize: 24, // Equivalent to text-2xl
    color: '#FFFFFF', // White text color
    fontFamily: 'Poppins-SemiBold', // Assuming the font is loaded via expo-font
    marginTop: 40, // Equivalent to mt-10 in Tailwind
    textAlign: 'center', // Center title text
  },
  inputField: {
    marginTop: 28, // Equivalent to mt-7
  },
  button: {
    marginTop: 28, // Equivalent to mt-7
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20, // Equivalent to pt-5 in Tailwind
  },
  footerText: {
    fontSize: 16, // Equivalent to text-lg
    color: '#D1D3D8', // Equivalent to text-gray-100
    fontFamily: 'Poppins-Regular', // Assuming you have the Poppins-Regular font loaded
  },
  linkText: {
    fontSize: 16, // Equivalent to text-lg
    fontFamily: 'Poppins-SemiBold', // Assuming you have the Poppins-SemiBold font loaded
    color: '#FFA001', // Assuming this is your secondary color (gold or yellow)
    marginLeft: 8, // Equivalent to gap-2 in Tailwind
  },
});
