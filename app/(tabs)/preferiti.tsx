import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w200";

interface Film {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  release_date: string;
  original_language: string;
  popularity: number;
  adult: boolean;
  video: boolean;
  genre_ids: number[];
}

export default function preferiti() {
  const [preferiti, setPreferiti] = useState<Film[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadPreferiti();
    }, []),
  );

  const loadPreferiti = async () => {
    const filmSalvato = await AsyncStorage.getItem("preferiti");
    if (filmSalvato) setPreferiti(JSON.parse(filmSalvato));
  };

  const rimuoviPreferiti = async (film: Film) => {
    Alert.alert("Rimuovi dai preferiti", `Vuoi rimuovere "${film.title}"?`, [
      { text: "Annulla", style: "cancel" },
      {
        text: "Rimuovi",
        style: "destructive",
        onPress: async () => {
          const nuoviPreferiti = preferiti.filter((f) => f.id !== film.id);
          setPreferiti(nuoviPreferiti);
          await AsyncStorage.setItem(
            "preferiti",
            JSON.stringify(nuoviPreferiti),
          );
        },
      },
    ]);
  };

  if (preferiti.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>❤️ Nessun preferito</Text>
        <Text style={styles.emptySubtitle}>
          Aggiungi i tuoi film preferiti dalla schermata dettaglio!
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={preferiti}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/details?id=${item.id}`)}
            activeOpacity={0.8}
          >
            {item.poster_path ? (
              <Image
                source={{ uri: `${IMAGE_BASE}${item.poster_path}` }}
                style={styles.poster}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.noPoster}>
                <Text style={styles.noPosterText}>🎬</Text>
              </View>
            )}

            <View style={styles.info}>
              <Text style={styles.title} numberOfLines={2}>
                {item.title}
              </Text>
              <Text>📅 {item.release_date?.split("-")[0] || "N/A"}</Text>
              <Text> ⭐ {item.vote_average?.toFixed(1) || "?"}/10</Text>
            </View>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => rimuoviPreferiti(item)}
            >
              <Text style={styles.removeText}>❌</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f1a",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0f0f1a",
  },
  loadingText: {
    marginTop: 12,
    color: "#a1a1aa",
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0f0f1a",
    paddingHorizontal: 40,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 20,
  },
  emptyTitle: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  emptySubtitle: {
    color: "#a1a1aa",
    fontSize: 14,
    textAlign: "center",
  },
  card: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: "#1c1c24",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  poster: {
    width: 90,
    height: 135,
  },
  noPoster: {
    width: 90,
    height: 135,
    backgroundColor: "#2a2a35",
    justifyContent: "center",
    alignItems: "center",
  },
  noPosterText: {
    fontSize: 40,
  },
  info: {
    flex: 1,
    padding: 12,
    justifyContent: "center",
    gap: 4,
  },
  title: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  year: {
    color: "#a1a1aa",
    fontSize: 12,
  },
  rating: {
    color: "#fbbf24",
    fontSize: 12,
  },
  removeButton: {
    justifyContent: "center",
    paddingHorizontal: 16,
    backgroundColor: "rgba(239, 68, 68, 0.1)",
  },
  removeText: {
    fontSize: 20,
  },
});
