import { Stack } from "expo-router";

export default function SearchLayout() {
  return (
    <Stack>
      <Stack.Screen name="SearchPage" options={{ title: "Search" }} />
    </Stack>
  );
}
