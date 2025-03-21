import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { images } from '../../constants'; // Ensure this path is correct
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const submit = async () => {
    console.log('Sign In button clicked');

    if (!form.email || !form.password) {
      Alert.alert('Error', 'Please fill in all the fields');
      return;
    }

    setIsSubmitting(true);

    try {
      console.log('Sending request to the backend...');

      const response = await fetch('https://your-api-url.com/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      console.log('Raw response:', response);

      // Read response as text first
      const text = await response.text();
      console.log('Response text:', text);

      let data;
      try {
        data = JSON.parse(text);
      } catch (error) {
        throw new Error(`Invalid JSON response from server: ${text}`);
      }

      if (!response.ok) {
        console.log('Backend returned an error:', data);
        throw new Error(data.message || 'Failed to sign in');
      }

      console.log('Sign in successful:', data);

      // Save the token
      await AsyncStorage.setItem('token', data.token);

      Alert.alert('Success', 'Sign in successful! Redirecting...');
      router.push('/home');
    } catch (error) {
      console.error('Error during sign in:', error);
      Alert.alert('Sign In Error', error.message || 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flexContainer}
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.contentContainer}>
            <Image source={images.logo} resizeMode="contain" style={styles.logo} />
            <Text style={styles.title}>Log in to Auro</Text>

            <FormField
              title="Email"
              value={form.email}
              handleChangeText={(email) => setForm({ ...form, email })}
              otherStyles={styles.inputField}
              keyboardType="email-address"
            />

            <FormField
              title="Password"
              value={form.password}
              handleChangeText={(password) => setForm({ ...form, password })}
              otherStyles={styles.inputField}
              secureTextEntry
            />

            <CustomButton
              title="Sign In"
              handlePress={submit}
              containerStyles={styles.button}
              isLoading={isSubmitting}
            />

            <View style={styles.footerContainer}>
              <Text style={styles.footerText}>Don't have an account?</Text>
              <Link href="/sign-up" style={styles.linkText}>
                Sign up
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D1E22',
  },
  flexContainer: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    minHeight: '82%',
    paddingHorizontal: 16,
    marginVertical: 24,
  },
  logo: {
    width: 115,
    height: 35,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: '#FFFFFF',
    fontFamily: 'Poppins-SemiBold',
    marginTop: 20,
    textAlign: 'center',
  },
  inputField: {
    marginTop: 20,
  },
  button: {
    marginTop: 20,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
    color: '#D1D3D8',
    fontFamily: 'Poppins-Regular',
  },
  linkText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFA001',
    marginLeft: 8,
  },
});
