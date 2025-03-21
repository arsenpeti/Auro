import React, { useState } from "react";
import { View, Text, Image, FlatList, TextInput, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const dummyPosts = [
  {
    id: "1",
    title: "Beautiful Beach",
    image: "https://picsum.photos/300/200",
    creator: { username: "John Doe", avatar: "https://picsum.photos/50" },
  },
  {
    id: "2",
    title: "Mountain Adventure",
    image: "https://picsum.photos/301/200",
    creator: { username: "Jane Smith", avatar: "https://picsum.photos/51" },
  },
  {
    id: "3",
    title: "City Lights at Night",
    image: "https://picsum.photos/302/200",
    creator: { username: "Alice Brown", avatar: "https://picsum.photos/52" },
  },
];

const Bookmark = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [bookmarkedPosts, setBookmarkedPosts] = useState(dummyPosts);

  // Filter bookmarked posts based on search query
  const filteredPosts = bookmarkedPosts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#121212" }}>
      <View style={{ padding: 10 }}>
        {/* Search Bar */}
        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="What are you looking for today?"
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Gap between search bar and videos */}
        <View style={{ marginTop: 30 }} />

        {/* Bookmarked Posts */}
        <FlatList
          data={filteredPosts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={{ marginBottom: 20, backgroundColor: "#1E1E1E", borderRadius: 10 }}>
              <Image
                source={{ uri: item.image }}
                style={styles.postImage}
              />
              <Text style={styles.postTitle}>{item.title}</Text>
              <Text style={styles.postCreator}>By {item.creator.username}</Text>
            </View>
          )}
          ListEmptyComponent={() => (
            <View style={{ padding: 20, alignItems: "center" }}>
              <Text style={{ color: "#888", fontSize: 16 }}>No bookmarked posts</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    backgroundColor: "#1E1E1E",
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 30, // Increased gap between search bar and videos
  },
  searchInput: {
    color: "white",
    fontSize: 16,
  },
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 15,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: "white", // White border around images
    padding: 5, // Padding for a smoother look
  },
  postTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  postCreator: {
    color: "#888",
    marginTop: 5,
  },
});

export default Bookmark;
