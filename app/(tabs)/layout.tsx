import { Tabs } from "expo-router";
import { Text } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#4f46e5", // colore tab attiva
        tabBarInactiveTintColor: "#888", // colore tab inattiva
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 0.5,
        },
      }}
    >
      <Tabs.Screen
        name="homepage"
        options={{ title: "Home", tabBarIcon: () => <Text>🏠</Text> }}
      />
      <Tabs.Screen
        name="ricerca"
        options={{
          title: "Esplora",
          tabBarIcon: () => <Text>🔍</Text>,
        }}
      />
      <Tabs.Screen
        name="profilo"
        options={{
          title: "Profilo",
          tabBarIcon: () => <Text>❤️</Text>,
        }}
      />
      <Tabs.Screen
        name="popolari"
        options={{
          title: "Popolari",
          tabBarIcon: () => <Text>⭐</Text>,
        }}
      />
    </Tabs>
  );
}
