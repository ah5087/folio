import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

const FilterButton = ({
  text,
  active,
  onPress,
}: {
  text: string;
  active: boolean;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity
      style={[styles.filterButton, active && styles.activeFilterButton]}
      onPress={onPress}
    >
      <Text style={[styles.filterText, active && styles.activeFilterText]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  filterButton: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  activeFilterButton: {
    backgroundColor: "#6200ee",
  },
  filterText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6200ee",
  },
  activeFilterText: {
    color: "#fff",
  },
});

export default FilterButton;
