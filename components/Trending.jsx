import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const Trending = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRandomImages();
  }, []);

  // Fetch random images from Lorem Picsum API
  const fetchRandomImages = async () => {
    try {
      // Lorem Picsum API: No key needed, simply fetch random image list
      const response = await axios.get('https://picsum.photos/v2/list?page=1&limit=10');
      
      // Set the response images data to state
      setImages(response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="white" />;
  }

  return (
    <FlatList
      data={images}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <Image source={{ uri: item.download_url }} style={styles.image} resizeMode="cover" />
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 350,
    borderRadius: 10,
    marginHorizontal: 5,
  },
});

export default Trending;
