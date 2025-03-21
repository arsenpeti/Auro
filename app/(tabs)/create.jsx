import React, { useState } from "react";
import { View, Text, Alert, Image, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as DocumentPicker from "expo-document-picker";

const Create = () => {
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    image: null,
    prompt: "",
  });

  const openPicker = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ["image/png", "image/jpg"],
    });

    if (!result.canceled) {
      setForm({ ...form, image: result.assets[0] });
    }
  };

  const submit = () => {
    if (!form.title || !form.image || !form.prompt) {
      return Alert.alert("Please fill all fields");
    }

    setUploading(true);
    setTimeout(() => {
      Alert.alert("Success", "Image uploaded successfully");
      setForm({ title: "", image: null, prompt: "" });
      setUploading(false);
    }, 2000);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#121212" }}>
      <ScrollView style={{ padding: 16 }}>
        <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>Upload Image</Text>

        {/* Title Input */}
        <TextInput
          style={{
            backgroundColor: "#2A2A2E",
            color: "white",
            fontSize: 16,
            padding: 10,
            borderRadius: 10,
            marginTop: 10,
          }}
          placeholder="Image title..."
          placeholderTextColor="#888"
          value={form.title}
          onChangeText={(text) => setForm({ ...form, title: text })}
        />

        {/* Upload Image */}
        <View style={{ marginTop: 20 }}>
          <Text style={{ color: "white", fontSize: 16 }}>Select Image</Text>
          <TouchableOpacity onPress={openPicker} style={{ marginTop: 10 }}>
            {form.image ? (
              <Image source={{ uri: form.image.uri }} style={{ width: "100%", height: 200, borderRadius: 10 }} />
            ) : (
              <View style={{ width: "100%", height: 100, backgroundColor: "#333", justifyContent: "center", alignItems: "center", borderRadius: 10 }}>
                <Text style={{ color: "white" }}>Choose Image</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* AI Prompt */}
        <TextInput
          style={{
            backgroundColor: "#2A2A2E",
            color: "white",
            fontSize: 16,
            padding: 10,
            borderRadius: 10,
            marginTop: 20,
          }}
          placeholder="Enter AI prompt..."
          placeholderTextColor="#888"
          value={form.prompt}
          onChangeText={(text) => setForm({ ...form, prompt: text })}
        />

        {/* Submit Button */}
        <TouchableOpacity
          onPress={submit}
          style={{
            backgroundColor: "#FF6B00",
            padding: 15,
            alignItems: "center",
            borderRadius: 10,
            marginTop: 20,
          }}
          disabled={uploading}
        >
          <Text style={{ color: "white", fontSize: 16 }}>{uploading ? "Uploading..." : "Submit & Publish"}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
