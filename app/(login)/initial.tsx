import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome";
import MailClosedHeart from "../../assets/images/mail-closed-heart.svg";

export default function Initial() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <MailClosedHeart width={100} height={100} style={styles.logo} />
      <Text style={styles.welcomeText}>welcome to folio!</Text>
      <Text style={styles.subText}>
        your one-stop shop for tracking and exploring books, movies, and TV
        shows.
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("signin")}
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
    padding: 20,
  },
  logo: {
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    textAlign: "center",
    marginHorizontal: 20,
    marginBottom: 40,
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
  },
});
