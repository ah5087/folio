import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import Input from "@/components/Input";
import { useRouter } from "expo-router";
import Button from "@/components/Button";
import * as ImagePicker from "expo-image-picker";
import ProfileCircle from "../../assets/images/profile-circle-svgrepo-com.svg"; // Import your SVG

interface ImagePickerResult {
  uri: string;
  type: string;
  name: string;
}

export default function UserPass() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] =
    useState<ImagePickerResult | null>(null);

  const handleRegister = async () => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    if (profilePicture) {
      formData.append("profilePicture", {
        uri: profilePicture.uri,
        name: profilePicture.name,
        type: profilePicture.type,
      } as any);
    }

    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      if (response.status === 201) {
        Alert.alert("Success", "your account has been made!");
        router.push("/homepage"); // go to the homepage
      } else {
        Alert.alert("Error", "registration failed. please try again.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      Alert.alert("Error", "an error occurred. please try again.");
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePicture({
        uri: result.assets[0].uri,
        type: result.assets[0].type || "image/jpeg",
        name: result.assets[0].uri.split("/").pop() || "profile.jpg",
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>set your login information</Text>
      <Input
        placeholder="username"
        value={username}
        onChangeText={setUsername}
      />
      <Input
        placeholder="password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
        {profilePicture ? (
          <Image source={{ uri: profilePicture.uri }} style={styles.image} />
        ) : (
          <>
            <ProfileCircle width={100} height={100} />
            <Text style={styles.imagePickerText}>select profile picture</Text>
          </>
        )}
      </TouchableOpacity>
      <View style={styles.button}>
        <Button title="done" onPress={handleRegister} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  imagePicker: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  imagePickerText: {
    marginTop: 10,
    fontSize: 14,
    color: "#888",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  button: {
    width: 100,
    height: 60,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});
