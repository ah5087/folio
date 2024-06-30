import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack initialRouteName="(login)/initial">
      <Stack.Screen name="(login)" options={{ headerShown: false }} />
      <Stack.Screen name="(register)" options={{ headerShown: false }} />
    </Stack>
  );
}
