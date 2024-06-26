import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import InputField from "@/components/InputField";
import { useRouter } from "expo-router";
import Button from "@/components/Button";

export default function UserPass() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.status === 201) {
        Alert.alert("Success", "User registered successfully!");
        router.push("(register)/name");
      } else {
        Alert.alert("Error", "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      Alert.alert("Error", "An error occurred. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>set your login information</Text>
      <InputField
        placeholder="username"
        value={username}
        onChangeText={setUsername}
      />
      <InputField
        placeholder="password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
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
  button: {
    width: 100,
    height: 60,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});
