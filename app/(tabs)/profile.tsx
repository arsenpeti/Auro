import React, { useState } from "react";
import { View, Text, Image, FlatList, TouchableOpacity, Alert, StyleSheet } from "react-native";
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
];

const Profile = () => {
  const [user, setUser] = useState({
    username: "John Doe",
    avatar: "https://picsum.photos/50",
  });
  const [posts, setPosts] = useState(dummyPosts);

  const logout = () => {
    Alert.alert("Logged out", "You have been successfully logged out.");
    setUser(null); // Reset user data after logout
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#121212" }}>
      <FlatList
        data={posts}
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
            <Text style={{ color: "#888", fontSize: 16 }}>No posts available</Text>
          </View>
        )}
        ListHeaderComponent={() => (
          <View style={{ alignItems: "center", marginTop: 20 }}>
            {/* Profile picture */}
            <View style={styles.profileImageContainer}>
              <Image
                source={{ uri: user.avatar }}
                style={styles.profileImage}
                resizeMode="cover"
              />
            </View>

            {/* User Info */}
            <Text style={styles.username}>{user.username}</Text>

            {/* Info Box */}
            <View style={styles.infoBoxContainer}>
              <View style={styles.infoBox}>
                <Text style={styles.infoBoxTitle}>{posts.length}</Text>
                <Text style={styles.infoBoxSubtitle}>Posts</Text>
              </View>
              <View style={styles.infoBox}>
                <Text style={styles.infoBoxTitle}>1.2k</Text>
                <Text style={styles.infoBoxSubtitle}>Followers</Text>
              </View>
            </View>

            {/* Divider Line Below Posts and Followers */}
            <View style={styles.whiteDivider}></View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 15,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: "white", // Changed to white
    padding: 5, // Padding for a smoother, cleaner look
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
  profileImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: "hidden",
    borderColor: "white", // Changed to white
    borderWidth: 3,
    marginBottom: 10,
    padding: 2,
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 40,
  },
  username: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
  infoBoxContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  infoBox: {
    alignItems: "center",
    marginRight: 20,
  },
  infoBoxTitle: {
    color: "white",
    fontSize: 18,
  },
  infoBoxSubtitle: {
    color: "#888",
  },
  whiteDivider: {
    width: "80%",
    height: 1,
    backgroundColor: "white", // White divider line
    marginTop: 20,
  },
});

export default Profile;
