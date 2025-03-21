import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { icons } from '../constants';

const SearchInput = ({ query: externalQuery, setQuery: externalSetQuery, refetch }) => {
  const router = useRouter();
  const pathname = usePathname();

  // Internal state if setQuery is not provided
  const [internalQuery, setInternalQuery] = useState("");

  // Use either external or internal state
  const query = externalQuery !== undefined ? externalQuery : internalQuery;
  const setQuery = externalSetQuery !== undefined ? externalSetQuery : setInternalQuery;

  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = () => {
    if (!query?.trim()) {
      Alert.alert("Error", "Please enter a search term.");
      return;
    }

    if (pathname.startsWith('/search')) {
      router.setParams({ query });
    } else {
      router.push(`/search/${query}`);
    }

    refetch && refetch(); // Refresh search results if available
  };

  return (
    <View style={[styles.inputContainer, isFocused && styles.focusedBorder]}>
      <TextInput
        style={styles.input}
        value={query}
        placeholder="Search for a topic"
        placeholderTextColor="#CDCDE0"
        onChangeText={(text) => setQuery(text)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onSubmitEditing={handleSearch}
      />

      <TouchableOpacity onPress={handleSearch}>
        <Image source={icons.search} style={styles.searchIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2E',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#333333',
    height: 50,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  focusedBorder: {
    borderColor: '#FF8C00', // Orange border on focus
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: 'white',
  },
});

export default SearchInput;
