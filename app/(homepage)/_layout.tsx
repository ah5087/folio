import { Stack } from "expo-router";

export default function HomepageLayout() {
  return (
    <Stack>
      <Stack.Screen name="homepage" options={{ title: "homepage" }} />
    </Stack>
  );
}
