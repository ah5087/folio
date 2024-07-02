import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import ProfileCircle from "../assets/images/profile-circle-svgrepo-com.svg";

const Header = ({ profilePicture }: { profilePicture: string }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.greeting}>hello, alice!</Text>
      <TouchableOpacity style={styles.profileButton}>
        {profilePicture ? (
          <Image source={{ uri: profilePicture }} style={styles.profileImage} />
        ) : (
          <ProfileCircle width={40} height={40} />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
});

export default Header;
