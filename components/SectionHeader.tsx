import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const SectionHeader = ({
  title,
  onAddPress,
}: {
  title: string;
  onAddPress: () => void;
}) => {
  return (
    <View style={styles.sectionHeader}>
      <TouchableOpacity style={styles.addButton} onPress={onAddPress}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  addButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  addButtonText: {
    color: "#000",
    fontSize: 20,
    lineHeight: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default SectionHeader;
