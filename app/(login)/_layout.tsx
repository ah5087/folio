import { Stack } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function LoginLayout() {
  const router = useRouter();

  return (
    <Stack initialRouteName="initial">
      <Stack.Screen name="initial" options={{ headerShown: false }} />
      <Stack.Screen
        name="signin"
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
