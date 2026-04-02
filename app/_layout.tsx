import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      {/* I tab sono gestiti dalla cartella (tabs) */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* Schermata dettaglio - senza tab bar */}
      <Stack.Screen
        name="details"
        options={{
          headerShown: true,
          headerTitle: "Dettaglio Film",
          headerStyle: { backgroundColor: "#0f0f1a" },
          headerTitleStyle: { color: "white" },
          headerTintColor: "#6366f1",
        }}
      />
    </Stack>
  );
}
