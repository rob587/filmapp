import { Tabs } from "expo-router";
import { Text } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#6366f1",
        tabBarInactiveTintColor: "#a1a1aa",
        tabBarStyle: {
          backgroundColor: "#0f0f1a",
          borderTopWidth: 1,
          borderTopColor: "#27272a",
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
        headerStyle: {
          backgroundColor: "#0f0f1a",
        },
        headerTitleStyle: {
          color: "#ffffff",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Popolari",
          tabBarIcon: () => <Text style={{ fontSize: 22 }}>⭐</Text>,
        }}
      />
      <Tabs.Screen
        name="ricerca"
        options={{
          title: "Ricerca",
          tabBarIcon: () => <Text style={{ fontSize: 22 }}>🔍</Text>,
        }}
      />
      <Tabs.Screen
        name="preferiti"
        options={{
          title: "Preferiti",
          tabBarIcon: () => <Text style={{ fontSize: 22 }}>❤️</Text>,
        }}
      />
    </Tabs>
  );
}
