import React, { useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { router } from "expo-router";

const API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;
const IMAGE_BASE = "https://image.tmdb.org/t/p/w200";

export default function ricerca() {
  // stati generali

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // funzione per cercare il film con gestione degli errori

  const searchFilm = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&language=it-IT`,
      );
      const data = await res.json();
      setResults(data.results || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Cerca un film"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={searchFilm}
        />
        <View>
          <FlatList
            data={results}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.card}
                onPress={() => router.push(`/details?id=${item.id}`)}
              >
                {item.poster_path && (
                  <Image
                    source={{ uri: `${IMAGE_BASE}${item.poster_path}` }}
                    style={styles.poster}
                  />
                )}
                <View style={styles.info}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.year}>
                    {item.release_date?.split("-")[0]}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f0f1a", padding: 16 },
  searchContainer: { gap: 15 },
  input: {
    backgroundColor: "#ffffff",
    color: "black",
    padding: 12,
    borderRadius: 12,
    fontSize: 16,
  },
  card: {
    flexDirection: "row",
    marginBottom: 16,
    backgroundColor: "#1c1c24",
    borderRadius: 12,
    overflow: "hidden",
  },
  poster: { width: 80, height: 120 },
  info: { flex: 1, padding: 12, justifyContent: "center" },
  title: { color: "white", fontSize: 16, fontWeight: "bold" },
  year: { color: "#888", marginTop: 4 },
});
