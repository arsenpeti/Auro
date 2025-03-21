import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";


//import { EmptyState, VideoCard } from "../components";
//import { searchPosts } from "../lib/appwrite"; // Your function to search for posts
import SearchInput from "../../components/SearchInput";
const Search = () => {
  const { query: initialQuery } = useLocalSearchParams();
  const [query, setQuery] = useState(initialQuery || "");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    try {
      const data = await searchPosts(query);
      setPosts(data || []);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [query]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#1D1E22" }}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}
          />
        )}
        ListHeaderComponent={() => (
          <View style={{ padding: 16 }}>
            <Text style={{ color: "#FFFFFF", fontSize: 14 }}>Search Results</Text>
            <Text style={{ color: "#FFFFFF", fontSize: 22, fontWeight: "bold", marginTop: 4 }}>
              {query || "Trending"}
            </Text>

            <View style={{ marginTop: 16, marginBottom: 24 }}>
              <SearchInput query={query} setQuery={setQuery} refetch={fetchPosts} />
            </View>
          </View>
        )}
        ListEmptyComponent={() =>
          !loading && (
            <EmptyState title="No Videos Found" subtitle="No videos found for this search query" />
          )
        }
      />
    </SafeAreaView>
  );
};

export default Search;
