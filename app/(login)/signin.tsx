import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import MailOpenHeart from "../../assets/images/mail-open-heart.svg";

export default function SignIn() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <MailOpenHeart width={100} height={100} style={styles.logo} />
      <Text style={styles.title}>sign in</Text>
      <InputField placeholder="username" />
      <InputField placeholder="password" secureTextEntry />
      <Button
        title="sign in"
        onPress={() => {
          /* TODO: handle sign in */
        }}
      />
      <Text style={styles.registerText}>don't have an account?</Text>
      <Button title="register" onPress={() => router.push("register")} />
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
