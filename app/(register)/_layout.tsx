import { Stack } from "expo-router";
import React from "react";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function RegisterLayout() {
  const router = useRouter();

  return (
    <Stack initialRouteName="name">
      <Stack.Screen
        name="name"
        options={{
          headerTitle: "",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{ marginLeft: 10 }}
            >
              <FontAwesome name="chevron-left" size={20} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="email"
        options={{
          headerTitle: "",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{ marginLeft: 10 }}
            >
              <FontAwesome name="chevron-left" size={20} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="userpass"
        options={{
          headerTitle: "",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{ marginLeft: 10 }}
            >
              <FontAwesome name="chevron-left" size={20} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}
