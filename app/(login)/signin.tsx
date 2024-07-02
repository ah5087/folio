import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import Input from "../../components/Input";
import Button from "../../components/Button";
import MailOpenHeart from "../../assets/images/mail-open-heart.svg";

export default function SignIn() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.status === 200) {
        Alert.alert("Success", "Logged in successfully!");
        router.push("(homepage)/homepage");
      } else {
        Alert.alert("Error", "Invalid username or password. Please try again.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      Alert.alert("Error", "An error occurred. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <MailOpenHeart width={100} height={100} style={styles.logo} />
      <Text style={styles.title}>sign in</Text>
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
      <Button title="sign in" onPress={handleSignIn} />
      <Text style={styles.registerText}>don't have an account?</Text>
      <Button title="register" onPress={() => router.push("(register)/name")} />
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
  logo: {
    width: 100,
    height: 100,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  registerText: {
    fontSize: 16,
    color: "#888",
    marginVertical: 10,
  },
});
