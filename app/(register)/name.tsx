import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import InputField from "@/components/InputField";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Name() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>what's your name?</Text>
      <InputField placeholder={"first"} />
      <InputField placeholder={"last"} />
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("(register)/email")}
      >
        <Icon name="arrow-right" size={25} color="#000" />
      </TouchableOpacity>
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
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    marginTop: 20,
  },
});
