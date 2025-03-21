import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, RefreshControl, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons'; // Import icons
import SearchInput from '../../components/SearchInput'; // Assuming you have a SearchInput component
import EmptyState from '../../components/EmptyState';
import { images } from '../../constants/'; // Ensure this is imported correctly
import Trending from '../../components/Trending';
const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [imagesList, setImagesList] = useState([]);

  const refreshPage = async () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000); // Simulating API refresh
  };

  const fetchImages = async () => {
    try {
      // Fetch random images from Lorem Picsum API
      const fetchedImages = [];
      for (let i = 0; i < 3; i++) {
        const res = `https://picsum.photos/seed/${Math.random()}/600/400`; // Random images
        fetchedImages.push(res);
      }
      setImagesList(fetchedImages);
    } catch (error) {
      console.error("Error fetching images: ", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Dummy video data
  const videoData = [
    { id: 1, title: 'Exploring AI Innovations' },
    { id: 2, title: 'Machine Learning Breakthroughs' },
    { id: 3, title: 'Understanding Neural Networks' },
  ];

  return (
    <SafeAreaView style={styles.aria}>
      <FlatList
        data={videoData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.videoCard}>
            {/* Video Title and User Icon */}
            <View style={styles.videoInfo}>
              <Text style={styles.videoTitle}>{item.title}</Text>
              <TouchableOpacity style={styles.userIconContainer}>
                <Ionicons name="person-circle-outline" size={24} color="gray" />
              </TouchableOpacity>
            </View>

            {/* Video Image */}
            <Image source={{ uri: imagesList[index] }} style={styles.thumbnail} />
          </View>
        )}
        ListHeaderComponent={() => (
          <View>
            {/* Header Section */}
            <View style={styles.headerContainer}>
              <View>
                <Text style={styles.well}>Welcome Back</Text>
                <Text style={styles.welli}>Arsen</Text>
              </View>
              {/* Use images.logoSmall instead of icons.logoSmall */}
              <TouchableOpacity style={styles.iconContainer}>
                <Image source={images.logoSmall} style={styles.icon} />
              </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View style={styles.searchBarContainer}>
              <SearchInput
                placeholder="Search here..."
                handleChangeText={(text) => console.log(text)}
                otherStyles={styles.searchInput}
              />
            </View>
            <Trending/>
          </View>
          
        )}
        ListEmptyComponent={() => (
          <EmptyState title="No video found" subtitle="No video created yet" />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refreshPage} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // General styles
  aria: {
    backgroundColor: '#1D1E22',
    flex: 1,
  },
  // Header styles
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 10,
  },
  well: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  welli: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  iconContainer: {
    padding: 8,
    borderRadius: 20,
    marginLeft: 'auto', // Align the icon to the right
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  // Search Bar styles
  searchBarContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  searchInput: {
    backgroundColor: '#2A2A2E',
    borderColor: '#333333',
    borderWidth: 2,
    borderRadius: 20,
  },
  latest: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  // Video List Styles
  videoCard: {
    marginBottom: 20, // Spacing between video cards
  },
  videoInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  videoTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  userIconContainer: {
    padding: 8,
    borderRadius: 20,
  },
  // Thumbnail Styles
  thumbnail: {
    width: '100%', // Make image take up full width
    height: 250, // Set a fixed height
    borderRadius: 10,
    marginTop: 10,
    resizeMode: 'cover', // Ensure the image is properly resized
  },
});

export default Home;
